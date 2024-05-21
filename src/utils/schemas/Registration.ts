import { z } from "zod";

const AddressDetailSchema = z.object({
  currentAddressDoorNo: z
    .string()
    .min(1, { message: "Address House/Flat/Block No cannot be empty" }),
  currentAddressLine1: z
    .string()
    .min(1, { message: "Address Line 1 cannot be empty" }),
  currentAddressLine2: z
    .string()
    .min(1, { message: "Address Line 2 cannot be empty" }),
  currentAddressLine3: z.string().optional(),
  currentPincode: z.string().min(1, { message: "Pincode cannot be empty" }),
  currentCity: z.string().min(1, { message: "City cannot be empty" }),
  currentState: z.string().min(1, { message: "State cannot be empty" }),
  currentDistrict: z.string().min(1, { message: "District cannot be empty" }),
});

export const RegistrationSchema = z.object({
  TDSSlab: z.union([
    z.string().min(1, { message: "TDS Slab: Verify TDS percentage" }),
    z.literal(null).transform(() => "")
  ])
  .refine((value) => value !== "", { message: "Verify TDS percentage" }),
  EmailId: z.union([z.literal(""), z.string().email()]),
  AlternateNumber: z.union([
    z.string()
    .refine(
      (value) => {
        const isValid = /^[6-9]\d{9}$/.test(value);
        return isValid;
      },
      { message: "Alternate Number: Invalid number format" }
    )
    .optional(), z.literal(''), z.literal(null).transform(() => "")]),
  AddressDetail: AddressDetailSchema,
});

export const RegistrationCustomerDetailsSchema = z.object({
  name: z.string().min(3, { message: "Customer Name cannot be empty" }),
  contactNo: z.string().refine(
    (value) => {
      const isValid = /^[6-9]\d{9}$/.test(value);
      return isValid;
    },
    { message: "Invalid number format" }
  ),
  pinCode: z.string().min(1, { message: "Pincode cannot be empty" }),
  email: z.union([z.literal(""), z.string().email()]),
});
