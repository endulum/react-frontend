import { useLocation } from 'react-router-dom';
// own imports
import Form from '../reusable/Form';

export default function Login({ logIn }: {
  logIn: (token: string) => void
}) {
  const { state } = useLocation();

  return (
    <Form<{ token: string }>
      destination={{ endpoint: '/login', method: 'POST' }}
      onSuccess={(_formData, fetchResult) => {
        logIn(fetchResult.token);
      }}
      buttonText="Log In"
    >
      <label htmlFor="username">
        <span>Username</span>
        <input type="text" id="username" autoComplete="on" defaultValue={state ? state.username : ''} />
      </label>
      <label htmlFor="password">
        <span>Password</span>
        <input type="password" id="password" autoComplete="on" />
      </label>
    </Form>
  );
}
