import { Link } from 'react-router-dom'

export default function Index (): JSX.Element {
  return (
    <p>
      This is the index.
      {' '}
      <Link to="/login">Go to login?</Link>
    </p>
  )
}
