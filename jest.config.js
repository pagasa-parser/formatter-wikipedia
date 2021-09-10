module.exports = {

    testEnvironment: "node",
    preset: "ts-jest/presets/js-with-ts",
    transform: {
        "^.+\\.(ts|js)x?$": "ts-jest"
    },
    transformIgnorePatterns: [
        "node_modules[/\\\\](?!(node-fetch|fetch-blob)[\\\\/])"
    ],
    testRegex: "(/tests/)(.*?)(Tests?)(\\.[jt]s)$",
    testPathIgnorePatterns: [
        "ignore-",
        "disabled-"
    ],
    moduleFileExtensions: ["ts", "js"],

};
