"use client";
import AppData from "./Types/AppData";
import AppLine from "./Types/AppLine";

const NeuronResponse = ({ response, onReload, onBack, autoExecuted }) => {
  return (
    <>
      {response?.type == "table" && (
        <AppData
          data={response.content}
          onReload={() => {
            onReload();
          }}
          onBack={() => {
            onBack(null);
          }}
          autoExecuted={autoExecuted}
        />
      )}

      {response?.type == "line" && (
        <AppLine
          title={neuron.description}
          data={response.content}
          onReload={() => {
            onReload();
          }}
        />
      )}
    </>
  );
};
export default NeuronResponse;
