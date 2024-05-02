"use client";
import { useState } from "react";
import { AppInput, AppButton, AppIcon } from "@/app/components/DS/Index";
// import { fetchLogin } from "@/app/services/auth";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginForm() {
  const { data: session } = useSession();
  const router = useRouter();

  const [form, setForm]: any = useState({});
  const [loading, setLoading] = useState(false);

  const login = () => {
    setLoading(true);
    signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    })
      .then((response: any) => {
        if (response.ok) {
          setLoading(false);
          router.replace("/dashboard");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loginThird = (third: string) => {
    setLoading(true);
    signIn(third)
      .then((response: any) => {
        setLoading(false);
        if (response.ok) {
          router.replace("/dashboard");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-96 ">
      {JSON.stringify(session)}
      <a href="/">
        <img src="/logo.svg" className="h-10 mb-10 mx-auto" />
      </a>

      <form action={login} className="flex flex-col gap-5">
        <AppInput
          type="text"
          label="Email"
          name="email"
          value={form.email}
          onChange={(val: string) => {
            setForm({ ...form, email: val });
          }}
        />

        <AppInput
          type="password"
          name="password"
          label="Password"
          value={form.password}
          onChange={(val: string) => {
            setForm({ ...form, password: val });
          }}
        />

        <AppButton
          text="Sign in"
          icon="account"
          type="submit"
          variant="primary"
          className="w-full"
          size="lg"
          loading={loading}
        />
      </form>

      <div></div>

      <div className="mt-5 flex flex-col gap-3">
        {(true || process.env.GOOGLE_ID) && (
          <div
            className="border-2 border-stone-300 rounded-lg flex gap-3 items-center text-stone-600 px-3 py-2 font-light hover:bg-stone-300 "
            onClick={() => {
              loginThird("google");
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
              loginThird("github");
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
