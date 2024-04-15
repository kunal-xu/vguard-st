import React, { createContext, useContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, VguardRishtaUser } from '../utils/interfaces';
import { api, logoutUser, newTokens, logOut } from '../utils/apiservice';
import { Constants } from '../utils/constants';

interface AuthContextProps {
  setIsUserAuthenticated: Dispatch<SetStateAction<boolean>>;
  isUserAuthenticated: boolean;
  login: (user: User) => Promise<void>;
  logout: () => Promise<void>;
  showPopup: boolean;
  setShowPopup: Dispatch<SetStateAction<boolean>>;
  setProfessionId: Dispatch<SetStateAction<string>>;
  professionId: string;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [professionId, setProfessionId] = useState<string>(Constants.ELECTRICAL_AND_PLUMBING_EXPERT_PID);

  const login = async (user: User) => {
    await AsyncStorage.setItem('USER', JSON.stringify(user.stUserDetail));
    await AsyncStorage.setItem('refreshToken', JSON.stringify(user.tokens.refreshToken));
    setIsUserAuthenticated(true);
  };

  const logout = async () => {
    try {
      const response = await logoutUser();
      await AsyncStorage.clear();
      setIsUserAuthenticated(false);
    } catch (error) {
      console.error('Error while logging out:', error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const user: string = await AsyncStorage.getItem('USER') as string;
        const refreshToken: string = await AsyncStorage.getItem('refreshToken') as string;
        const userData = JSON.parse(user);
        const refreshTokenData = JSON.parse(refreshToken);
        if (userData && refreshTokenData) {
          const { accessToken, newRefreshToken } = await newTokens(refreshTokenData);
          await AsyncStorage.setItem('refreshToken', JSON.stringify(newRefreshToken));
          api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          setIsUserAuthenticated(true);
        } else {
          throw new Error("No data in async storage");
        }
      } catch (error: any) {
        console.error(error.message);
      }
    })();
  }, []);

  // useEffect(() => {
  //   const interceptor = api.interceptors.response.use(
  //     response => response,
  //     async (error: any) => {
  //       try {
  //         if (error.response.status === 401 && isUserAuthenticated) {
  //           const refreshToken = await AsyncStorage.getItem('refreshToken') as string;
  //           const refreshTokenData = JSON.parse(refreshToken);
  //           console.log("called interceptor");
  //           const { accessToken, newRefreshToken } = await newTokens(refreshTokenData);
  //           await AsyncStorage.setItem('refreshToken', JSON.stringify(newRefreshToken));
  //           api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  //           return api.request(error.config);
  //         }
  //         if (error.response.status === 404) {
  //           const user: string = await AsyncStorage.getItem("USER") as string;
  //           const userData: VguardRishtaUser = JSON.parse(user);
  //           const response = await logOut(userData.userId);
  //           await AsyncStorage.clear();
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
    <AuthContext.Provider value={{professionId, setProfessionId, isUserAuthenticated, setIsUserAuthenticated, login, logout, showPopup, setShowPopup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
