import { computed } from 'vue'
import { addMonths, differenceInCalendarDays, isSameMonth } from 'date-fns'
import { useTransactionsStore } from '@/stores/transactions'
import {Transaction} from "@/types/finance";

const sum = (arr: number[]) => arr.reduce((a, n) => a + n, 0)

export function useRecurringBills() {
    const txStore = useTransactionsStore()

    const referenceDate = computed(() => {
        const all = (txStore.items ?? []) as Transaction[]
        if (!all.length) return new Date()
        let latest = new Date(all[0].date)
        for (const t of all) {
            const d = new Date(t.date)
            if (+d > +latest) latest = d
        }
        return latest
    })

    const paidThisMonth = computed(() => {
        const ref = referenceDate.value
        return ((txStore.items ?? []) as Transaction[])
            .filter(t => t.category === 'Bills' && isSameMonth(new Date(t.date), ref))
            .map(t => Math.abs(t.amount))
    })

    const lastRecurringByVendor = computed(() => {
        const map = new Map<string, Transaction>()
        for (const t of ((txStore.items ?? []) as Transaction[])) {
            if (t.category !== 'Bills' || !t.recurring) continue
            const prev = map.get(t.name)
            if (!prev || +new Date(t.date) > +new Date(prev.date)) map.set(t.name, t)
        }
        return Array.from(map.values())
    })

    const vendorsPaidThisMonth = computed(() => {
        const ref = referenceDate.value
        return new Set(
            ((txStore.items ?? []) as Transaction[])
                .filter(t => t.category === 'Bills' && isSameMonth(new Date(t.date), ref))
                .map(t => t.name)
        )
    })

    const upcomingThisMonth = computed(() => {
        const ref = referenceDate.value
        const paidVendors = vendorsPaidThisMonth.value
        const amounts: number[] = []
        for (const last of lastRecurringByVendor.value) {
            if (paidVendors.has(last.name)) continue
            const next = addMonths(new Date(last.date), 1)
            if (isSameMonth(next, ref)) amounts.push(Math.abs(last.amount))
        }
        return amounts
    })

    const dueSoon = computed(() => {
        const ref = referenceDate.value
        const paidVendors = vendorsPaidThisMonth.value
        const amounts: number[] = []
        for (const last of lastRecurringByVendor.value) {
            if (paidVendors.has(last.name)) continue
            const next = addMonths(new Date(last.date), 1)
            if (isSameMonth(next, ref)) {
                const days = differenceInCalendarDays(next, ref)
                if (days >= 0 && days <= 7) amounts.push(Math.abs(last.amount))
            }
        }
        return amounts
    })

    const totals = computed(() => ({
        paid:     sum(paidThisMonth.value),
        upcoming: sum(upcomingThisMonth.value),
        dueSoon:  sum(dueSoon.value),
    }))

    return { totals, referenceDate }
}
