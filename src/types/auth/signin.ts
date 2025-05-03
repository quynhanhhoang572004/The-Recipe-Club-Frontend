import { passwordRegex } from "@/types/regex";
import { z } from "zod";

export interface SignInFormProps {
  account: string;
  password: string;
}

export const initialSignInForm: SignInFormProps = {
  account: "",
  password: "",
};

export const signInSchema = z.object({
  account: z.string().min(1, "Email or username is required"),
  password: z
    .string()
    .min(6, "Password is at least 6 characters")
    .regex(
      passwordRegex,
      "Password must contain at least 1 letter, 1 number, and allows special characters",
    ),
});
