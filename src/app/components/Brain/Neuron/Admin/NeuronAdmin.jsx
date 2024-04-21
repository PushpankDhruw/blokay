"use client";
import { useState, useEffect } from "react";
import Editor from "@/app/components/Brain/Neuron/Admin/Editor/Index";
import NeuronChat from "./NeuronChat";
import NeuronGeneral from "./NeuronGeneral";
import { getNeuronAdmin } from "@/app/services/brain";

const NeuronAdmin = ({ neuron, changeColorModal, reload }) => {
  const [view, setView] = useState("chat");
  const [neuronAdmin, setNeuronAdmin] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchNeuron = () => {
    if (loading) return;
    setLoading(true);
    getNeuronAdmin(neuron.id)
      .then((n) => {
        setNeuronAdmin(n);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const setViewPage = (view) => {
    fetchNeuron();
    setView(view);
    changeColorModal(view == "code" ? "#21252b" : "#fff");
  };

  useEffect(() => {
    changeColorModal(view == "code" ? "#21252b" : "#fff");
    fetchNeuron();
  }, [neuron]);

  return (
    <div className="relative">
      <div className="flex justify-center">
        <div className={`tabs ${view == "code" ? "dark" : ""}`}>
          <div
            onClick={() => setViewPage("general")}
            className={`tab ${view == "general" ? "active" : ""}`}
          >
            <svg viewBox="0 0 24 24">
              <path d="M2.5 4v3h5v12h3V7h5V4zm19 5h-9v3h3v7h3v-7h3z"></path>
            </svg>
            <div>General</div>
          </div>

          <div
            onClick={() => setViewPage("chat")}
            className={`tab ${view == "chat" ? "active" : ""}`}
          >
            <svg className="fill-stone-600 size-6" viewBox="0 0 24 24">
              <path d="m19 9 1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25z"></path>
            </svg>
            <div>Chat</div>
          </div>

          <div
            onClick={() => setViewPage("code")}
            className={`tab ${view == "code" ? "active" : ""}`}
          >
            <svg className="fill-stone-600 size-6" viewBox="0 0 24 24">
              <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04-.39.08-.74.28-1.01.55-.18.18-.33.4-.43.64-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-8 11.17-1.41 1.42L6 12l3.59-3.59L11 9.83 8.83 12zm1-9.92c-.41 0-.75-.34-.75-.75s.34-.75.75-.75.75.34.75.75-.34.75-.75.75m2.41 11.34L13 14.17 15.17 12 13 9.83l1.41-1.42L18 12z"></path>
            </svg>
            <div>Ver código</div>
          </div>
        </div>
      </div>
      {view == "code" && (
        <Editor
          neuron={neuronAdmin}
          reload={() => {
            fetchNeuron();
          }}
        />
      )}
      {view == "general" && (
        <NeuronGeneral reload={reload} neuron={neuronAdmin} />
      )}
      {view == "chat" && <NeuronChat reload={reload} neuron={neuronAdmin} />}
    </div>
  );
};
export default NeuronAdmin;
