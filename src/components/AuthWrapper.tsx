import { Outlet } from 'react-router-dom'

export default function AuthWrapper (): JSX.Element {
  return (
    <main className="auth-wrapper">
      <Outlet />
    </main>
  )
}
