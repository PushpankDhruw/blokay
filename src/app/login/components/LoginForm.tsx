"use client";
import { useEffect, useState } from "react";
import { AppInput, AppButton, AppIcon } from "@/app/components/DS/Index";
import { fetchLogin } from "@/app/services/users";

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
      <div className="border-2 border-stone-300 rounded-lg flex gap-3 items-center text-stone-600 px-3 py-2 font-light hover:bg-stone-300 mt-5">
        <AppIcon icon="account" className="fill-stone-600 size-5" />
        <div>Login with Google</div>
      </div>

      <div className="text-stone-600 mt-5 font-light text-sm text-center">
        ¿Any problem to login?
      </div>
    </div>
  );
}
