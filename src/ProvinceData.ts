export interface Region {
    name: string;
    region?: string;
    page?: string;
}

export interface Province {
    name: string;
    page?: string;
}

export default class ProvinceData extends Map<Region, Province[]> implements ReadonlyMap<Region, Province[]> {

    readonly regions: ReadonlyMap<string, Region>;
    readonly provinces: ReadonlyMap<string, Province & { region: Region }>;

    constructor(entries?: [Region, Province[]][]) {
        super(entries);

        const regions = new Map<string, Region>();
        const provinces = new Map<string, Province & { region: Region }>();

        for (const region of this.keys()) {
            const regionProvinces = this.get(region);
            regions.set(region.name, region);

            for (const province of regionProvinces) {
                provinces.set(
                    province.name,
                    Object.assign(province, { region: region })
                );
            }
        }

        this.regions = regions;
        this.provinces = provinces;
    }

}
