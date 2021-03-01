async function fetcher<Data>(
  input: RequestInfo, init?: RequestInit
): Promise<Data> {
  const response = await fetch(input, init)

  if (!response.ok) {
    throw new Error(`An error occurred while fetching ${input}`)
  }

  return response.json()
}

export default fetcher