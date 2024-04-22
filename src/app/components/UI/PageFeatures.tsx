"use client";
import { useState } from "react";
import { AppButton, AppIcon } from "../DS/Index";
export default function PageFeatures({}) {
  const [view, setView] = useState("chat");
  return (
    <div
      className="border mx-3 border-stone-300 rounded-xl pt-10 mb-20 overflow-hidden"
      style={{
        backgroundImage:
          " linear-gradient(to bottom, #fcf3e6, rgb(215 236 248 / 62%))",
      }}
    >
      <div className="grid grid-cols-3 items-end text-stone-600">
        <div className="col-span-2">
          <div
            className="shadow-[0_10px_60px_0px_rgba(0,0,0,0.3)] pt-10 px-10 rounded-tr-2xl"
            style={{
              backgroundImage: " linear-gradient(45deg, #f4def6, #d7ecf8)",
            }}
          >
            <div className="shadow-2xl mx-auto lg:w-2/3 bg-white p-5 rounded-t-lg">
              <div className="flex gap-2 mb-5">
                <div className="size-3 bg-red-500 rounded-full" />
                <div className="size-3 bg-yellow-500 rounded-full" />
                <div className="size-3 bg-green-500 rounded-full" />
              </div>
              <div className="flex justify-center">
                <div className="border-2 text-sm border-stone-200 text-stone-600 mb-5 rounded-full font-light flex py-2 px-3 justify-center gap-3">
                  <div
                    onClick={() => setView("chat")}
                    className={`flex items-center gap-2 rounded-xl px-2 py-1 ${
                      view == "chat" ? "bg-stone-200" : "hover:bg-stone-100"
                    }   `}
                  >
                    <AppIcon icon="wizard" className="size-4 fille-stone-600" />
                    <div>Chat</div>
                  </div>
                  <div
                    onClick={() => setView("code")}
                    className={`flex items-center gap-2  rounded-xl px-2 py-1 ${
                      view == "code" ? "bg-stone-200" : "hover:bg-stone-100"
                    }`}
                  >
                    <AppIcon
                      icon="developer"
                      className="size-4 fille-stone-600"
                    />
                    <div>Code</div>
                  </div>
                </div>
              </div>

              {view == "chat" && (
                <div>
                  <div className=" overflow-y-auto  divide-y divide-stone-200 text-sm">
                    <div className="font-light py-3   flex items-center gap-3">
                      <div
                        className={`select-none size-8 flex items-center justify-center rounded-full shrink-0 bg-yellow-500 text-yellow-70`}
                      >
                        <div className="text-sm">JR</div>
                      </div>
                      <div>
                        ¿Puedes mostrar en una tabla los usuarios de mi empresa
                        con más venta?
                      </div>
                    </div>
                    <div className="font-light py-3  mb-3 flex items-center gap-3">
                      <div
                        className={`select-none size-8 flex items-center justify-center rounded-full shrink-0 bg-stone-100`}
                      >
                        <img src="/logo-sm.svg" className="size-5" />
                      </div>
                      <div>Ok</div>
                    </div>
                    <div className="font-light py-3   flex items-center gap-3">
                      <div
                        className={`select-none size-8 flex items-center justify-center rounded-full shrink-0 bg-yellow-500 text-yellow-70`}
                      >
                        <div className="text-sm">JR</div>
                      </div>
                      <div>
                        Puedes exponerlo en un endpoint con formato JSON
                      </div>
                    </div>
                    <div className="font-light py-3  mb-3 flex items-center gap-3">
                      <div
                        className={`select-none size-8 flex items-center justify-center rounded-full shrink-0 bg-stone-100`}
                      >
                        <img src="/logo-sm.svg" className="size-5" />
                      </div>
                      <div>Ok</div>
                    </div>
                  </div>

                  <div className="bg-stone-100 rounded-full py-2 flex justify-between gap-3 items-center px-3">
                    <div className="text-stone-700 font-light text-sm">
                      ¿Puedes crear un API?
                    </div>
                    <AppButton
                      onClick={() => setView("code")}
                      icon="wizard"
                      text="Generar"
                      variant="primary"
                      size="sm"
                    />
                  </div>
                </div>
              )}

              {view == "code" && (
                <div className="">
                  <img src="/website/code.png" alt="" />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="px-3 ml-4 divide-y divide-black/10">
          <div className="py-5 px-10">
            <div>Genera API para tus apps</div>
            <div className="font-light text-sm mt-3">
              Genera con inteligencia artificial tus endpoints y conectate con
              React, Svelte, Vue, JS, etc
            </div>
          </div>
          <div className="py-5 px-10">
            <div>Genera Dashboards</div>
            <div className="font-light text-sm mt-3">
              Construye herramientas prácticas sin escribir una sola linea de
              código
            </div>
          </div>
          <div className="py-5 px-10">
            <div>Controla los privilegios</div>
            <div className="font-light text-sm mt-3">
              Maneja granularmente los accesos a cada herramienta creada
            </div>
          </div>
          <div className="py-5 px-10">
            <div>Versiona tu aplicación</div>
            <div className="font-light text-sm mt-3">
              Cada herramienta construida se guarda como backup en GitHub
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
