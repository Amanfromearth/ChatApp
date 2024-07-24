"use client"
import { ZodErrors } from "@/components/fromErrors";
import { StrapiErrors } from "@/components/strapierror";
import { registerUser } from "@/data/actions/auth-actions";
import Image from "next/image";
import { useFormState } from "react-dom"
import { toast } from "sonner"

const initialState = {
  zodErrors: null,
  strapiErrors: null,
  data: null,
  message: null,
};

export default function RegisterPage() {
  const [formState, formAction] = useFormState(registerUser, initialState)

  const handleSubmit = (event) => {
    event.preventDefault();
    toast("Event has been created.");
    setTimeout(() => {
      toast("The server might be paused because of free trial. Try after a 2 minutes.");
    }, 5000);
    event.target.submit();
  };

  return (
    <div className="flex min-h-full bg-front rounded-2xl flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          alt="logo"
          src="/images/logo.png"
          width={50}
          height={50}
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Register your account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action={formAction} onSubmit={handleSubmit}>
          <InputField id="username" label="Name" type="text" autoComplete="username" />
          <ZodErrors error={formState?.zodErrors?.name} />
          <InputField
            id="email"
            label="Email address"
            type="email"
            autoComplete="email"
          />
          <ZodErrors error={formState?.zodErrors?.email} />
          <InputField
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <ZodErrors error={formState?.zodErrors?.password} />
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-accenttwo px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign up
          </button>
          <StrapiErrors error={formState?.strapiErrors}/>
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
  );
}

function InputField({ id, label, type, autoComplete }) {
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
          className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
}
