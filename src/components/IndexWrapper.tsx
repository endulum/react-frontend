import { type Dispatch, type SetStateAction } from 'react'
import { Outlet, Link } from 'react-router-dom'

export default function IndexWrapper ({ setToken }: {
  setToken: Dispatch<SetStateAction<string | null>>
}): JSX.Element {
  function logOut (): void {
    setToken(null)
  }

  return (
    <>
      <header>
        <Link to="/">
          <button type="button">
            Index
          </button>
        </Link>
        <button type="button" onClick={logOut}>
          Log Out
        </button>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}
