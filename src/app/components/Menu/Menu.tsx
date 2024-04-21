"use client";
import { useState } from "react";
import { AppInput, AppIcon } from "@/app/components/DS/Index";
import Tree from "./Tree";

export default function Menu({
  view = null,
  onClickNeuron = null,
  editMode = null,
  neurons = [],
}: any) {
  const [search, setSearch] = useState("");

  return (
    <div className="">
      <div className="border bg-white font-light border-stone-300  rounded-lg text-sm shadow py-2  text-stone-800">
        <div>
          <a href="/dashboard">
            <img src="/logo.svg" className="px-2 py-5" />
          </a>
        </div>
        <div className="px-2">
          <AppInput
            type="text"
            value={search}
            label="Search action"
            onChange={(s: string) => {
              setSearch(s);
            }}
          />
        </div>
        <ul className="py-3 px-2 ">
          <li>
            <a
              className="items-center py-1 text-sm hover:bg-stone-100 rounded-lg px-1.5 flex justify-between"
              href="/dashboard"
            >
              <div>Inicio</div>
              <AppIcon icon="right" className="size-5 fill-stone-700" />
            </a>
          </li>

          <li>
            <a
              className="py-1 text-sm hover:bg-stone-100 rounded-lg px-1.5 flex justify-between items-center"
              href="/dashboard/users"
            >
              <div>Usuarios</div>
              <AppIcon icon="right" className="size-5 fill-stone-700" />
            </a>
          </li>

          <li>
            <a
              className="py-1 text-sm hover:bg-stone-100 rounded-lg px-1.5 flex justify-between items-center"
              href="/dashboard/billing"
            >
              <div>Facturación</div>
              <AppIcon icon="right" className="size-5 fill-stone-700" />
            </a>
          </li>
          <li>
            <a
              className="py-1 text-sm hover:bg-stone-100 rounded-lg px-1.5 flex justify-between items-center"
              href="/dashboard/settings"
            >
              <div>Configuraciones</div>
              <AppIcon icon="right" className="size-5 fill-stone-700" />
            </a>
          </li>
        </ul>

        {neurons?.length > 0 && (
          <Tree
            onClickNeuron={onClickNeuron}
            view={view}
            search={search}
            neurons={neurons}
            editMode={editMode}
          />
        )}
      </div>
    </div>
  );
}
