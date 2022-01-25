export default function(number: number, maxLength: number): string {
    let numberString = number.toString();
    numberString = "0".repeat(
        Math.max(maxLength - numberString.length, 0)
    ) + numberString;
    return numberString;
}
