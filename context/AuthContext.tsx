import { useState, createContext, useContext, useEffect } from "react";
import type { ReactNode, Dispatch, SetStateAction } from "react";
import { getAccessToken } from "../apiHelpers/getAccessToken";
import { logout } from "../apiHelpers/logout";

type AuthContextValue = {
  accessToken: string | null;
  setAccessToken: Dispatch<SetStateAction<string | null>>;
  logOutUser: () => void;
  isLoading: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getToken = async () => {
      try {
        const { accessToken } = await getAccessToken();
        setAccessToken(accessToken);
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message);
        }
      }
      setIsLoading(false);
    };
    getToken();
  }, []);

  const logOutUser = async () => {
    try {
      await logout();
      setAccessToken(null);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, logOutUser, isLoading }}>
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
