import { useAuth } from "../auth/Auth";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useLocation, Outlet, Navigate } from "react-router-dom";
function RequireAuth() {
  let auth = useAuth();
  let location = useLocation();
  console.log(auth.user);
  const [updated, setUpdated] = useState();

  useEffect(() => {
    setUpdated(true);
  }, [auth.user]);
  if (updated) {
    if (!auth?.user && updated) {
      return <Navigate to="/login" state={{ from: location }} />;
    }
    return <Outlet />;
  }
}
export default RequireAuth;
