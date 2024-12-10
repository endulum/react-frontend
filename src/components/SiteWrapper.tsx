import { Link, Outlet } from "react-router-dom";

import { type User } from "../types";
import { clearStoredToken } from "../functions/tokenUtils";

export function SiteWrapper({
  context,
}: {
  context: {
    user: User | null;
    initUser: () => Promise<void>;
    changeUsername: (username: string) => void;
  };
}) {
  return (
    <>
      <header>
        <Link to="/">
          <h1>{import.meta.env.VITE_APP_NAME}</h1>
        </Link>
        {context.user ? (
          <>
            <p>
              Logged in as{" "}
              <Link to={`/user/${context.user.username}`}>
                {context.user.username}
              </Link>
            </p>
            <Link to="/account">Account</Link>
            <a href="/" onClick={() => clearStoredToken()}>
              Log out
            </a>
          </>
        ) : (
          <>
            <Link to="/login">Log in</Link>
            <Link to="/signup">Sign up</Link>
          </>
        )}
      </header>

      <main>
        <Outlet context={context} />
      </main>

      <footer>
        <small>&copy; endulum, for The Odin Project</small>
      </footer>
    </>
  );
}
