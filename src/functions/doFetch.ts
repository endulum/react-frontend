export default async function doFetch<T> (url: string, payload: object): Promise<{
  data: T | null
  status: number
  error: string | null
}> {
  let data = null
  let status = 0
  let error = null
  try {
    const response = await fetch(url, payload)
    status = response.status
    const text: string = await response.text()

    // first, get any json data
    if (['{', '['].includes(text.charAt(0))) {
      const json: unknown = JSON.parse(text)
      data = json as T
    }

    // then, get errors by throwing them
    if (!response.ok) {
      if (['<', '{'].includes(text.charAt(0))) {
        throw new Error(response.statusText)
      }
      throw new Error(text)
    } else if (data === null) {
      // lastly, if response is ok we can also just use the text as data
      data = text as T
    }
  } catch (err) { error = handleError(err) }
  return { data, status, error }
}

function handleError (err: unknown): string {
  if (err instanceof TypeError) {
    return 'A network error occurred. Try again later.'
  } if (err instanceof Error && err.message !== '') {
    return err.message
  }
  console.error(err)
  return 'Something went wrong. See the console for details.'
}
