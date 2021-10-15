import { useState, createContext, useContext, useEffect } from "react";
import type { ReactNode, Dispatch, SetStateAction } from "react";
import { getAccessToken } from "../apiHelpers/getAccessToken";
import { logout } from "../apiHelpers/logout";

type AuthContextValue = {
  accessToken: string | null;
  setAccessToken: Dispatch<SetStateAction<string | null>>;
  logOutUser: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    getAccessToken()
      .then(({ accessToken }) => setAccessToken(accessToken))
      .catch((err) => console.log(err));
  }, []);

  const logOutUser = () => {
    setAccessToken(null);
    logout();
  };

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, logOutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth hook must be used within AuthProvider.");
  }
  return context;
};
