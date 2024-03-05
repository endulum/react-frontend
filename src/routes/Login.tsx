import { Link } from 'react-router-dom'

export default function Login (): JSX.Element {
  return (
    <p>
      This is the login page.
      {' '}
      <Link to="/">Go to index?</Link>
    </p>
  )
}
