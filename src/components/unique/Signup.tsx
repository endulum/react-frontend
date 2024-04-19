import { Link, useNavigate } from 'react-router-dom'

import APIForm from '../APIForm.tsx'

export default function Signup (): JSX.Element {
  const navigate = useNavigate()
  function signUp (
    formData: Record<string, string>,
    _responseData: { token: string }
  ): void {
    navigate('/login', {
      state: { username: formData.username }
    })
  }

  return (
    <>
      <APIForm
        endpoint={{
          url: 'http://localhost:3000/signup',
          method: 'POST'
        }}
        onSuccess={signUp}
      >
        <label htmlFor="username">
          <span>Username</span>
          <input type="text" id="username" />
        </label>

        <label htmlFor="password">
          <span>Password</span>
          <input type="password" id="password" />
        </label>

        <label htmlFor="confirmPassword">
          <span>Confirm Password</span>
          <input type="password" id="confirmPassword" />
        </label>

        <button type="submit">Sign Up</button>
      </APIForm>
      <Link to="/login">Log In</Link>
    </>
  )
}
