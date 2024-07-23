"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { loginUserAction } from "@/data/actions/auth-actions";
import Image from "next/image";
import { ZodErrors } from "@/components/fromErrors";
import { StrapiErrors } from "@/components/strapierror";
const INITIAL_STATE = {
  zodErrors: null,
  strapiErrors: null,
  data: null,
  message: null,
};
export default function SigninPage() {
  const [formState, formAction] = useFormState(loginUserAction, INITIAL_STATE);

    return (
      <>
        <div className="flex min-h-full bg-front rounded-2xl flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Image
              alt="Your Company"
              src="/logo.png"
              width={50}
              height={50}
              className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action={formAction} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ZodErrors error={formState?.zodErrors?.email} />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                   <ZodErrors error={formState.zodErrors?.password} />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-accenttwo px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
                <StrapiErrors error={formState?.strapiErrors} />
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a Registered?{' '}
              <a href="/sign-up" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Sign up Now!!
              </a>
            </p>
          </div>
        </div>
      </>
    )
  }
  