import {
    Area,
    areaHasIncludes,
    areaHasIslands,
    areaIsMainland,
    areaIsRestOf,
    areaIsWhole,
    Bulletin,
    Landmass,
    PagasaParserFormatter,
    TCWSLevels
} from "pagasa-parser";
import ProvinceData, {Province, Region} from "./ProvinceData";
import ProvinceData2016 from "./data/ProvinceData2022";
import zeropad from "./util/zeropad";
import b from "./util/b";
import StringBuilder from "./util/StringBuilder";
import wikilink from "./util/wikilink";
import Template from "./util/Template";
import axios from "axios";

export { default as ProvinceData, Province, Region } from "./ProvinceData";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const _package = require("../package.json");
type Transformation = (text: string) => string;

interface PagasaParserWikipediaFormatterOptions {
    block: boolean,
    provinceData: ProvinceData
    nameTransformations: Transformation[];
    linkTransformations: Transformation[];
    apiURL: string;
    bypassRedirects: boolean;
}

export const DefaultNameTransformations: Transformation[] = [
    // Matag-Ob => Matag-ob
    (text: string): string => text.replace(/-\s?([A-Z])/g, (_, a1) => `-${a1.toLowerCase()}`),
    // City of Ilagan => Ilagan City
    (text: string): string => text.replace(/^City of /g, ""),
    // Babuyan Is. => Babuyan Islands
    (text: string): string => text.replace(/Is\./, "Islands")
];
export const DefaultLinkTransformations: Transformation[] = [
    // Matag-Ob => Matag-ob
    (text: string): string => text.replace(/-\s?([A-Z])/g, (_, a1) => `-${a1.toLowerCase()}`),
    // City of Ilagan => Ilagan
    (text: string): string => text.replace(/^City of (.+?),/g, "$1,"),
    // Babuyan Is. => Babuyan Islands
    (text: string): string => text.replace(/Is\./, "Islands"),
    // Naga City => Naga
    (text: string): string => text.replace(/(\s)City(, )/gi, "$2")
];

export default class PagasaParserWikipediaFormatter extends PagasaParserFormatter<string> {

    private readonly provinceData: ProvinceData;
    private readonly block: boolean;
    private readonly nameTransformations: Transformation[];
    private readonly linkTransformations: Transformation[];
    private readonly apiURL: string;
    private readonly bypassRedirects: boolean;

    constructor(options: Partial<PagasaParserWikipediaFormatterOptions> = {}) {
        super();
        this.provinceData = options.provinceData ?? ProvinceData2016;
        this.block = options.block ?? true;
        this.nameTransformations = options.nameTransformations ?? DefaultNameTransformations;
        this.linkTransformations = options.linkTransformations ?? DefaultLinkTransformations;
        this.apiURL = options.apiURL ?? "https://en.wikipedia.org/w/api.php";
        this.bypassRedirects = options.bypassRedirects ?? true;
    }

    nameTransform(name: string): string {
        if (name == null) return null;
        let final = name;
        for (const transformation of this.nameTransformations)
            final = transformation(final);
        return final;
    }

    linkTransform(link: string): string {
        if (link == null) return null;
        let final = link;
        for (const transformation of this.linkTransformations)
            final = transformation(final);
        return final;
    }

    async format(bulletin: Bulletin): Promise<string> {
        const formattedSignals = this.formatSignals(bulletin.signals);
        return this.serialize(bulletin, formattedSignals);
    }

    private serialize(
        bulletin: Bulletin,
        signalMap: Map<keyof TCWSLevels, Map<Region, Area[]>>
    ): Promise<string> {
        const utcTime = `${
            zeropad(bulletin.info.issued.getUTCHours(), 2)
        }:${
            zeropad(bulletin.info.issued.getUTCMinutes(), 2)
        }`;
        const localTime = `${
            zeropad((bulletin.info.issued.getUTCHours() + 8) % 24, 2)
        }:${
            zeropad(bulletin.info.issued.getMinutes(), 2)
        }`;

        const template = new Template("TyphoonWarningsTable", this.block);
        template.set("PHtime", `${utcTime} UTC (${localTime} [[Philippine Standard Time|PHT]])`);
        if (bulletin.cyclone.prevailing ?? true)
            template.set("PHactive", "yes");

        for (const signalArea of Array.from(signalMap.keys()).sort((a, b) => b - a)) {
            template.set(`PH${signalArea}`, this.serializeAreas(signalMap.get(signalArea)));
        }

        template.set("PHsource", `[${
            bulletin.info.url ??
            "http://bagong.pagasa.dost.gov.ph/tropical-cyclone-bulletin-iframe"
        } PAGASA]`);

        const wikitext = `<!-- pagasa-parser: Update TCWS (TCB#${
            zeropad(bulletin.info.count, 2)
        }, ${
            zeropad(bulletin.info.issued.getUTCHours(), 2)
        }Z) -->\n` + template.toString();
        if (this.bypassRedirects)
            return this.bypassWikitextRedirects(wikitext);
        else
            return Promise.resolve(wikitext);
    }

    private async bypassWikitextRedirects(wikitext: string): Promise<string> {
        let link: RegExpExecArray;
        const links: RegExpExecArray[] = [];
        const linkFindRegex = /\[\[(.+?)(\|.+?)?]]/g;

        while ((link = linkFindRegex.exec(wikitext)) != null) {
            if (!links.some(l => l[1] === link[1]))
                links.push(link);
        }

        const redirects: Record<string, string> = {};
        const queryListChunkSize = 50;
        for (let offset = 0; offset < Math.ceil(links.length / queryListChunkSize); offset++) {
            const subset = links.slice(queryListChunkSize * offset, 50 + (queryListChunkSize * offset));
            try {
                const redirectQuery = await axios.post(
                    this.apiURL,
                    new URLSearchParams({
                        action: "query",
                        format: "json",
                        formatversion: "2",
                        redirects: "1",
                        titles: subset.map(v => v[1]).join("|")
                    }),
                    {
                        method: "POST",
                        headers: {
                            "User-Agent": `${_package.name}/${_package.version}`
                        },
                        responseType: "json"
                    }
                ).then(d => d.data["query"]["redirects"] as [{ from: string, to: string }]);

                for (const redirect of redirectQuery) {
                    redirects[redirect.from] = redirect.to;
                }
            } catch (e) { /* ignored */ }
        }

        wikitext = wikitext.replace(/\[\[(.+?)(?:\|(.+?))?]]/g, (a0, a1, a2) => {
            if (redirects[a1] == null)
                return a0;
            if (redirects[a1] == a2)
                return `[[${a2}]]`;

            let name = a2 ?? a1;

            // MOS:PHIL; https://w.wiki/AKWS
            // If the title includes "city", use the page name as the title,
            // removing disambiguators. This will automatically convert:
            // * "Baguio City" to "Baguio"
            // * "Science City of Muñoz" to "Muñoz"
            // * "Isabela, Basilan" to "Isabela"
            // This should exclude titles like:
            // * Quezon City
            // * Angeles City
            // This should never change the redirect target.
            if ( /\bcity\b/gi.test(name) ) {
                name = redirects[a1].replace(
                    /^.*City of|(,.+)|(\s\([^)]+\)+)/g,
                    ""
                );
            }

            return `[[${redirects[a1]}|${name}]]`;
        });

        return wikitext;
    }

    private serializeAreas(areas: Map<Region, Area[]>): string {
        const serialized = new StringBuilder();

        for (const region of areas.keys()) {
            let bullets = 1;

            if (region != null) {
                serialized.appendLine(b(1, `'''${
                    wikilink(region.name, region.page)
                }''' {{small|(${region.region})}}`));
                ++bullets;
            }

            for (const area of areas.get(region)) {
                const provinceInfo = this.provinceData.provinces.get(area.name);
                let finalRegion = region;
                if (finalRegion == null) {
                    finalRegion = provinceInfo?.region;
                }

                serialized.concat(
                    this.serializeArea(bullets, area, region, provinceInfo)
                );
            }
        }

        return serialized.toString().trim();
    }

    private serializeArea(
        bullets: number,
        area: Area,
        _region?: Region,
        province?: Province
    ): StringBuilder {
        const serialized = new StringBuilder();

        const objects = (objects: string[]): string => {
            if (objects == null || objects.length === 0) return "";

            return `{{small|(${
                objects
                    .map(v => wikilink(
                        this.nameTransform(v),
                        this.linkTransform(`${v}, ${
                            // Use name to avoid `Town, Province (province)`
                            province?.name ?? area.name
                        }`)
                    ))
                    .join(", ")
            })}}`;
        };
        const areaObjects = areaHasIncludes(area) ? objects(area.includes.objects) : "";

        if (areaIsWhole(area)) {
            serialized.appendLine(
                b(bullets, `${wikilink(
                    this.nameTransform(province?.name ?? area.name),
                    this.linkTransform(province?.page)
                )} ${areaObjects}`).trim()
            );
        } else if (areaIsMainland(area)) {
            serialized.appendLine(
                b(bullets, `mainland ${
                    wikilink(
                        this.nameTransform(province?.name ?? area.name), 
                        this.linkTransform(province?.page)
                    )
                } ${areaObjects}`).trim()
            );
        } else if (areaIsRestOf(area)) {
            const rest = "rest of " + (area.includes.term ?? "");

            serialized.appendLine(
                b(bullets, `${
                    rest.trim()
                } ${
                    wikilink(
                        this.nameTransform(province?.name ?? area.name), 
                        this.linkTransform(province?.page)
                    )
                } ${areaObjects}`).trim()
            );
        } else if (areaHasIncludes(area)) {
            serialized.appendLine(
                b(bullets, `${
                    area.includes.type === "section" ?
                        `${
                            area.includes.part
                        } ${
                            area.includes.term
                        } of ${
                            area.includes.mainland ? "mainland " : ""
                        }` :
                        "part of "
                }${
                    wikilink(
                        this.nameTransform(province?.name ?? area.name),
                        this.linkTransform(province?.page)
                    )
                } ${areaObjects}`).trim()
            );
        }

        if (areaHasIslands(area)) {
            for (const island of area.islands) {
                serialized.appendLine(
                    b(bullets + 1, `${
                        wikilink(
                            this.nameTransform(island.name),
                            this.linkTransform(island.name)
                        )
                    }`)
                );
            }
        }

        return serialized;
    }

    private formatSignals(signals: TCWSLevels): Map<keyof TCWSLevels, Map<Region, Area[]>> {
        const signalAreas = new Map<keyof TCWSLevels, Map<Region, Area[]>>();

        for (const signal in signals) {
            const signalNo = (+signal as unknown as keyof TCWSLevels);
            if (signals[signalNo]) {
                const signalLandmasses = signals[signalNo].areas;

                signalAreas.set(
                    signalNo,
                    this.formatSignalLandmassAreas([
                        ...(signalLandmasses[Landmass.Luzon] ?? []),
                        ...(signalLandmasses[Landmass.Visayas] ?? []),
                        ...(signalLandmasses[Landmass.Mindanao] ?? [])
                    ])
                );
            }
        }

        return signalAreas;
    }

    private formatSignalLandmassAreas(areas: Area[]): Map<Region, Area[]> {
        let areaList = new Map<Region, Area[]>();

        for (const area of areas) {
            const region = this.provinceData.provinces.get(area.name)?.region;
            const areaRegion = areaList.get(region);

            if (areaRegion == null) {
                areaList.set(region, [area]);
            } else {
                areaRegion.push(area);
                areaRegion.sort((a, b) => a.name.localeCompare(b.name));
            }
        }

        areaList = new Map(
            [...areaList].sort((a, b) =>
                a[0] == null ? -1 :
                    (b[0] == null ? 1 :
                        [...this.provinceData.regions.keys()]
                            .indexOf(a[0].name)
                        -
                        [...this.provinceData.regions.keys()]
                            .indexOf(b[0].name))
            )
        );

        return areaList;
    }

}
