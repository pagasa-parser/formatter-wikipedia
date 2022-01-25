import TestData from "../data/TestData";
import PagasaParserWikipediaFormatter from "../../src/PagasaParserWikipediaFormatter";
import * as fs from "fs";
import * as path from "path";

describe("export test", function () {

    jest.setTimeout(60000);
    test("basic", async () => {
        const json = TestData;
        const formatter = new PagasaParserWikipediaFormatter();

        const outDir = path.join(__dirname, "..", "out");
        if (!fs.existsSync(outDir))
            fs.mkdirSync(outDir);
        fs.writeFileSync(
            path.join(outDir, "TestData.wikitext"),
            await formatter.format(json)
        );
    });

});
