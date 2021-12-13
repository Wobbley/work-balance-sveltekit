import type { DiffRequest, DiffResponse } from "./types"

export async function fetchDiff(diffRequest: DiffRequest): Promise<DiffResponse> {
    const diffResponse = await fetch('/api/diff', {
        method: 'POST',
        body: JSON.stringify(diffRequest),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return await diffResponse.json()
}