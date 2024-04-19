import { Outlet } from 'react-router-dom'

import { type IUser } from '../../types.ts'

export default function IndexWrapper (
  { user }: {
    user: IUser
  }
): JSX.Element {
  return (
    <main className="index">
      <h1>
        Welcome Back,
        {' '}
        {user.username}
      </h1>
      <div className="index-body">
        <Outlet />
      </div>
    </main>
  )
}
