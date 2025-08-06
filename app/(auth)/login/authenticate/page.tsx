'use client';

import VerificationForm from "@/components/ui/auth/forms/VerificationForm";
import { useSearchParams } from "next/navigation";

export default function VerificationPage() {
  const searchParams = useSearchParams();
  const phoneNumber = searchParams.get("phonenumber");

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold theme-object-primary mt-20">
          Verify your phone number
        </h1>
        <p className="theme-object-primary text-xl">
          A verification code has been sent to {phoneNumber || "5XX XXX XX XX"}
        </p>
      </div>
      <div className="flex flex-col items-center flex-grow pt-20">
        <div className="w-full max-w-md space-y-6">
          <VerificationForm />
        </div>
      </div>
    </>
  );
}