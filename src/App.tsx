import {
  Routes, Route, Link, Navigate, useNavigate,
} from 'react-router-dom';
// own imports
import useInitUser from './hooks/useInitUser';
import LoadingWrapper from './components/reusable/LoadingWrapper';
import PageWrapper from './components/unique/PageWrapper';
import Login from './components/routes/Login';
import Signup from './components/routes/Signup';
import Account from './components/routes/Account';
import { setStoredToken } from './functions/tokenUtils';

export default function App() {
  const navigate = useNavigate();
  const {
    loading: userLoading, error: initError, user, initUser,
  } = useInitUser();

  if (userLoading || initError !== null) {
    return <LoadingWrapper loading={userLoading} error={initError} />;
  }

  return (
    <Routes>
      <Route element={<PageWrapper user={user} initUser={initUser} />}>
        {user ? (
          <>
            <Route path="/" element={<p>Welcome back!</p>} />
            <Route path="/account" element={<Account currentUsername={user.username} />} />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/signup" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<p>Welcome! Please sign in.</p>} />
            <Route
              path="/login"
              element={(
                <Login logIn={(token: string) => {
                  setStoredToken(token);
                  initUser();
                }}
                />
              )}
            />
            <Route
              path="/signup"
              element={(
                <Signup signUp={(username: string) => {
                  navigate('/login', {
                    state: { username },
                  });
                }}
                />
              )}
            />
          </>
        )}

        <Route
          path="*"
          element={(
            <>
              <p>There&apos;s nothing here...</p>
              <Link to="/">Go to index</Link>
            </>
          )}
        />
      </Route>
    </Routes>
  );
}
