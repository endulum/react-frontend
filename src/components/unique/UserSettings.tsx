import { type IUser } from '../../types.ts'
import APIForm from '../APIForm.tsx'

export default function UserSettings (
  { user, changeUsername }: {
    user: IUser
    changeUsername: (username: string) => void
  }
): JSX.Element {
  function handleSuccess (formData: Record<string, string>): void {
    if (formData.username !== user.username) {
      changeUsername(formData.username)
    }
  }

  return (
    <>
      <h2>Account Settings</h2>
      <APIForm
        endpoint={{
          url: `http://localhost:3000/user/${user.id}`,
          method: 'PUT'
        }}
        onSuccess={handleSuccess}
      >
        <h3>Change Username</h3>
        <label htmlFor="username">
          <span>New username</span>
          <input type="text" id="username" defaultValue={user.username} />
        </label>

        <h3>Change Password</h3>
        <label htmlFor="newPassword">
          <span>New password</span>
          <input type="password" id="newPassword" />
        </label>
        <label htmlFor="confirmNewPassword">
          <span>Confirm new password</span>
          <input type="password" id="confirmNewPassword" />
        </label>
        <label htmlFor="currentPassword">
          <span>Current password</span>
          <input type="password" id="currentPassword" />
        </label>

        <button type="submit">Save Changes</button>
      </APIForm>
    </>
  )
}
