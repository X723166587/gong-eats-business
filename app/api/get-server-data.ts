export default async function getServerData(url: string) {
    // The return value is *not* serialized

    const response = await fetch(process.env.SERVER_URL + url, {method: 'GET', cache: 'no-store'})
    if (!response.ok) {
        throw new Error(`Failed to fetch data from ${url}. HTTP status: ${response.status}`)
    }
    return response.json()
}