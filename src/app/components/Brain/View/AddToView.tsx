"use client";
import { useRef, useState } from "react";
import { AppModal, AppButton, AppInput } from "@/app/components/DS/Index";
import { newNeuron } from "@/app/services/brain";

const AddToView = ({ refresh, save, onCreate = null }: any) => {
  const modalRef: any = useRef();
  const [form, setForm]: any = useState({});

  const handleClickNew = () => {
    modalRef.current.showModal();
  };
  const handleClickCreateNewNeuron = () => {
    newNeuron(form).then((neuron) => {
      modalRef.current.hideModal();
      onCreate && onCreate(neuron);
      setForm({});
    });
  };

  return (
    <>
      <AppButton
        className=""
        onClick={() => handleClickNew()}
        icon="add"
        variant="primary"
        size="sm"
        text="Agregar"
      />

      <AppModal
        size="sm"
        title="Agregar bloque"
        ref={modalRef}
        footer={
          <AppButton
            text="Agregar nuevo"
            onClick={() => handleClickCreateNewNeuron()}
            variant="primary"
            className="w-full"
            size="md"
          />
        }
      >
        <AppInput
          onChange={(val: string) => {
            setForm({ ...form, name: val });
          }}
          type="text"
          value={form.name}
          label="Nombre del bloque"
        />
      </AppModal>
    </>
  );
};
export default AddToView;
