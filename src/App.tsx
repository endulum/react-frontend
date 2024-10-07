// own imports
import { clearStoredToken, setStoredToken } from './functions/tokenUtils';
import useFormRequest from './hooks/useFormRequest';
import useInitUser from './hooks/useInitUser';
import LoadingWrapper from './components/LoadingWrapper';

export default function App() {
  const {
    loading: userLoading, error: initError, user, initUser,
  } = useInitUser();

  const {
    loading: formLoading, error: formError, inputErrors, handleSubmit,
  } = useFormRequest<{ token: string }>(
    { endpoint: '/login', method: 'POST' },
    (_formData, fetchResult) => {
      setStoredToken(fetchResult.token);
      initUser();
    },
  );

  if (userLoading || initError !== null) {
    return (
      <LoadingWrapper
        loading={userLoading}
        error={initError}
      />
    );
  }
  if (user) {
    return (
      <p>
        Welcome in!
        <button
          type="button"
          onClick={() => {
            clearStoredToken();
            initUser();
          }}
        >
          Log out
        </button>
      </p>
    );
  }
  return (
    <form onSubmit={handleSubmit}>
      {formError ? <p>{formError}</p> : ''}
      <label htmlFor="username">
        Username
        <input type="text" id="username" autoComplete="on" />
        { inputErrors && 'username' in inputErrors ? (
          <small>{inputErrors.username}</small>
        ) : ''}
      </label>
      <label htmlFor="password">
        Password
        <input type="password" id="password" autoComplete="on" />
        {inputErrors && 'password' in inputErrors ? (
          <small>{inputErrors.password}</small>
        ) : ''}
      </label>

      <button type="submit" disabled={formLoading}>Submit</button>
    </form>
  );
}
