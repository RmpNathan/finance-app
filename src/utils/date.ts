export function dateShort(iso: string, locale = 'en-GB') {
    const d = new Date(iso)
    return new Intl.DateTimeFormat(locale, {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(d)
}
