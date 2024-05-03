import { z } from "zod";

export const BankDetailsSchema = z.object({
  bankAccNo: z.string().optional(),
  bankIfsc: z.string().optional(),
}).refine(data => {
  const bothPresent = data.bankAccNo !== "" && data.bankIfsc !== "";
  const bothAbsent = data.bankAccNo === "" && data.bankIfsc === "";
  return bothPresent || bothAbsent;
}, { message: "Please provide both account number and IFSC Code" });