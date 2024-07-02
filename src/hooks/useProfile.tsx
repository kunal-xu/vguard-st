import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { useData } from "./useData";
import { useAuth } from "./useAuth";
import { getFile, getUser } from "../utils/apiservice";
import { STUser } from "../utils/types";

export default function useProfile() {
  const { dispatch, customerDispatch } = useData();
  const { logout } = useAuth();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const response = await getUser();
          const responseData: STUser = response.data;
          const profilePicture = await getFile(
            responseData.Selfie as string,
            "PROFILE"
          );
          dispatch({
            type: "GET_ALL_FIELDS",
            payload: {
              value: responseData,
            },
          });
          dispatch({
            type: "UPDATE_FIELD",
            payload: {
              field: "Selfie",
              value: profilePicture.data,
            },
          });
          customerDispatch({
            type: "CLEAR_ALL_FIELDS",
            payload: {},
          });
          if (responseData.hasPwdChanged || responseData.BlockStatus === 3) {
            dispatch({
              type: "CLEAR_ALL_FIELDS",
              payload: {},
            });
            logout();
          }
        } catch (error: any) {
          console.log(error.message);
        }
      })();
    }, [])
  );
}
