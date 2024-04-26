import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { VguardRishtaUser } from '../utils/types/VguardRishtaUser';
import { STUser } from '../utils/types';

type FormAction = {
  type: 'UPDATE_FIELD';
  payload: { field: string; value: string | number | object };
};

type ProfileAction = {
  type: 'UPDATE_FIELD';
  payload: { value: STUser };
};

const vru = new VguardRishtaUser();

const stUser = new STUser();

export interface FormContextProps {
  formState: VguardRishtaUser;
  formDispatch: React.Dispatch<FormAction>;
}

export interface ProfileContextProps {
  profileState: STUser;
  profileDispatch: React.Dispatch<ProfileAction>;
}

const DataContext = createContext<FormContextProps | ProfileContextProps | undefined>({
  formState: vru,
  formDispatch: () => {},
  profileState: stUser,
  profileDispatch: () => {},
});

const formReducer = (state: VguardRishtaUser, action: FormAction): VguardRishtaUser => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };
    default:
      return state;
  }
};

const profileReducer = (state: STUser, action: ProfileAction): STUser => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        ...action.payload.value,
      };
    default:
      return state;
  }
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formState, formDispatch] = useReducer(formReducer, vru);
  const [profileState, profileDispatch] = useReducer(profileReducer, stUser);
  return (
    <DataContext.Provider value={{ formState, formDispatch, profileState, profileDispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
