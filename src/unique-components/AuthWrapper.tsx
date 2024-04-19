import { Outlet } from 'react-router-dom'

export default function AuthWrapper (): JSX.Element {
  return (
    <main className="auth">
      <h1>App</h1>
      <div className="auth-body">
        <Outlet />
      </div>
    </main>
  )
}
