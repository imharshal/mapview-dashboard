import { createContext, useState, useEffect, useContext } from "react";
import useLocalStorage from "react-use-localstorage";
import jwtDecode from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useLocalStorage("accessToken", "");
  const [user, setUser] = useState(null);
  // const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    if (accessToken) {
      const decodedToken = jwtDecode(localStorage.getItem("accessToken"));
      setUser(decodedToken.user);
    } else {
      setUser(null);
    }
  }, [accessToken]);

  const setLoggedIn = (accessToken) => {
    // localStorage.setItem("accessToken", accessToken);
    setAccessToken(accessToken);
  };

  const setLoggedOut = () => {
    // localStorage.setItem("accessToken", "");
    setAccessToken("");
  };

  const isAuthenticated = () => {
    return !!user;
  };

  return (
    <AuthContext.Provider
      value={{ user, setLoggedIn, setLoggedOut, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuth };
