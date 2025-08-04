'use client';

import LoginForm from '../../../components/ui/auth/forms/LoginForm';

export default function LoginPage() {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold theme-object-primary mt-10">
          Welcome!
        </h1>
        <p className="theme-object-primary text-xl mb-15">
        Login and get full access to everything you need and manage and schedule your appointments.
        </p>
      </div>
      <div className="flex flex-col justify-center items-center flex-grow">
        <div className="w-full max-w-md space-y-6">
          <LoginForm />
        </div>
      </div>
    </>
  );
}
