import { passwordRegex } from "@/types/regex";
import { z } from "zod";

export interface SignUpProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  username: string;
  confirmPassword: string;
}

export const initialSignUpValues: SignUpProps = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  username: "",
  confirmPassword: "",
};

export const signUpSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Email is invalid"),
    username: z.string().min(1, "Username is required"),
    password: z
      .string()
      .min(1, "Password is required")
      .regex(
        passwordRegex,
        "Password must contain at least 1 letter, 1 number, and may include special characters",
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
