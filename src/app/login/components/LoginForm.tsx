"use client";
import { useEffect, useState } from "react";
import { AppInput, AppButton, AppIcon } from "@/app/components/DS/Index";
import { fetchLogin } from "@/app/services/auth";

export default function LoginForm() {
  const [form, setForm]: any = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window != "undefined" && window.localStorage.getItem("token")) {
      window.location.href = "/dashboard";
    }
  }, []);

  const login = () => {
    setLoading(true);
    fetchLogin(form.username, form.password)
      .then((result) => {
        if (result.User) {
          setForm({});
          if (typeof window != "undefined") {
            window.localStorage.setItem("token", result.User.token);
            window.localStorage.setItem("user", JSON.stringify(result.User));
            window.localStorage.setItem("rol", result.User.rol);
            window.location.href = "/dashboard";
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="w-96 ">
      <a href="/">
        <img src="/logo.svg" className="h-10 mb-10 mx-auto" />
      </a>

      <form action={login} className="flex flex-col gap-5">
        <AppInput
          type="text"
          value={form.username}
          label="Username"
          onChange={(val: string) => {
            setForm({ ...form, username: val });
          }}
        />

        <AppInput
          type="password"
          value={form.password}
          label="Password"
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

      {process.env.GOOGLE_ID && (
        <div className="border-2 border-stone-300 rounded-lg flex gap-3 items-center text-stone-600 px-3 py-2 font-light hover:bg-stone-300 mt-5">
          <AppIcon icon="account" className="fill-stone-600 size-5" />
          <div>Login with Google</div>
        </div>
      )}

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
