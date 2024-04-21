"use client";
import React from "react";
import { AppIcon } from "../Index.jsx";
import "./form.css";

export default function AppCheckbox({
  label,
  value,
  placeholder,
  ...extraProps
}) {
  return (
    <div className=" ">
      <label className="rounded-lg bg-gray-50 border-2 border-gray-100 px-2 items-center py-1 flex gap-2  select-none">
        <input
          type="checkbox"
          onChange={(e) => {
            extraProps.onChange && extraProps.onChange(!value);
          }}
          value={!!value}
          className="hidden"
        />
        <div
          className="size-6 rounded-lg border-2 border-gray-200"
          style={{ flexShrink: 0 }}
        >
          {value ? <AppIcon icon="check" /> : null}
        </div>
        <div className="text-sm font-light text-stone-600">
          {label || extraProps.children}
        </div>
      </label>
    </div>
  );
}
