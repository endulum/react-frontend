import { Link, useLocation } from 'react-router-dom'

import APIForm from '../APIForm.tsx'
import { setStoredToken } from '../../functions/tokenUtils.ts'

export default function Login (
  { initUser }: {
    initUser: () => Promise<void>
  }
): JSX.Element {
  const { state } = useLocation()

  function logIn (
    _formData: Record<string, string>,
    responseData: { token: string }
  ): void {
    setStoredToken(responseData.token)
    void initUser()
  }

  return (
    <>
      {state !== null && state.username !== null && (
      <p>
        Account successfully created. Proceed to log in to your new account.
      </p>
      )}
      <APIForm
        endpoint={{
          url: 'http://localhost:3000/login',
          method: 'POST'
        }}
        onSuccess={logIn}
      >
        <label htmlFor="username">
          <span>Username</span>
          <input type="text" id="username" defaultValue={state?.username} />
        </label>

        <label htmlFor="password">
          <span>Password</span>
          <input type="password" id="password" />
        </label>

        <button type="submit">Log In</button>
      </APIForm>
      <Link to="/signup">Sign up</Link>
    </>

  )
}
