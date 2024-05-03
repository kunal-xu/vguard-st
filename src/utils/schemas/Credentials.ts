const { z } = require('zod');

export const PasswordMatchSchema = z.object({
  pwd: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  confirmPwd: z.string().min(8, { message: "Passwords do not match" }),
}).refine((data: { pwd: any; confirmPwd: any; }) => {
  return data.pwd === data.confirmPwd;
}, { message: "Passwords do not match" });