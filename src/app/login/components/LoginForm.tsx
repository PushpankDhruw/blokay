"use client";
import { useState } from "react";
import { AppInput, AppButton, AppIcon } from "@/app/components/DS/Index";
// import { fetchLogin } from "@/app/services/auth";
import { useFormState, useFormStatus } from "react-dom";
import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginForm() {
  const { data: session } = useSession();

  const [form, setForm]: any = useState({});
  const [loading, setLoading] = useState(false);
  // const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const { pending } = useFormStatus();

  return (
    <div className="w-96 ">
      {JSON.stringify(session)}
      <a href="/">
        <img src="/logo.svg" className="h-10 mb-10 mx-auto" />
      </a>

      <form className="flex flex-col gap-5">
        {/* {errorMessage && (
          <>
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        )} */}

        <AppInput type="text" label="Username" name="username" />

        <AppInput type="password" name="password" label="Password" />

        <AppButton
          text="Sign in"
          icon="account"
          type="submit"
          variant="primary"
          className="w-full"
          size="lg"
          loading={loading}
          disabled={pending}
        />
      </form>

      <div></div>

      <div className="mt-5 flex flex-col gap-3">
        {(true || process.env.GOOGLE_ID) && (
          <div
            className="border-2 border-stone-300 rounded-lg flex gap-3 items-center text-stone-600 px-3 py-2 font-light hover:bg-stone-300 "
            onClick={() => {
              signIn("google");
            }}
          >
            <AppIcon icon="google" className="fill-stone-600 size-5" />
            <div>Login with Google</div>
          </div>
        )}

        {(true || process.env.GITHUB_ID) && (
          <div
            className="border-2 border-stone-300 rounded-lg flex gap-3 items-center text-stone-600 px-3 py-2 font-light hover:bg-stone-300 "
            onClick={() => {
              signIn("github");
            }}
          >
            <AppIcon icon="github" className="fill-stone-600 size-5" />
            <div>Login with GitHub</div>
          </div>
        )}
      </div>

      <div className="text-stone-600 mt-5 font-light text-sm text-center">
        ¿Any problem to login?
      </div>

      <div className=" mx-auto mt-10  ">
        <a
          href="/register"
          className="border-stone-300 dark:border-stone-950 border-2 text-stone-700 px-5 py-3 rounded-2xl shadow-2xl shadow-stone-400 dark:shadow-black dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-950 flex items-center gap-5"
        >
          <AppIcon icon="account" className="size-10 fill-stone-500" />
          <div>
            <span className="font-bold">¿Need a new workspace? </span>
            <div className="font-light text-sm">Sign up</div>
          </div>
        </a>
      </div>
    </div>
  );
}
