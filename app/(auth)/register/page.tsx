'use client';

import RegisterForm from '../../../components/ui/auth/forms/RegisterForm';

export default function RegisterPage() {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold theme-object-primary">
          One more step!
        </h1>
        <p className="theme-object-primary text-xl mb-2">
          Let’s know more about you.
        </p>
      </div>
      <div className="flex flex-col justify-center items-center flex-grow">
        <div className="w-full max-w-md space-y-6">
          <RegisterForm />
        </div>
      </div>
    </>
  );
}
