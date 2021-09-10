import TestData from "../data/TestData";
import PagasaParserWikipediaFormatter from "../../src/PagasaParserWikipediaFormatter";
import * as fs from "fs";
import * as path from "path";

describe("export test", function () {

    jest.setTimeout(60000);
    test("basic", async () => {
        const json = TestData;
        const formatter = new PagasaParserWikipediaFormatter();

        fs.writeFileSync(
            path.join(__dirname, "..", "out", "TestData.wikitext"),
            await formatter.format(json)
        );
    });

});
