import { Link } from 'react-router-dom'

export default function Index ({ data }: {
  data: { username: string, id: string } | null
}): JSX.Element | undefined {
  if (data !== null) {
    return (
      <p>
        Welcome back,
        {' '}
        {data.username}
        . This is the index.
        {' '}
        <Link to="/login">Go to /login?</Link>
      </p>
    )
  }
}
