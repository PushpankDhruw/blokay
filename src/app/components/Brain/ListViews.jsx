"use client";
import React, { useState, useEffect, useRef } from "react";
import { viewList, addView } from "@/app/services/brain";
import {
  AppButton,
  AppModal,
  AppInput,
  AppLoader,
} from "@/app/components/DS/Index";

function ListViews({}) {
  const modalRef = useRef();
  const [views, setViews] = useState([]);
  const [form, setForm] = useState({ search: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    listViews();
  }, []);

  const listViews = () => {
    setLoading(true);
    viewList()
      .then((result) => {
        setViews(result.Views);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleClickCreateNew = () => {
    modalRef.current.showModal();
  };

  const handleSaveView = () => {
    addView(form).then((result) => {
      modalRef.current.hideModal();
      listViews();
      setForm({ search: "" });
    });
  };

  const viewsComputed = () => {
    const s = form.search.toLowerCase();
    return views.filter((view) => {
      return view.name.toLowerCase().includes(s);
    });
  };

  return (
    <div className="">
      <div className=" flex items-center justify-between gap-5 mb-20">
        <h2 className="text-stone-800 text-2xl ">My views</h2>
        <div className="lg:w-1/3 mr-auto">
          <AppInput
            type="view"
            value={form.search}
            onChange={(val) => {
              setForm({ ...form, search: val });
            }}
            label="Buscar vista"
          />
        </div>
        <AppButton
          text="Agregar nueva"
          onClick={() => handleClickCreateNew()}
          variant="primary"
          size="md"
        />
      </div>
      <div className="">
        {loading && <AppLoader size="md" className="mx-auto" />}
        {!loading > 0 && (
          <div className="flex flex-wrap items-center gap-5">
            {viewsComputed().map((view) => (
              <a
                href={"/dashboard/view/" + view.slug}
                key={view.id}
                className="bg-white border-2 border-transparent transition	 hover:border-stone-600 px-5 py-5 rounded-xl flex items-center gap-3 hover:bg-stone-50"
              >
                {/* <AppIcon icon={view.icon} className="size-8" /> */}
                <div className="font-light">{view.name}</div>
              </a>
            ))}
          </div>
        )}
      </div>

      <AppModal
        title="Agregar vista"
        footer={
          <AppButton
            text="Agregar nueva"
            onClick={() => handleSaveView()}
            variant="primary"
            className="w-full"
            size="md"
          />
        }
        size="sm"
        ref={modalRef}
      >
        <AppInput
          type="text"
          value={form.name}
          onChange={(val) => {
            setForm({ ...form, name: val });
          }}
          label={"Nombre"}
        />
      </AppModal>
    </div>
  );
}

export default ListViews;
