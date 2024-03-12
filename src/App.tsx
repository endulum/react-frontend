import { Routes, Route, Navigate } from 'react-router-dom'
import { useLocalStorage } from 'usehooks-ts'
import { useEffect } from 'react'
import useFetch from './useFetch.ts'
import IndexWrapper from './components/IndexWrapper.tsx'
import AuthWrapper from './components/AuthWrapper.tsx'
import Login from './routes/Login.tsx'
import Signup from './routes/Signup.tsx'
import Index from './routes/Index.tsx'
import './App.css'
import UserView from './routes/UserView.tsx'

export default function App (): JSX.Element | undefined {
  const [token, setToken] = useLocalStorage<string | null>('token', null)

  const {
    data, loading, error, fetchData
  } = useFetch<{ username: string, id: string }>(
    false,
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
    }
  }, [error])

  useEffect(() => {
    void fetchData()
  }, [token])

  if (loading) return <p>Loading...</p>
  if (error !== null && error !== 'Please log in.') return <p>{error}</p>
  return (
    <Routes>
      <Route
        element={
          token !== null ? <Navigate to="/" /> : <AuthWrapper />
        }
      >
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      {data !== null && (
      <Route
        element={
          data !== null ? <IndexWrapper userData={data} setToken={setToken} /> : <Navigate to="/login" />
        }
      >
        <Route path="/" element={<Index userData={data} />} />
        <Route path="/user/:id" element={<UserView />} />
        <Route path="*" element={<p>Not found.</p>} />
      </Route>
      )}
      <Route path="*" element={token === null ? <Navigate to="login" /> : <p>Not found.</p>} />
    </Routes>
  )
}
