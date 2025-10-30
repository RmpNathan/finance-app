type MoneyOpts = {
    locale?: string
    currency?: string
    minimumFractionDigits?: number
    maximumFractionDigits?: number
}

const formatters = new Map<string, Intl.NumberFormat>()

export function money(
    amount: number | string | null | undefined,
    opts: MoneyOpts = {}
) {
    const {
        locale = 'en-US',
        currency = 'USD',
        minimumFractionDigits = 0,
        maximumFractionDigits = 0,
    } = opts

    const key = JSON.stringify({ locale, currency, minimumFractionDigits, maximumFractionDigits })
    let fmt = formatters.get(key)
    if (!fmt) {
        fmt = new Intl.NumberFormat(locale, {
            style: 'currency',
            currency,
            ...(minimumFractionDigits !== undefined ? { minimumFractionDigits } : {}),
            ...(maximumFractionDigits !== undefined ? { maximumFractionDigits } : {}),
        })
        formatters.set(key, fmt)
    }

    const n = typeof amount === 'string' ? Number(amount) : amount
    if (n == null || Number.isNaN(n as number)) return '–'
    return fmt.format(n as number)
}
