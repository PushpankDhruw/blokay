"use client";
import { useState } from "react";
import { AppButton, AppInput } from "../../components/DS/Index";
import { updateLead } from "../../services/lead";
import Car from "../../seguros-autos/components/Car.jsx";

const AppCTA = ({ color, variant = "car" }) => {
  const [form, setForm] = useState({
    stage: "CONTACT",
    personCellphone: "",
  });

  const getImage = () => {
    if (variant == "pets") {
      return "pets.gif";
    } else if (variant == "health") {
      return "ambulance.svg";
    } else {
      return "car2.svg";
    }
  };
  const getSize = () => {
    if (variant == "pets") {
      return "h-24 md:h-28 -bottom-3 md:-bottom-5 left-0 ";
    } else {
      return "h-12 md:h-14 bottom-0 left-0 ";
    }
  };

  const concatAction = () => {
    updateLead({
      leadToken: window.localStorage.getItem("leadToken") || null,
      location: window.location.href,
      form,
    }).then(() => {
      setForm({
        ...form,
        personCellphone: "",
      });
      alert("Enviado!");
    });
  };
  return (
    <div
      className="bg-black pt-20 pb-32 md:pb-32 border-0 border-sky-400 rounded-3xl mb-20 relative overflow-hidden md:bg-cover bg-no-repeat bg-bottom bg-[length:60rem_auto] 	"
      style={{
        backgroundImage:
          "url(https://assets-global.website-files.com/645a9acecda2e0594fac6126/658054b9bde4219f7c818b9b_gradient-noise-purple-azure-p-500.png)",
      }}
    >
      {/* <div className="absolute z-0 bottom-0 left-0 w-full h-1 bg-gray-300"></div> */}

      <div className="md:bg-sky-20/0 rounded-t-full px-10 md:px-20 bottom-0  md:pt-20 z-0 -right-20 absolute">
        <img src="/trees.svg" className="w-40" />
      </div>

      <div className=" rounded-t-full px-20 bottom-0 z-0 -left-20 absolute hidden md:flex items-center">
        <img src="/trees.svg" className="w-40" />
        <img src="/trees.svg" className="w-40" />
      </div>
      <Car image={getImage()} size={getSize()} />
      <div className="text-3xl md:text-6xl font-bold text-white text-center tracking-tight	">
        Es hora de <br />
        <span className="text-white">comprar tu seguro</span>
      </div>

      <div className="flex px-10 md:px-0 flex-col md:items-center mt-5 gap-3 mx-auto lg:w-96">
        <AppInput
          value={form.personCellphone}
          icon="phone"
          label="Celular"
          placeholder="Celular"
          type="number"
          className="w-full "
          onChange={(personCellphone) => {
            setForm({ ...form, personCellphone });
          }}
        />

        <AppButton
          text="Continuar"
          onClick={() => concatAction()}
          size="lg"
          icon="car"
          variant="primary"
          color={color}
          className="w-full"
        />
      </div>
    </div>
    // <div className="bg-gray-900 my-10 md:p-10 p-5 rounded-3xl faq-bg pb-20 md:pb-10 text-white">
    //   <h2 className="font-bold text-2xl md:text-4xl">¿Tienes dudas?</h2>
    //   <p className="md:text-lg text-base font-light text-gray-300">
    //     Déjanos tu celular y te llamamos sin ningún compromiso
    //   </p>

    //   <div className="flex md:flex-row flex-col md:items-center mt-5 gap-3">
    //     <div className="lg:w-56 w-3/4">
    //       <AppInput
    //         value={form.personCellphone}
    //         label="Celular"
    //         placeholder="Celular"
    //         type="cellphone"
    //         onChange={(personCellphone) => {
    //           setForm({ ...form, personCellphone });
    //         }}
    //       />
    //     </div>
    //     <div>
    //       <AppButton
    //         text="Continuar"
    //         onClick={() => concatAction()}
    //         size="lg"
    //         variant="primary"
    //         color={color}
    //         className="w-3/4 md:w-full"
    //       />
    //     </div>
    //   </div>
    // </div>
  );
};

export default AppCTA;
