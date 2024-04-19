import { useState, type FormEvent } from 'react'

import doFetch from '../functions/doFetch.ts'
import { getStoredToken } from '../functions/tokenUtils.ts'
import { type TFormErrors } from '../types.ts'

export default function useAPIFormData (
  endpoint: { url: string, method: string },
  onSuccess: (formData: Record<string, string>, responseData: any) => void
): {
    loading: boolean
    formError: string | null
    inputErrors: Record<string, string>
    doSubmit: (event: FormEvent) => Promise<void>
  } {
  const [loading, setLoading] = useState<boolean>(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [inputErrors, setInputErrors] = useState<Record<string, string>>({})

  async function doSubmit (event: FormEvent): Promise<void> {
    event.preventDefault()
    const token = getStoredToken()

    const formData: Record<string, string> = {}
    Object.values(event.target).forEach((element) => {
      if (element instanceof HTMLInputElement) {
        formData[element.id] = element.value
      }
    })

    setLoading(true)
    setFormError(null)
    setInputErrors({})
    const { data, status, error } = await doFetch<TFormErrors | unknown>(
      endpoint.url,
      {
        method: endpoint.method,
        headers: {
          'Content-type': 'application/json',
          Authorization: token !== null ? `Bearer ${token}` : ''
        },
        body: JSON.stringify(formData)
      }
    )
    setLoading(false)

    if (error !== null) {
      if (
        status === 422 &&
        typeof data === 'object' &&
        data !== null &&
        'errors' in data
      ) {
        setFormError('There were some errors with your submission.')
        const inpErrs: Record<string, string> = {};
        (data.errors as TFormErrors).forEach((err) => {
          inpErrs[err.path] = err.msg
        })
        setInputErrors(inpErrs)
      } else setFormError(error)
    }

    if (status === 200) onSuccess(formData, data)
  }

  return { loading, formError, inputErrors, doSubmit }
}
