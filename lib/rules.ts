import { z } from "zod";

// Define the schema
export const RegisterFormSchema = z
  .object({
    email: z
      .string()
      .email({ message: "Please enter a valid email." })
      .trim(),

    password: z
      .string()
      .min(1, { message: "Not be empty" })
      .min(5, { message: "Be at least 5 characters long" })
      .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
      .regex(/[0-9]/, { message: "Contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Contain at least one special character.",
      })
      .trim(),

    confirmPassword: z.string().trim(),

    phoneNumber: z
      .string()
      .trim()
      .min(10, { message: "Phone number must be at least 10 digits." })
      .max(15, { message: "Phone number must be at most 15 digits." })
      .regex(/^\+?[0-9]{10,15}$/, {
        message: "Please enter a valid phone number (digits only, optional +).",
      }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password fields do not match.",
        path: ["confirmPassword"],
      });
    }
  });

// Inferred TypeScript type
export type RegisterFormData = z.infer<typeof RegisterFormSchema>;
