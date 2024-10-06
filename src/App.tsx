import { useEffect } from 'react';

import useInitUser from './hooks/useInitUser';
import LoadingWrapper from './components/LoadingWrapper';
import AuthRouter from './components/routers/AuthRouter';
import IndexRouter from './components/routers/IndexRouter';

export default function App(): JSX.Element {
  const {
    loading, initError, user, initUser, changeUsername,
  } = useInitUser();

  useEffect(() => {
    console.log({ loading, initError, user });
  }, [loading, initError, user]);

  if (loading) {
    return (
      <LoadingWrapper
        loading={loading}
        error={initError}
      />
    );
  }

  return user === null
    ? (
      <AuthRouter
        initUser={initUser}
      />
    )
    : (
      <IndexRouter
        user={user}
        initUser={initUser}
        changeUsername={changeUsername}
      />
    );
}
