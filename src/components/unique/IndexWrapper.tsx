import { Outlet, Link } from 'react-router-dom'

import { clearStoredToken } from '../../functions/tokenUtils.ts'
import { type IUser } from '../../types.ts'

export default function IndexWrapper (
  { user, initUser }: {
    user: IUser
    initUser: () => Promise<void>
  }
): JSX.Element {
  return (
    <main className="index">
      <h1>
        Welcome Back,
        {' '}
        {user.username}
      </h1>
      <ul>
        <li>
          <Link to="/">Index</Link>
        </li>
        <li>
          <Link to="settings">Settings</Link>
        </li>
        <li>
          <Link
            to="login"
            onClick={() => {
              clearStoredToken()
              void initUser()
            }}
          >
            Log out
          </Link>
        </li>
      </ul>
      <div className="index-body">
        <Outlet />
      </div>
    </main>
  )
}
