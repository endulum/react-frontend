import { useState } from 'react'
import { Link } from 'react-router-dom'
import APIForm from '../components/APIForm.tsx'
import { type FormErrors } from '../types.ts'

export default function Signup (): JSX.Element {
  const [success, setSuccess] = useState<boolean>(false)
  const [formErrors, setFormErrors] = useState<FormErrors>([])
  const [formLoading, setFormLoading] = useState<boolean>(false)

  function isError (fieldName: string): boolean {
    return formErrors.some((error) => error.path === fieldName)
  }

  function getError (fieldname: string): string | undefined {
    return formErrors.find((error) => error.path === fieldname)?.msg
  }

  function handleSuccess (): void {
    setSuccess(true)
  }

  return (
    <>
      <div className="auth-form">
        <h2>Sign Up</h2>
        {success && (
          <p className="auth-success">
            Account created. Please
            {' '}
            <Link to="/login">log in</Link>
            {' '}
            to your new account.
          </p>
        )}
        <APIForm
          fetchUrl="http://localhost:3000/signup"
          fetchMethod="POST"
          handleFormErrors={setFormErrors}
          handleLoading={setFormLoading}
          onSuccess={handleSuccess}
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

          <label htmlFor="confirmPassword">
            <span>Confirm Password</span>
            <input type="password" id="confirmPassword" className={isError('confirmPassword') ? 'error' : ''} />
            {isError('confirmPassword') && <small>{getError('confirmPassword')}</small>}
          </label>

          <button type="submit" disabled={formLoading}>Submit</button>
        </APIForm>
      </div>
      <Link to="/login">Log in</Link>
    </>
  )
}
