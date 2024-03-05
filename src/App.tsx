import { Routes, Route, Navigate } from 'react-router-dom'
import { useLocalStorage } from 'usehooks-ts'
import { useEffect } from 'react'
import useFetch from './useFetch.ts'
import IndexWrapper from './components/IndexWrapper.tsx'
import AuthWrapper from './components/AuthWrapper.tsx'
import Login from './routes/Login.tsx'
import Signup from './routes/Signup.tsx'
// import AuthForm from './components/AuthForm.tsx'
import Index from './routes/Index.tsx'
import './App.css'

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
        element={
        token !== null ? <Navigate to="/" /> : <AuthWrapper />
      }
      >
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      <Route
        element={
        data !== null ? <IndexWrapper userData={data} /> : <Navigate to="/login" />
      }
      >
        <Route path="/" element={<Index />} />
      </Route>
      <Route path="*" element={<p>Not found.</p>} />
    </Routes>
  )
}
