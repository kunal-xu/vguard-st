/* import React, { createContext, useContext, useReducer, ReactNode } from "react";
import {
  AddressDetail,
  BankDetail,
  CouponRedeemResponse,
  PaytmDetail,
  ProductDetail,
  RegisterCustomerDetails,
  STUser,
  WelcomeBanner,
} from "../utils/types";

type Action = {
  type:
    | "UPDATE_FIELD"
    | "UPDATE_SUB_FIELD"
    | "CLEAR_ALL_FIELDS"
    | "GET_ALL_FIELDS";
  payload: {
    field?: keyof STUser;
    subfield?:
      | keyof (AddressDetail | BankDetail | PaytmDetail | WelcomeBanner)
      | string;
    value?: string | number | object | STUser | boolean;
  };
};

type CustomerAction = {
  type:
    | "UPDATE_FIELD"
    | "UPDATE_SUB_FIELD"
    | "CLEAR_ALL_FIELDS"
    | "GET_ALL_FIELDS";
  payload: {
    field?: keyof RegisterCustomerDetails;
    subfield?: keyof (CouponRedeemResponse | ProductDetail) | string;
    value?: string | number | object | RegisterCustomerDetails;
  };
};

export interface ContextProps {
  state: STUser;
  dispatch: React.Dispatch<Action>;
  customerState: RegisterCustomerDetails;
  customerDispatch: React.Dispatch<CustomerAction>;
}

const stUser = new STUser();
const rcd = new RegisterCustomerDetails();

const DataContext = createContext<ContextProps | undefined>({
  state: stUser,
  dispatch: () => {},
  customerState: rcd,
  customerDispatch: () => {},
});

const reducer = (state: STUser, action: Action): STUser => {
  switch (action.type) {
    case "UPDATE_FIELD":
      if (action.payload.field) {
        return {
          ...state,
          [action.payload.field]: action.payload.value,
        };
      } else {
        return state;
      }
    case "UPDATE_SUB_FIELD":
      if (action.payload.field && action.payload.subfield) {
        return {
          ...state,
          [action.payload.field]: {
            ...(state[action.payload.field] as object),
            [action.payload.subfield]: action.payload.value,
          },
        };
      } else {
        return state;
      }
    case "CLEAR_ALL_FIELDS":
      return new STUser();
    case "GET_ALL_FIELDS":
      return {
        ...state,
        ...(action.payload.value as STUser),
      };
    default:
      return state;
  }
};

const customerReducer = (
  state: RegisterCustomerDetails,
  action: CustomerAction
): RegisterCustomerDetails => {
  switch (action.type) {
    case "UPDATE_FIELD":
      if (action.payload.field) {
        return {
          ...state,
          [action.payload.field]: action.payload.value,
        };
      } else {
        return state;
      }
    case "UPDATE_SUB_FIELD":
      if (action.payload.field && action.payload.subfield) {
        return {
          ...state,
          [action.payload.field]: {
            ...(state[action.payload.field] as object),
            [action.payload.subfield]: action.payload.value,
          },
        };
      } else {
        return state;
      }
    case "CLEAR_ALL_FIELDS":
      return new RegisterCustomerDetails();
    case "GET_ALL_FIELDS":
      return {
        ...state,
        ...(action.payload.value as STUser),
      };
    default:
      return state;
  }
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, stUser);
  const [customerState, customerDispatch] = useReducer(customerReducer, rcd);

  return (
    <DataContext.Provider
      value={{ state, dispatch, customerState, customerDispatch }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const { state, dispatch, customerState, customerDispatch } = useContext(
    DataContext
  ) as ContextProps;
  if (!state || !dispatch || !customerState || !customerDispatch) {
    throw new Error("useData must be used within a DataProvider");
  }
  return { state, dispatch, customerState, customerDispatch };
};
 */