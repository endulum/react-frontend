import { useParams } from "react-router-dom";
import { useGet } from "../../hooks/useGet";
import { User } from "../../types";
import { LoadingSpacer } from "../LoadingSpacer";
import { useLogger } from "../../hooks/useLogger";

export function UserRoute() {
  const { user } = useParams();
  const { loading, error, data } = useGet<User>(`/user/${user}`);

  useLogger({ data });

  if (loading || error)
    return <LoadingSpacer loading={loading} error={error} />;
  return <p>user info</p>;
}
