import { createGlobalState } from "../state";
import { RegisterCustomerDetails } from "../utils/types";

export const useCustomerData = createGlobalState<RegisterCustomerDetails>(
  ["customer"],
  new RegisterCustomerDetails()
);
