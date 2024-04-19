import { cloneElement, type FormEvent } from 'react'
import useAPIFormData from '../hooks/useAPIFormData.ts'

function isNotFalse<T> (argument: T | false): argument is T {
  return argument !== false
}

export default function APIForm (
  { endpoint, onSuccess, children }: {
    endpoint: { url: string, method: string }
    onSuccess: (formData: Record<string, string>, responseData: any) => void
    children: Array<JSX.Element | false>
  }
): JSX.Element {
  const {
    loading, formError, inputErrors, doSubmit
  } = useAPIFormData(endpoint, onSuccess)

  function handleSubmit (event: FormEvent): void {
    void doSubmit(event)
  }

  return (
    <form onSubmit={handleSubmit}>
      {formError !== null && <p>{formError}</p>}
      {children
        .filter(isNotFalse)
        .map((child) => {
          if (child.type === 'label') {
            return (
              <APIFormInput
                htmlFor={child.props.htmlFor}
                inputError={inputErrors[child.props.htmlFor] ?? null}
                key={child.props.htmlFor}
              >
                {child.props.children}
              </APIFormInput>
            )
          }
          if (
            child.type === 'button' &&
            child.props.type === 'submit'
          ) {
            return cloneElement(child, {
              key: 'submit',
              children: loading
                ? <span>Processing...</span>
                : child.props.children,
              disabled: loading
            })
          }
          return child
        })}
    </form>
  )
}

function APIFormInput (
  { htmlFor, inputError, children }: {
    htmlFor: string
    inputError: string | null
    children: JSX.Element[]
  }
): JSX.Element {
  return (
    <label htmlFor={htmlFor}>
      {children}
      {inputError !== null && <small>{inputError}</small>}
    </label>
  )
}
