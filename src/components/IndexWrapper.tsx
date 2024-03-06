import { type Dispatch, type SetStateAction } from 'react'
import { Outlet } from 'react-router-dom'

export default function IndexWrapper ({ userData, setToken }: {
  userData: { username: string, id: string }
  setToken: Dispatch<SetStateAction<string | null>>
}): JSX.Element {
  function logOut (): void {
    setToken(null)
  }

  return (
    <>
      <header>
        <p>
          Logged in as
          {' '}
          <b>{userData.username}</b>
        </p>
        <p>
          <button type="button" onClick={logOut}>Log Out</button>
        </p>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}
