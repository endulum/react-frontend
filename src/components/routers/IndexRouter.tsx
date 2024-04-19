import { Routes, Route, Navigate } from 'react-router-dom'

import IndexWrapper from '../unique/IndexWrapper.tsx'
import UserSettings from '../unique/UserSettings.tsx'
import { type IUser } from '../../types.ts'

export default function IndexRouter (
  { user, initUser, changeUsername }: {
    user: IUser
    initUser: () => Promise<void>
    changeUsername: (username: string) => void
  }
): JSX.Element {
  return (
    <Routes>
      <Route element={<IndexWrapper user={user} initUser={initUser} />}>
        <Route path="/" element={<p>Hey.</p>} />
        <Route
          path="settings"
          element={
            <UserSettings user={user} changeUsername={changeUsername} />
          }
        />
        <Route path="/login" element={<Navigate to="/" />} />
        <Route path="/signup" element={<Navigate to="/" />} />
        <Route path="*" element={<p>Nothing found at this URL.</p>} />
      </Route>
    </Routes>
  )
}
