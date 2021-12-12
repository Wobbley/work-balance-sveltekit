export async function fetchDiff(diffRequest) {
    let diffResponse = await fetch('/api/clockify', {
        method: 'POST',
        body: JSON.stringify(diffRequest),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return await diffResponse.json()
}