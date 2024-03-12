import { useParams } from 'react-router-dom'
import useFetch from '../useFetch.ts'

interface UserDetail {
  username: string
}

export default function UserView (): JSX.Element | undefined {
  const params = useParams()
  const {
    data, loading, error, fetchData
  } = useFetch<UserDetail>(
    true,
    `http://localhost:3000/user/${params.id}`,
    {
      method: 'GET'
    }
  )

  if (loading) return <p>Loading...</p>
  if (error !== null) return <p>{error}</p>
  if (data !== null) {
    return (
      <h1>{data.username}</h1>
    )
  }
}
