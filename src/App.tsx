import { useEffect } from 'react'

import useInitUser from './hooks/useInitUser.ts'
import LoadingWrapper from './components/LoadingWrapper.tsx'
import AuthRouter from './components/routers/AuthRouter.tsx'
import IndexRouter from './components/routers/IndexRouter.tsx'

export default function App (): JSX.Element {
  const { loading, initError, user, initUser } = useInitUser()

  useEffect(() => {
    console.log({ loading, initError, user })
  }, [loading, initError, user])

  if (loading) {
    return (
      <LoadingWrapper
        loading={loading}
        error={initError}
      />
    )
  }

  return user === null
    ? (
      <AuthRouter
        initUser={initUser}
      />
      )
    : (
      <IndexRouter
        user={user}
        initUser={initUser}
      />
      )
}
