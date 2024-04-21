"use client";
import { useState } from "react";
import { AppInput, AppButton } from "@/app/components/DS/Index";
import { fetchLogin } from "@/app/services/users";

export default function LoginForm() {
  const [form, setForm]: any = useState({});
  const [loading, setLoading] = useState(false);

  const login = () => {
    setLoading(true);
    fetchLogin(form.username, form.password)
      .then((result) => {
        if (result.User) {
          setForm({});
          if (typeof window != "undefined") {
            window.localStorage.setItem("token", result.User.token);
            window.localStorage.setItem("user", JSON.stringify(result.User));
            window.location.href = "/dashboard";
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="w-96 mx-auto ">
      <h2 className="text-lg text-stone-700 font-bold mb-5">
        Agregar una nueva tarjeta
      </h2>
      <form action={login} className="flex flex-col gap-5">
        <AppInput
          type="text"
          value={form.creditCardNumber}
          label="Tarjeta de crédito"
          onChange={(val: string) => {
            setForm({ ...form, creditCardNumber: val });
          }}
        />

        <AppInput
          type="text"
          value={form.creditCardPlaceHolder}
          label="Nombre en la tarjeta de crédito"
          onChange={(val: string) => {
            setForm({ ...form, creditCardPlaceHolder: val });
          }}
        />

        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-4">
            <AppInput
              type="text"
              value={form.creditCardYear}
              label="Año"
              onChange={(val: string) => {
                setForm({ ...form, creditCardYear: val });
              }}
            />
          </div>
          <div className="col-span-4">
            <AppInput
              type="text"
              value={form.creditCardExpiryMonth}
              label="Mes"
              onChange={(val: string) => {
                setForm({ ...form, creditCardExpiryMonth: val });
              }}
            />
          </div>
          <div className="col-span-4">
            <AppInput
              type="text"
              value={form.creditCardCVV}
              label="CVV"
              onChange={(val: string) => {
                setForm({ ...form, creditCardCVV: val });
              }}
            />
          </div>
        </div>

        <AppButton
          text="Guardar tarjeta"
          icon="account"
          type="submit"
          variant="primary"
          className="w-full"
          size="lg"
          loading={loading}
        />
      </form>
    </div>
  );
}
