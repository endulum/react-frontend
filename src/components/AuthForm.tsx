import { useState } from 'react'
import { Link } from 'react-router-dom'
import APIForm from './APIForm.tsx'
import { type FormErrors } from '../types.ts'

export default function AuthForm ({ endpoint }: {
  endpoint: 'login' | 'signup'
}): JSX.Element {
  const [formErrors, setFormErrors] = useState<FormErrors>([])
  const [formLoading, setFormLoading] = useState<boolean>(false)

  function isError (fieldName: string): boolean {
    return formErrors.some((error) => error.path === fieldName)
  }

  function getError (fieldname: string): string | undefined {
    return formErrors.find((error) => error.path === fieldname)?.msg
  }

  return (
    <>
      <div className="auth-form">
        <h2>
          {endpoint === 'signup' && 'Sign Up'}
          {endpoint === 'login' && 'Log In'}
        </h2>
        <APIForm
          fetchUrl={`http://localhost:3000/${endpoint}`}
          fetchMethod="POST"
          handleFormErrors={setFormErrors}
          handleLoading={setFormLoading}
        >
          <label htmlFor="username">
            <span>Username</span>
            <input type="text" id="username" className={isError('username') ? 'error' : ''} />
            {isError('username') && <small>{getError('username')}</small>}
          </label>

          <label htmlFor="password">
            <span>Password</span>
            <input type="password" id="password" className={isError('username') ? 'error' : ''} />
            {isError('password') && <small>{getError('password')}</small>}
          </label>

          {endpoint === 'signup' && (
          <label htmlFor="confirmPassword">
            <span>Confirm Password</span>
            <input type="password" id="confirmPassword" className={isError('confirmPassword') ? 'error' : ''} />
            {isError('confirmPassword') && <small>{getError('confirmPassword')}</small>}
          </label>
          )}

          <button type="submit" disabled={formLoading}>Submit</button>
        </APIForm>
      </div>
      <Link to={endpoint === 'login' ? '/signup' : '/login'}>
        {endpoint === 'login' ? 'Sign up' : 'Log in'}
      </Link>
    </>
  )
}
