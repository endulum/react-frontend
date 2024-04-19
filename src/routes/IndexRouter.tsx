import { Routes, Route, Navigate } from 'react-router-dom'

import IndexWrapper from '../unique-components/IndexWrapper.tsx'
import { type IUser } from '../types.ts'

export default function IndexRouter (
  { user }: {
    user: IUser
  }
): JSX.Element {
  return (
    <Routes>
      <Route element={<IndexWrapper user={user} />}>
        <Route path="/" element={<p>Chill out here.</p>} />
        <Route path="/login" element={<Navigate to="/" />} />
        <Route path="/signup" element={<Navigate to="/" />} />
        <Route path="*" element={<p>Nothing found at this URL.</p>} />
      </Route>
    </Routes>
  )
}
