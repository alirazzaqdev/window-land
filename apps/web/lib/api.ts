const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'

async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Unknown error' }))
    throw new Error(error.message ?? `API error ${res.status}`)
  }

  return res.json() as Promise<T>
}

export const api = {
  get: <T>(endpoint: string, init?: RequestInit) =>
    fetchAPI<T>(endpoint, { ...init, method: 'GET' }),

  post: <T>(endpoint: string, body: unknown, init?: RequestInit) =>
    fetchAPI<T>(endpoint, {
      ...init,
      method: 'POST',
      body: JSON.stringify(body),
    }),

  put: <T>(endpoint: string, body: unknown, init?: RequestInit) =>
    fetchAPI<T>(endpoint, {
      ...init,
      method: 'PUT',
      body: JSON.stringify(body),
    }),

  delete: <T>(endpoint: string, init?: RequestInit) =>
    fetchAPI<T>(endpoint, { ...init, method: 'DELETE' }),
}
