"use client";
import { useState, useEffect, useRef } from "react";
import TyperPrompt from "@/app/components/TyperPrompt";
import { AppIcon } from "@/app/components/DS/Index";
import { rewriteFn } from "@/app/services/brain";

const NeuronChat = ({ neuron, reload }) => {
  const messagesEndRef = useRef();
  const [form, setForm] = useState({});
  const [historyChat, setHistoryChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRewriteFn = () => {
    setLoading(true);
    setForm({ prompt: "" });

    setHistoryChat((prevArray) => [
      ...prevArray,
      {
        message: form.prompt,
        type: "user",
      },
    ]);

    rewriteFn({
      ...form,
      neuronId: neuron.id,
    })
      .then(() => {
        setHistoryChat((prevArray) => [
          ...prevArray,
          {
            message: "Ok",
            type: "system",
          },
        ]);
        reload && reload();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const scrollToChatBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToChatBottom();
  }, [historyChat]);

  useEffect(() => {
    if (neuron?.history) setHistoryChat(neuron.history);
  }, [neuron]);

  return (
    <div>
      {historyChat.length > 0 && (
        <div className="h-96 overflow-y-auto">
          {historyChat.map((chat, k) => (
            <div
              key={"chat-" + k}
              className="font-light pb-3 border-b border-stone-200 mb-3 flex items-center gap-3"
            >
              <div
                className={`select-none size-8 flex items-center justify-center rounded-full shrink-0	 ${
                  chat.type == "system"
                    ? "bg-stone-100"
                    : "bg-yellow-500 text-yellow-700"
                }`}
              >
                {chat.type == "system" && (
                  <img src="/logo-sm.svg" className="size-5" />
                )}
                {chat.type != "system" && <div className="text-sm">JR</div>}
              </div>
              <div>{chat.message}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}

      {historyChat.length == 0 && neuron?.id && (
        <div className="font-light border-2 mx-10 mb-10 bg-stone-100 mt-10 border-stone-200 rounded-xl px-5 py-10 ">
          <div>
            Puedes solicitar directamente a nuestra inteligencia artificial que
            construya los bloques por ti, esta es capaz de hacer conexiones con
            bases de datos, editar valores, conectar APIS:
          </div>
          <ul className="font-bold pl-5 mt-5 flex flex-col gap-3">
            <li className="flex gap-1 items-center">
              <AppIcon icon="right" className="size-5 fill-stone-600" />
              <div>Crear reporte de usuarios inactivos</div>
            </li>
            <li className="flex gap-1 items-center">
              <AppIcon icon="right" className="size-5 fill-stone-600" />
              <div>Crear gráfica de ventas</div>
            </li>
            <li className="flex gap-1 items-center">
              <AppIcon icon="right" className="size-5 fill-stone-600" />
              <div>
                Conecta el API de la pokedex de internet y muestra los
                resultados en una tabla
              </div>
            </li>
          </ul>
        </div>
      )}
      <TyperPrompt
        loading={loading}
        onChange={(val) => {
          setForm({ ...form, prompt: val });
        }}
        value={form.prompt}
        onGenerate={() => {
          if (!form.prompt || loading) {
            return;
          }
          fetchRewriteFn();
        }}
      />
    </div>
  );
};
export default NeuronChat;
