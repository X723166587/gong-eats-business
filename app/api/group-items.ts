export default function groupItemsByKey<T, K extends keyof T>(items: T[], key: K): Record<string, T[]> {
    return items.reduce((acc, item) => {
        const keyValue: string = String(item[key])
        if (!acc[keyValue]) {
            acc[keyValue] = []
        }
        acc[keyValue].push(item)
        return acc
    }, {} as Record<string, T[]>)
}