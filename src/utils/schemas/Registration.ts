import { z } from "zod";

export const RegistrationSchema = z.object({
  Gender: z.string(),
  Email: z.string().email({ message: "Invalid email address" }),
  currentAddressDoorNo: z.string().max(10),
  currentAddressLine1: z.string(),
  currentAddressLine2: z.string(),
  currentAddressLine3: z.string(),
});
