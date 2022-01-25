export default function(text: string, page?: string): string {
    return page == null || text === page ? `[[${text}]]` : `[[${page}|${text}]]`;
}
