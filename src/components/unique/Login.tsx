import APIForm from '../APIForm.tsx'
import { setStoredToken } from '../../functions/tokenUtils.ts'

export default function Login (
  { initUser }: {
    initUser: () => Promise<void>
  }
): JSX.Element {
  function logIn (
    _formData: Record<string, string>,
    responseData: { token: string }
  ): void {
    setStoredToken(responseData.token)
    void initUser()
  }

  return (
    <APIForm
      endpoint={{
        url: 'http://localhost:3000/login',
        method: 'POST'
      }}
      onSuccess={logIn}
    >
      <label htmlFor="username">
        <span>Username</span>
        <input type="text" id="username" />
      </label>

      <label htmlFor="password">
        <span>Password</span>
        <input type="password" id="password" />
      </label>

      <button type="submit">Log In</button>
    </APIForm>
  )
}
