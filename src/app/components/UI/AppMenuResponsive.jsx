"use client";
import { useRef } from "react";
import { AppIcon, AppModal, AppButton } from "../DS/Index";

function AppMenuResponsive({ variant }) {
  const modalRef = useRef();
  const handleClick = () => {
    modalRef.current.showModal();
  };

  return (
    <>
      <div
        className="bg-white rounded-xl border-b-4 border-gray-200 p-2 md:hidden "
        onClick={() => {
          handleClick();
        }}
      >
        <AppIcon icon="menu" className="size-6" />
      </div>

      <AppModal
        title="Menú"
        size="sm"
        position="center"
        ref={modalRef}
        footer={
          <AppButton
            text="Habla con un asesor"
            target="_blank"
            href={`https://api.whatsapp.com/send?phone=573238658077&text=${encodeURIComponent(
              "Hola, quiero mas información acerca el seguro de mi mascota"
            )}`}
            size="lg"
            icon="whatsapp"
            variant="primary"
            color={variant}
            className="w-full"
          />
        }
      >
        <ul className="menu-responsive">
          <li>
            <a href="/">Inicio</a>
          </li>
          <li>
            <a href="/seguros-mascotas">Comprar seguros mascotas</a>
          </li>
          <li>
            <a href="/seguros-salud">Comprar seguros salud</a>
          </li>
          <li>
            <a href="/seguros-autos">Comprar seguros de autos</a>
          </li>
          <li>
            <a href="/blog">Blog</a>
          </li>
        </ul>
      </AppModal>
    </>
  );
}

export default AppMenuResponsive;
