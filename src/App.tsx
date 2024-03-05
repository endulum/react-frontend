import { Routes, Route, Navigate } from 'react-router-dom'
import { useLocalStorage } from 'usehooks-ts'
import { useEffect } from 'react'
import useFetch from './useFetch.ts'
import Index from './routes/Index.tsx'
import Login from './routes/Login.tsx'

export default function App (): JSX.Element | undefined {
  const [token, setToken] = useLocalStorage<string | null>('token', null)

  const {
    data, loading, error, fetchData
  } = useFetch<{ username: string, id: string }>(
    true,
    'http://localhost:3000/login',
    {
      method: 'GET',
      headers: token !== null
        ? {
            Authorization: `Bearer ${token}`
          }
        : {}
    }
  )

  useEffect(() => {
    if (
      error !== null &&
      [
        'Token could not be verified.',
        'The user this token belongs to could not be found.'
      ].includes(error)
    ) {
      // eslint-disable-next-line no-console
      console.warn('Invalid token provided, nullifying token...')
      setToken(null)
      void fetchData()
    }
  }, [error])

  if (loading) return <p>Loading...</p>
  if (error !== null && error !== 'Please log in.') return <p>{error}</p>
  return (
    <Routes>
      <Route
        path="/login"
        element={
        token !== null ? <Navigate to="/" /> : <Login />
      }
      />
      <Route
        path="/"
        element={
        token !== null ? <Index data={data} /> : <Navigate to="/login" />
      }
      />
      <Route path="*" element={<p>Not found.</p>} />
    </Routes>
  )
}
