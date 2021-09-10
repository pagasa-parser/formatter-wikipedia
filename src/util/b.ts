export default function bullet(bullets : number, text : string) : string {
    return `${"*".repeat(bullets)} ${text}`;
}
