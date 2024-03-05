import { Link } from 'react-router-dom'
import { useState } from 'react'
import APIForm from '../components/APIForm.tsx'
import { type FormErrors } from '../types.ts'

export default function Login (): JSX.Element {
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
        <h2>Log In</h2>
        <APIForm
          fetchUrl="http://localhost:3000/login"
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
          <button type="submit" disabled={formLoading}>Submit</button>
        </APIForm>
      </div>
      <Link to="/signup">Sign up</Link>
    </>
  )
}
