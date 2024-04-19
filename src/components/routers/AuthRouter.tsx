import { Routes, Route, Navigate } from 'react-router-dom'

import AuthWrapper from '../unique/AuthWrapper.tsx'
import Login from '../unique/Login.tsx'

export default function AuthRouter (
  { initUser }: {
    initUser: () => Promise<void>
  }
): JSX.Element {
  return (
    <Routes>
      <Route element={<AuthWrapper />}>
        <Route path="login" element={<Login initUser={initUser} />} />
        <Route path="signup" element={<p>Sign up here.</p>} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Route>
    </Routes>
  )
}
