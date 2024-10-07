// own imports
import Form from '../reusable/Form';

export default function Signup({ signUp }: {
  signUp: (username: string) => void
}) {
  return (
    <Form<null>
      destination={{ endpoint: '/signup', method: 'POST' }}
      onSuccess={(formData) => {
        signUp(formData.username);
      }}
      buttonText="Log In"
    >
      <label htmlFor="username">
        <span>Username</span>
        <input type="text" id="username" autoComplete="off" />
      </label>
      <label htmlFor="password">
        <span>Password</span>
        <input type="password" id="password" autoComplete="off" />
      </label>
      <label htmlFor="confirmPassword">
        <span>Confirm password</span>
        <input type="password" id="confirmPassword" autoComplete="off" />
      </label>
    </Form>
  );
}
