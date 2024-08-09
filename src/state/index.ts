import { QueryKey, useQuery, useQueryClient } from "@tanstack/react-query";

export function createGlobalState<T>(
  queryKey: QueryKey,
  initialData: T | null = null
) {
  return function () {
    const queryClient = useQueryClient();

    const { data } = useQuery({
      queryKey,
      queryFn: () => Promise.resolve(initialData),
      initialData,
      refetchInterval: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchIntervalInBackground: false,
    });

    function setData(data: Partial<T>) {
      queryClient.setQueryData(queryKey, (oldData?: T) => {
        return {
          ...oldData,
          ...data,
        };
      });
    }

    function setField(
      data: string | number,
      field: keyof T,
      subfield?: keyof T[keyof T]
    ) {
      console.log(data);
      if (subfield) {
        queryClient.setQueryData(queryKey, (oldData?: T) => {
          return {
            ...oldData,
            [field]: {
              ...(oldData?.[field] as T[keyof T]),
              [subfield]: data,
            },
          };
        });
        return;
      }
      queryClient.setQueryData(queryKey, (oldData?: T) => {
        return {
          ...oldData,
          [field]: data,
        };
      });
    }

    function resetData() {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
      queryClient.refetchQueries({
        queryKey: queryKey,
      });
    }

    return { data, setData, setField, resetData };
  };
}
