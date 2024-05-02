import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { User } from "../utils/interfaces";
import { api, logoutUser, newTokens } from "../utils/apiservice";
import { storage } from "../..";

interface AuthContextProps {
  setIsUserAuthenticated: Dispatch<SetStateAction<boolean>>;
  isUserAuthenticated: boolean;
  login: (user: User) => Promise<void>;
  logout: () => Promise<void>;
  showPopup: boolean;
  setShowPopup: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isUserAuthenticated, setIsUserAuthenticated] =
    useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const login = async (user: User) => {
    storage.set("refreshToken", JSON.stringify(user.tokens.refreshToken));
    setIsUserAuthenticated(true);
  };

  const logout = async () => {
    try {
      await logoutUser();
      storage.clearAll();
      setIsUserAuthenticated(false);
    } catch (error) {
      console.error("Error while logging out:", error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const refreshToken: string = storage.getString(
          "refreshToken"
        ) as string;
        if (refreshToken) {
          const refreshTokenData = JSON.parse(refreshToken);
          const { accessToken, newRefreshToken } = await newTokens(
            refreshTokenData
          );
          storage.set("refreshToken", JSON.stringify(newRefreshToken));
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;
          setIsUserAuthenticated(true);
        } else {
          throw new Error("No data in storage");
        }
      } catch (error: any) {
        console.log(error.message);
      }
    })();
  }, []);

  // useEffect(() => {
  //   const interceptor = api.interceptors.response.use(
  //     response => response,
  //     async (error: any) => {
  //       try {
  //         if (error.response.status === 401 && isUserAuthenticated) {
  //           const refreshTokenData = JSON.parse(refreshToken);
  //           console.log("called interceptor");
  //           const { accessToken, newRefreshToken } = await newTokens(refreshTokenData);

  //           api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  //           return api.request(error.config);
  //         }
  //         if (error.response.status === 404) {

  //           const userData: VguardRishtaUser = JSON.parse(user);
  //           const response = await logOut(userData.userId);

  //           setIsUserAuthenticated(false);
  //         }
  //         return Promise.reject(error);
  //       } catch (error) {
  //         return Promise.reject(error);
  //       }
  //     }
  //   );

  //   return () => {
  //     api.interceptors.response.eject(interceptor);
  //   };
  // }, [isUserAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        isUserAuthenticated,
        setIsUserAuthenticated,
        login,
        logout,
        showPopup,
        setShowPopup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
