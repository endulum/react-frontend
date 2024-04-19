import { Routes, Route, Navigate } from 'react-router-dom'

import IndexWrapper from '../unique/IndexWrapper.tsx'
import { clearStoredToken } from '../../functions/tokenUtils.ts'
import { type IUser } from '../../types.ts'

export default function IndexRouter (
  { user, initUser }: {
    user: IUser
    initUser: () => Promise<void>
  }
): JSX.Element {
  return (
    <Routes>
      <Route element={<IndexWrapper user={user} />}>
        <Route
          path="/"
          element={(
            <button
              type="button"
              onClick={() => {
                clearStoredToken()
                void initUser()
              }}
            >
              Log Out
            </button>
          )}
        />
        <Route path="/login" element={<Navigate to="/" />} />
        <Route path="/signup" element={<Navigate to="/" />} />
        <Route path="*" element={<p>Nothing found at this URL.</p>} />
      </Route>
    </Routes>
  )
}
