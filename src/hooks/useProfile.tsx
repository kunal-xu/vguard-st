import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { useData } from "./useData";
import { useAuth } from "./useAuth";
import { getUser } from "../utils/apiservice";

export default function useProfile() {
  const { state, dispatch, customerDispatch } = useData();
  const { logout } = useAuth();
  const awsUatUrl =
    "https://rishta-uat.s3.ap-south-1.amazonaws.com/stimg/appImages/Profile";
  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const response = await getUser();
          const responseData = response.data;
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
              subfield: undefined,
              value: `${awsUatUrl}/${responseData.Selfie}`,
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
  return {
    profile: state,
  };
}
