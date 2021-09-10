import StringBuilder from "./StringBuilder";

export default class Template {

    static readonly TEMPLATE_START = "{{";
    static readonly TEMPLATE_END = "}}";
    static readonly TEMPLATE_SEPARATOR = "| ";
    static readonly TEMPLATE_ASSIGN = " = ";

    private parameters : Record<string, string> = {};

    constructor(
        private readonly name : string,
        private readonly block = true
    ) {}

    set(name : string, value : string) {
        if (name == null || name === "0")
            throw "Name cannot be null or zero.";
        this.parameters[isNaN(+name) ? name : +name] = value;
    }

    toString() {
        const out = new StringBuilder();
        const append = this.block ? out.appendLine : out.append;

        append.call(out, Template.TEMPLATE_START + this.name);
        let i = 1;
        while (this.parameters[i] != null) {
            append.call(out, Template.TEMPLATE_SEPARATOR + this.parameters[i]);
        }

        for (const [name, parameter] of Object.entries(this.parameters)) {
            if (isNaN(+parameter) ? parameter : +parameter > i)
                append.call(
                    out,
                    Template.TEMPLATE_SEPARATOR
                    + name
                    + Template.TEMPLATE_ASSIGN
                    + parameter
                );
        }

        out.append(Template.TEMPLATE_END);
        return out.toString();
    }

}
