import { Link } from 'react-router-dom'

export default function Signup (): JSX.Element {
  return (
    <>
      <div className="auth-form">
        <h2>Sign Up</h2>
        <form>
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

          <button type="submit">Submit</button>
        </form>
      </div>
      <Link to="/login">Log in</Link>
    </>
  )
}
