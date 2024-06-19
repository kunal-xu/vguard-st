import { z } from "zod";

export const BankDetailsSchema = z.object({
  bankAccNo: z.string(),
  bankIfsc: z.string(),
}).refine(data => {
  const bothPresent = data.bankAccNo !== "" && data.bankIfsc !== "";
  return bothPresent;
}, { message: "Please provide both account number and IFSC Code" });