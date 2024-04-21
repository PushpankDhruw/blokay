import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux"; // Asegúrate de importar el hook useSelector si estás utilizando Redux
import { postRequest } from "@/common/api.service"; // Asegúrate de importar tu servicio de API
import AppNeuron from "./Neuron"; // Asegúrate de importar el componente AppNeuron

function NeuronShow({ neuronId, form, showHeader, autoExecute }) {
  const user = useSelector((state) => state.user);
  const [neuron, setNeuron] = useState(null);
  const [loading, setLoading] = useState(false);
  const neuronRef = useRef();

  useEffect(() => {
    get();
  }, []);

  const onDone = (result) => {
    // Aquí puedes manejar el evento 'done' según sea necesario
  };

  const getBlock = () => {
    alert("hola");
  };

  const back = () => {
    // Aquí puedes manejar el evento 'back' según sea necesario
  };

  const get = () => {
    setLoading(true);
    let data = {
      neuronId: neuronId,
    };
    postRequest("brain/get", data, user, { sponsored: true })
      .then((result) => {
        let n = result.data.Neuron;
        setNeuron(n);
        if (
          (autoExecute === undefined || autoExecute) &&
          !n.filters?.fields?.length
        ) {
          // Lógica para ejecutar automáticamente si no hay campos de filtro
          // Implementa la lógica según sea necesario
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      {neuron && showHeader && (
        <div className="page-backoffice">
          <div className="gap-5 items-center flex mb-10">
            <div className="action-icon" onClick={back}>
              <icon icon="arrow_back" />
            </div>
            <div className="flex-1">
              <h2 className="backoffice-view-title mb-0">
                {neuron.description}
              </h2>
            </div>
          </div>
        </div>
      )}

      {loading && <app-loader className="mx-auto" />}

      <AppNeuron
        form={form}
        neuron={neuron}
        neuronId={neuronId}
        ref={neuronRef}
        getBlock={getBlock}
        autoExecute={autoExecute}
        onDone={onDone}
      />
    </div>
  );
}

export default NeuronShow;
