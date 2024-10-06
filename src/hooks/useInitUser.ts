import { useState, useEffect, useRef } from 'react';

import { clearStoredToken, getStoredToken } from '../functions/tokenUtils';
import doFetch from '../functions/doFetch';

import { type IUser } from '../types';

export default function useInitUser(): {
  loading: boolean
  initError: string | null
  user: IUser | null
  initUser: () => Promise<void>
  changeUsername: (username: string) => void
} {
  const initialized = useRef<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [initError, setInitError] = useState<string | null>(null);
  const [user, setUser] = useState<IUser | null>(null);

  async function initUser(): Promise<void> {
    if (user !== null) setUser(null);
    if (initError !== null) setInitError(null);

    const token = getStoredToken();
    if (token === null) {
      setLoading(false); return;
    } if (!loading) setLoading(true);

    const { data, status, error } = await doFetch<IUser>(
      'http://localhost:3000/login',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (error !== null) {
      if (![401, 403, 404].includes(status)) setInitError(error);
      else {
        console.warn(error);
        clearStoredToken();
      }
    } else setUser(data);

    setLoading(false);
  }

  function changeUsername(username: string): void {
    if (user !== null) setUser({ ...user, username });
  }

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      initUser();
    }
  }, []);

  return {
    loading, initError, user, initUser, changeUsername,
  };
}
