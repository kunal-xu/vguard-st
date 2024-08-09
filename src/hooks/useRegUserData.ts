import { createGlobalState } from "../state";
import { STUser } from "../utils/types";

export const useRegUserData = createGlobalState<STUser>(
  ["regUser"],
  new STUser()
);
