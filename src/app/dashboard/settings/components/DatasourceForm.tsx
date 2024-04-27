"use client";
import { useState, useEffect } from "react";
import { AppInput, AppButton, AppIcon } from "@/app/components/DS/Index";
import IconTools from "@/app/components/DS/IconTools";

export default function DatasourceForm({
  datasource = {},
  loading = false,
  onDone = null,
  onBack = null,
  title = "",
}: any) {
  const [form, setForm]: any = useState({
    ...(datasource || {}),
    config: { ...(datasource?.config?.database || {}) },
  });
  const [type, setType]: any = useState(null);

  const types = [
    {
      type: "mysql",
      name: "MySQL",
      fields: [
        {
          type: "text",
          name: "database",
          label: "Database",
        },
        {
          type: "text",
          name: "host",
          label: "Host",
        },
        {
          type: "text",
          name: "username",
          label: "Username",
        },
        {
          type: "password",
          name: "password",
          label: "Password",
        },
      ],
    },
    {
      type: "mariadb",
      name: "MariaDB",
      fields: [
        {
          type: "text",
          name: "database",
          label: "Database",
        },
        {
          type: "text",
          name: "host",
          label: "Host",
        },
        {
          type: "text",
          name: "username",
          label: "Username",
        },
        {
          type: "password",
          name: "password",
          label: "Password",
        },
      ],
    },
    {
      type: "sqlite",
      name: "SQLite",
      fields: [],
    },
    {
      type: "postgresql",
      name: "PostgreSQL",
      fields: [],
    },
    {
      type: "oracle",
      name: "Oracle",
      fields: [],
    },
  ];

  const handleSubmit = () => {
    onDone && onDone(form);
  };

  useEffect(() => {
    if (!datasource) return;
    let type = types.find((t) => t.type === datasource?.type);
    if (!type) return;
    setType(type);
    setForm({
      ...(datasource || {}),
      config: { ...(datasource?.config?.database || {}) },
    });
  }, [datasource]);

  return (
    <div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-5 items-center">
          {onBack && (
            <div
              className="rounded-full shrink-0 size-8 flex items-center justify-center bg-white hover:bg-stone-200"
              onClick={onBack}
            >
              <AppIcon className="size-6 fill-stone-600" icon="left" />
            </div>
          )}
          <h2 className="font-bold text-xl ">{title}</h2>
        </div>

        <div className="flex items-center gap-3 select-none">
          {types.map((type) => (
            <div
              key={type.type}
              onClick={() => {
                setForm({ ...form, type: type.type });
                setType(type);
              }}
              className={`border-2 flex flex-col gap-3 justify-center items-center px-3 py-2 rounded-xl ${
                form.type == type.type
                  ? "border-stone-600 "
                  : "border-stone-300"
              }`}
            >
              <IconTools
                icon={type.type}
                className={`${
                  form.type == type.type ? "fill-stone-800 " : "fill-stone-600"
                }  size-12`}
              />
              <div className="font-light text-sm">{type.name}</div>
            </div>
          ))}
        </div>

        <div className="lg:w-1/3 w-full flex flex-col gap-5">
          <AppInput
            type="text"
            value={form.name}
            label="Name"
            onChange={(val: string) => {
              setForm({ ...form, name: val });
            }}
          />

          {type?.fields && type.fields.length > 0 && (
            <div>
              <h2 className="font-bold text-lg mb-3">Connection data</h2>
              <div className="flex flex-col gap-3">
                {type.fields.map((field: any) => (
                  <div key={field.name}>
                    <AppInput
                      type={field.type}
                      value={form.config[field.name]}
                      label={field.label}
                      onChange={(val: string) => {
                        setForm({
                          ...form,
                          config: { ...form.config, [field.name]: val },
                        });
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <AppButton
            onClick={() => handleSubmit()}
            text="Save"
            icon="save"
            variant="primary"
            className="w-full"
            size="lg"
            loading={loading}
          />

          <div className="font-light text-stone-600 text-sm">
            Your credentials are saved encrypted
          </div>
        </div>
      </div>
    </div>
  );
}
