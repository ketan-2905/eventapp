import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' })
});

export const signupSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email' }),
  username: z.string().min(3, { message: 'Username must be at least 3 characters' }),
  password: z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
  confirmpassword: z.string(),
}).refine((data) => data.password === data.confirmpassword, {
  message: "Passwords do not match",
  path: ["confirmpassword"],
});






