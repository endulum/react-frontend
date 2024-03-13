import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Modal from 'react-modal'
import APIForm from '../components/APIForm.tsx'
import useFetch from '../useFetch.ts'
import { type FormErrors } from '../types.ts'

interface UserDetail {
  username: string
  id: string
}

export default function UserView ({ userData }: {
  userData: { id: string }
}): JSX.Element | undefined {
  Modal.setAppElement('#root')

  const params = useParams()
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const [submissionError, setSubmissionError] = useState<string | null>(null)
  const [formErrors, setFormErrors] = useState<FormErrors>([])
  const [formLoading, setFormLoading] = useState<boolean>(false)

  const {
    data, loading, error, fetchData
  } = useFetch<UserDetail>(
    true,
    `http://localhost:3000/user/${params.id}`,
    {
      method: 'GET'
    }
  )

  function isError (fieldName: string): boolean {
    return formErrors.some((formError) => formError.path === fieldName)
  }

  function getError (fieldname: string): string | undefined {
    return formErrors.find((formError) => formError.path === fieldname)?.msg
  }

  function handleSuccess (): void {
    setModalIsOpen(false)
    void fetchData()
  }

  if (loading) return <p>Loading...</p>
  if (error !== null) return <p>{error}</p>
  if (data !== null) {
    return (
      <>
        <h1>{data.username}</h1>
        {data.id === userData.id && (
          <button type="button" onClick={() => { setModalIsOpen(true) }}>
            Edit your details
          </button>
        )}
        <Modal
          className="modal-content edit-form"
          overlayClassName="modal-overlay"
          contentLabel="Editing Profile Details"
          isOpen={modalIsOpen}
        >
          <h2>Edit Profile Details</h2>
          {submissionError !== null && (
            <p>
              {submissionError}
            </p>
          )}
          <APIForm
            onSuccess={handleSuccess}
            fetchUrl={`http://localhost:3000/user/${data.username}`}
            fetchMethod="PUT"
            handleSubmitError={setSubmissionError}
            handleFormErrors={setFormErrors}
            handleLoading={setFormLoading}
          >
            <label htmlFor="username">
              <span>Username</span>
              <input
                type="text"
                id="username"
                className={isError('username') ? 'error' : ''}
                defaultValue={data.username}
              />
              {isError('username') && <small>{getError('username')}</small>}
            </label>
            <button type="submit" disabled={formLoading}>Submit</button>
          </APIForm>
          <button type="button" onClick={() => { setModalIsOpen(false) }}>
            Cancel
          </button>
        </Modal>
      </>
    )
  }
}
