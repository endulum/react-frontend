import { useEffect } from 'react'

import useInitUser from './hooks/useInitUser.ts'
import LoadingWrapper from './general-components/LoadingWrapper.tsx'
import AuthRouter from './routes/AuthRouter.tsx'
import IndexRouter from './routes/IndexRouter.tsx'

export default function App (): JSX.Element {
  const { loading, initError, user } = useInitUser()

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
      <AuthRouter />
      )
    : <IndexRouter user={user} />
}
