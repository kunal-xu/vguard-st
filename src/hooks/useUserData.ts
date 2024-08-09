import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser } from "../utils/apiservice";
import { STUser } from "../utils/types";

export function useUserData(isUserAuthenticated: boolean = true) {
  const queryClient = useQueryClient();
  const { data, status, error, fetchStatus } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await getUser();
      return response.data as STUser;
    },
    enabled: isUserAuthenticated,
    initialData: () => {
      return queryClient.getQueryData<STUser>(["user"]);
    },
  });

  function refetchData() {
    queryClient.invalidateQueries({
      queryKey: ["user"],
    });
    queryClient.refetchQueries({
      queryKey: ["user"],
    });
  }

  function clearData() {
    queryClient.clear();
  }

  return { data, status, error, fetchStatus, refetchData, clearData };
}
