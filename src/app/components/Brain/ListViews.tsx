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
  const modalRef: any = useRef();
  const [views, setViews] = useState([]);
  const [form, setForm]: any = useState({ search: "" });
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
    const s: string = form.search.toLowerCase();
    return views.filter((view: any) => {
      return view.name.toLowerCase().includes(s);
    });
  };

  const onLimit = () => {
    return views.length >= 10;
  };

  return (
    <div className="">
      <div className=" flex items-center justify-between gap-5 mb-10">
        <div className="lg:w-full mr-auto">
          <AppInput
            type="view"
            value={form.search}
            onChange={(val: string) => {
              setForm({ ...form, search: val });
            }}
            icon="search"
            className="w-full"
            label="Buscar vista"
          />
        </div>
        {!onLimit() && !loading && (
          <AppButton
            icon="wizard"
            text="Agregar nueva"
            onClick={() => handleClickCreateNew()}
            variant="primary"
            size="md"
            className="shrink-0"
          />
        )}
      </div>
      <div className="">
        {loading && <AppLoader size="md" className="mx-auto" />}
        {!loading && (
          <div>
            {onLimit() && (
              <div className="bg-purple-300 text-purple-900 font-light px-3 py-5 rounded-xl mb-10 flex items-center justify-between gap-5">
                <div>You've reached the limit on your plan</div>
                <AppButton text="Upgrade" variant="primary" size="sm" />
              </div>
            )}

            <h2 className="text-stone-800 text-2xl mb-5 ">My views</h2>

            <div className="flex flex-wrap items-center gap-5">
              {viewsComputed().map((view: any) => (
                <a
                  href={"/dashboard/view/" + view.slug}
                  key={view.id}
                  className="bg-white shadow-sm border-2 border-transparent transition	 hover:border-stone-600 px-5 py-5 rounded-xl flex items-center gap-3 hover:bg-stone-50"
                >
                  {/* <AppIcon icon={view.icon} className="size-8" /> */}
                  <div className="font-light">{view.name}</div>
                </a>
              ))}
            </div>
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
          onChange={(val: string) => {
            setForm({ ...form, name: val });
          }}
          label={"Nombre"}
        />
      </AppModal>
    </div>
  );
}

export default ListViews;