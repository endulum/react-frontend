import { useEffect } from 'react'
import useInitUser from './hooks/useInitUser.ts'

export default function App (): JSX.Element {
  const { loading, initError, user } = useInitUser()

  useEffect(() => {
    console.log({ loading, initError, user })
  }, [loading, initError, user])

  return <p>hi</p>
}
