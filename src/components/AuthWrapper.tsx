import { Outlet } from 'react-router-dom'

export default function AuthWrapper (): JSX.Element {
  return (
    <main className="auth-wrapper">
      <h1>App</h1>
      <Outlet />
    </main>
  )
}
