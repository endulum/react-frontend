import { Link } from 'react-router-dom'

export default function Index ({ userData }: {
  userData: { username: string, id: string }
}): JSX.Element {
  return (
    <>
      <p>
        This is the index.
      </p>
      <ul>
        <li>
          <Link to={`/user/${userData.id}`}>Your profile</Link>
        </li>
        <li>
          <Link to="/geterroredboi">Nonexistent page</Link>
        </li>
      </ul>
    </>
  )
}
