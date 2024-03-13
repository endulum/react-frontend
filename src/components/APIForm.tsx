import { useState, type FormEvent, type SetStateAction, type Dispatch, useEffect } from 'react'
import { useReadLocalStorage } from 'usehooks-ts'
import useFetch from '../useFetch.ts'
import { type FormErrors } from '../types.ts'

export default function APIForm ({
  children, onSuccess, fetchUrl, fetchMethod,
  handleSubmitError, handleFormErrors, handleLoading
}: {
  children: JSX.Element | Array<JSX.Element | false>
  onSuccess: (...args: any | never) => void
  fetchUrl: string
  fetchMethod: string
  handleSubmitError: Dispatch<SetStateAction<string | null>>
  handleFormErrors: Dispatch<SetStateAction<FormErrors>>
  handleLoading: Dispatch<SetStateAction<boolean>>
}): JSX.Element {
  const token = useReadLocalStorage<string>('token')
  const [form, setForm] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

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
    const formData: Record<string, string> = {}
    Object.values(e.target).forEach((element) => {
      if (element instanceof HTMLInputElement) {
        formData[element.id] = element.value
      }
    })
    setForm(formData)
    setIsSubmitting(true)
  }

  useEffect(() => {
    if (error === null && data !== null) onSuccess(data, form)
  }, [data])

  useEffect(() => {
    if (isSubmitting) {
      void fetchData()
    }
    setIsSubmitting(false)
  }, [isSubmitting])

  useEffect(() => {
    handleLoading(loading)
  }, [loading])

  useEffect(() => {
    if (error !== null) {
      if (
        error === 'There were some errors with your submission.' &&
      data !== null &&
      typeof data !== 'string'
      ) {
        handleSubmitError(null)
        handleFormErrors(data)
      } else {
        handleSubmitError(error)
      }
    }
  }, [error])

  return (
    <form onSubmit={handleSubmit}>
      {children}
    </form>
  )
}
