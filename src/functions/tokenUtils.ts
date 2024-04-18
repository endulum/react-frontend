export function getStoredToken (): string | null {
  const tokenString: string | null = localStorage.getItem('token')
  if (tokenString === null) return null

  let token: unknown
  try { token = JSON.parse(tokenString) } catch { return clearStoredToken() }
  // if the token can't be parsed, clear it

  if (typeof token !== 'string') return clearStoredToken()
  // if the token isn't a string, clear it

  return token
}

export function setStoredToken (token: string): void {
  localStorage.setItem('token', JSON.stringify(token))
}

export function clearStoredToken (): null {
  localStorage.removeItem('token')
  return null
}
