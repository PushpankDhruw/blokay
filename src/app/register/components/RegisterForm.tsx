"use client";
import { useEffect, useState } from "react";
import {
  AppInput,
  AppButton,
  AppIcon,
  AppSelect,
} from "@/app/components/DS/Index";
import { fetchRegister } from "@/app/services/auth";

export default function RegisterForm() {
  const [form, setForm]: any = useState({
    companySize: "1-5",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window != "undefined" && window.localStorage.getItem("token")) {
      window.location.href = "/dashboard";
    }
  }, []);

  const register = () => {
    setLoading(true);
    fetchRegister(form)
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

      <form action={register} className="flex flex-col gap-5">
        <AppInput
          type="text"
          value={form.companyName}
          label="Company Name"
          onChange={(val: string) => {
            setForm({ ...form, companyName: val });
          }}
        />

        <AppSelect
          value={form.companySize}
          label="Company Size"
          onChange={(val: string) => {
            setForm({ ...form, companySize: val });
          }}
        >
          <option value="me">Only me</option>
          <option value="1-5">1-5</option>
          <option value="6-20">6-20</option>
          <option value="21-100">6-10</option>
          <option value="101-1000">6-10</option>
          <option value="1001-infinite">1001-Infinite</option>
        </AppSelect>

        <AppInput
          type="text"
          value={form.name}
          label="Your name"
          onChange={(val: string) => {
            setForm({ ...form, name: val });
          }}
        />

        <AppInput
          type="text"
          value={form.email}
          label="Your email"
          onChange={(val: string) => {
            setForm({ ...form, email: val });
          }}
        />

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

        <div className="text-sm text-stone-500 font-light border-t border-stone-300 mt-3 pt-3">
          By using Blokay, you are agreeing to our privacy policy and terms of
          service.
        </div>

        <AppButton
          text="Sign up"
          icon="summaryclient"
          type="submit"
          variant="primary"
          className="w-full"
          size="lg"
          loading={loading}
        />
      </form>

      <div className=" mx-auto  mt-10  ">
        <a
          href="/login"
          className="border-stone-300 dark:border-stone-950 border-2 text-stone-700 px-5 py-3 rounded-2xl shadow-2xl shadow-stone-400 dark:shadow-black dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-950 flex items-center gap-5"
        >
          <AppIcon icon="account" className="size-10 fill-stone-500" />
          <div>
            <span className="font-bold">¿Existing workspace? </span>
            <div className="font-light text-sm">Sign in</div>
          </div>
        </a>
      </div>
    </div>
  );
}
