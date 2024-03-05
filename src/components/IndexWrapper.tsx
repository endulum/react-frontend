import { Outlet } from 'react-router-dom'

export default function IndexWrapper ({ userData }: {
  userData: { username: string, id: string }
}): JSX.Element {
  return (
    <>
      <header>
        <p>
          Logged in as
          {' '}
          <b>{userData.username}</b>
        </p>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}
