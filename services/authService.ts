"use server";

import bcrypt from "bcryptjs";
import { RegisterFormSchema } from "@/lib/rules";
import { redirect } from "next/navigation";

/**
 * Authentication Service
 * Handles user authentication related operations
 */

/**
 * Register a new user
 * @param formData - FormData object containing username, email, password, confirmPassword
 * @returns errors object or redirects on success
 */
export async function register(formData: FormData) {
  // Validate form fields
  const validatedFields = RegisterFormSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    phonenumber: formData.get("phonenumber"),
  });

  // If any form fields are invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      email: formData.get("email"),
    };
  }

  // Extract form fields
  const { email, password } = validatedFields.data;

  // TODO: Check if email is already registered

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // TODO: Save data to DB

  // Redirect to MainPage
  redirect("/");
}

/**
 * Login a user (placeholder)
 * @param values - login form values
 */
export async function login(formData: FormData) {
  // replace this with backend call...
}

// Verification Code Request Method
export async function verifyNumber(formData: FormData) {
  // replace this with backend call...
  return;
}

// Phone Number Verification Code Confirmation Method
export async function confirmCode(formData: FormData) {
  // replace this with backend call...
  return;
}

// Existed Member Check Method
export async function checkMemberState(values: any) {
  // replace this with backend call...
  return;
}