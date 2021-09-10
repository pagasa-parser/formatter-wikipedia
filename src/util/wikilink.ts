export default function(text: string, page?: string) {
    return page == null || text === page ? `[[${text}]]` : `[[${page}|${text}]]`;
}
