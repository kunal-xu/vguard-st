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
import { getItemAsync, setItemAsync, deleteItemAsync } from "expo-secure-store";
import { useRouter } from "expo-router";
import { useData } from "./useData";

interface AuthContextProps {
  setIsUserAuthenticated: Dispatch<SetStateAction<boolean>>;
  isUserAuthenticated: boolean;
  login: (user: User) => Promise<void>;
  logout: () => Promise<void>;
  popUp: boolean;
  setPopUp: Dispatch<SetStateAction<boolean>>;
  popUpButtonCount: number;
  setPopUpButtonCount: Dispatch<SetStateAction<number>>;
  popUpTitle: string;
  setPopUpTitle: Dispatch<SetStateAction<string>>;
  popupText: string;
  setPopupText: Dispatch<SetStateAction<string>>;
  popUpIconType: string;
  setPopUpIconType: Dispatch<SetStateAction<string>>;
  popUpButton2Text: string;
  setPopupButton2Text: Dispatch<SetStateAction<string>>;
  cleanupPopUp: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isUserAuthenticated, setIsUserAuthenticated] =
    useState<boolean>(false);
  const [popUp, setPopUp] = useState(false);
  const [popUpButtonCount, setPopUpButtonCount] = useState(1);
  const [popUpTitle, setPopUpTitle] = useState("");
  const [popupText, setPopupText] = useState("");
  const [popUpIconType, setPopUpIconType] = useState("");
  const [popUpButton2Text, setPopupButton2Text] = useState("");
  const router = useRouter();
  function cleanupPopUp() {
    setPopUp(false);
    setPopUpButtonCount(1);
    setPopUpTitle("");
    setPopupText("");
    setPopUpIconType("");
    setPopupButton2Text("");
  }

  const { dispatch } = useData();

  async function login(user: User) {
    await setItemAsync(
      "refreshToken",
      JSON.stringify(user.tokens.refreshToken)
    );
    setIsUserAuthenticated(true);
    router.replace("/(tabs)/(home)/home-screen");
  }

  async function logout() {
    try {
      await logoutUser();
      await deleteItemAsync("refreshToken");
      dispatch({
        type: "CLEAR_ALL_FIELDS",
        payload: {},
      });
      setIsUserAuthenticated(false);
      router.replace("/(auth)/login-with-number");
    } catch (error) {
      console.error("Error while logging out:", error);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const refreshToken: string = (await getItemAsync(
          "refreshToken"
        )) as string;
        if (refreshToken) {
          const refreshTokenData = JSON.parse(refreshToken);
          const { accessToken, newRefreshToken } = await newTokens(
            refreshTokenData
          );
          await setItemAsync("refreshToken", JSON.stringify(newRefreshToken));
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;
          setIsUserAuthenticated(true);
          router.replace("/(tabs)/(home)/home-screen");
        } else {
          throw new Error("No data in storage");
        }
      } catch (error: any) {
        console.log(error.message);
        router.replace("/(auth)/login-with-number");
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
        popUp,
        setPopUp,
        popUpButtonCount,
        setPopUpButtonCount,
        popUpTitle,
        setPopUpTitle,
        popupText,
        setPopupText,
        popUpIconType,
        setPopUpIconType,
        popUpButton2Text,
        setPopupButton2Text,
        cleanupPopUp,
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
