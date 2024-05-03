import { z } from "zod";

const AddressDetailSchema = z.object({
  currentAddressDoorNo: z
    .string()
    .min(1, { message: "Address House/Flat/Black No cannot be empty" }),
  currentAddressLine1: z
    .string()
    .min(1, { message: "Address Line 1 cannot be empty" }),
  currentAddressLine2: z
    .string()
    .min(1, { message: "Address Line 2 cannot be empty" }),
  currentAddressLine3: z.string().optional(),
  currentPincode: z
    .string()
    .min(1, {message: "Pincode cannot be empty"}),
  currentCity: z.string().min(1, { message: "City cannot be empty" }),
  currentState: z.string().min(1, { message: "State cannot be empty" }),
  currentDistrict: z.string().min(1, { message: "District cannot be empty" }),
});

const GenderEnum = z.enum(["Male", "Female", "Others"]);

export const RegistrationSchema = z.object({
  Gender: GenderEnum,
  TDSSlab: z.string().min(1, { message: "Verify TDS percentage" }),
  EmailId: z.union([z.literal(""), z.string().email()]),
  AddressDetail: AddressDetailSchema,
});
