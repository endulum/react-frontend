import { useState, type ChangeEvent, type FormEvent, type SetStateAction, type Dispatch, useEffect } from 'react'
import { useReadLocalStorage } from 'usehooks-ts'
import useFetch from '../useFetch.ts'
import { type FormErrors } from '../types.ts'

export default function APIForm ({
  children, onSuccess, fetchUrl, fetchMethod, handleFormErrors, handleLoading
}: {
  children: JSX.Element | Array<JSX.Element | false>
  onSuccess: (...args: any) => void
  fetchUrl: string
  fetchMethod: string
  handleFormErrors: Dispatch<SetStateAction<FormErrors>>
  handleLoading: Dispatch<SetStateAction<boolean>>
}): JSX.Element {
  const token = useReadLocalStorage<string>('token')

  const [form, setForm] = useState({})

  function handleChange (e: ChangeEvent<HTMLFormElement>): void {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  const {
    data, loading, error, fetchData
  } = useFetch<string | FormErrors>(
    false,
    fetchUrl,
    {
      method: fetchMethod ?? 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: token !== null ? `Bearer ${token}` : ''
      },
      body: JSON.stringify(form)
    }
  )

  function handleSubmit (e: FormEvent): void {
    e.preventDefault()
    void fetchData()
  }

  // useEffect(() => {
  //   console.log(form)
  // }, [form])

  useEffect(() => {
    if (error === null && data !== null) onSuccess(data)
  }, [data])

  useEffect(() => {
    handleLoading(loading)
  }, [loading])

  useEffect(() => {
    if (
      error === 'There were some errors with your submission.' &&
      data !== null &&
      typeof data !== 'string'
    ) {
      handleFormErrors(data)
    } else {
      // console.log('hillaeo')
      // handleFormErrors([])
    }
  }, [error])

  return (
    <form onChange={handleChange} onSubmit={handleSubmit}>
      {children}
    </form>
  )
}
