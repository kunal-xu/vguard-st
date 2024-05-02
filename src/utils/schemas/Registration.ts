import { z } from "zod";

const AddressDetailSchema = z.object({
  currentAddressDoorNo: z.string().min(1, {message: "Address House/Flat/Black No cannot be empty"}),
  currentAddressLine1: z.string().min(1, {message: "Address Line 1 cannot be empty"}),
  currentAddressLine2: z.string().min(1, {message: "Address Line 2 cannot be empty"}),
  currentAddressLine3: z.string(),
  currentPincode: z.number().positive().gte(6).lte(6, { message: "Invalid pincode format" }),
});


export const RegistrationSchema = z.object({
  Gender: z.string().min(1, {message: "Please select Gender"}),
  Email: z.string().email({ message: "Invalid email address" }),
  AddressDetail: AddressDetailSchema,
});
