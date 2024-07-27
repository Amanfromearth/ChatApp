"use client";
import { ZodErrors } from "@/components/fromErrors";
import { StrapiErrors } from "@/components/strapierror";
import { registerUser } from "@/data/actions/auth-actions";
import Image from "next/image";
import { useFormState, useFormStatus } from "react-dom";

const initialState = {
  zodErrors: null,
  strapiErrors: null,
  data: null,
  message: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="flex w-full justify-center rounded-md bg-accenttwo px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      disabled={pending}
    >
      {pending ? "Signing up..." : "Sign up"}
    </button>
  );
}

export default function RegisterPage() {
  const [formState, formAction] = useFormState(registerUser, initialState);
  return (
    <main className="lg:grid lg:grid-cols-2 w-full h-full">
      <div className="flex min-h-full bg-white rounded-2xl rounded-r-none flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            alt="logo"
            src="/images/logo.png"
            width={50}
            height={50}
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register your account
          </h2>
        </div>
        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-3" action={formAction}>
            <InputField
              id="username"
              label="Name"
              type="text"
              autoComplete="username"
              error={formState?.zodErrors?.username}
            />
            <InputField
              id="email"
              label="Email address"
              type="email"
              autoComplete="email"
              error={formState?.zodErrors?.email}
            />
            <InputField
              id="password"
              label="Password"
              type="password"
              autoComplete="new-password"
              error={formState?.zodErrors?.password}
            />
            <SubmitButton />
            <StrapiErrors error={formState?.strapiErrors} />
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Already Registered?{" "}
            <a
              href="/sign-in"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign-in Now!!
            </a>
          </p>
        </div>
      </div>
      <div className="w-full rounded-2xl rounded-l-none relative overflow-hidden">
        <Image
          src="/images/Midjourney-Image-22.png"
          layout="fill"
          objectFit="cover"
          className="rounded-r-2xl"
          alt="landscape"
        />
      </div>
    </main>
  );
}

function InputField({ id, label, type, autoComplete, error }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          name={id}
          type={type}
          autoComplete={autoComplete}
          className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        {error && <ZodErrors error={error} />}
      </div>
    </div>
  );
}
