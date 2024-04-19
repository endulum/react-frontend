import { Routes, Route, Navigate } from 'react-router-dom'

import AuthWrapper from '../unique-components/AuthWrapper.tsx'

export default function AuthRouter (): JSX.Element {
  return (
    <Routes>
      <Route element={<AuthWrapper />}>
        <Route path="login" element={<p>Log in here.</p>} />
        <Route path="signup" element={<p>Sign up here.</p>} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Route>
    </Routes>
  )
}
