"use client";
import AppData from "./Types/AppData";
import AppLine from "./Types/AppLine";

const NeuronResponse = ({
  neuron,
  response,
  onReload,
  onBack,
  autoExecuted,
}) => {
  return (
    <>
      <div className="  h-full overflow-y-auto p-5 ">
        {response?.type == "table" && (
          <AppData
            neuronName={neuron?.name}
            data={response.content}
            onReload={onReload}
            onBack={onBack}
            autoExecuted={autoExecuted}
          />
        )}

        {response?.type == "line" && (
          <AppLine
            title={neuron.description}
            data={response.content}
            onReload={onReload}
          />
        )}
      </div>
    </>
  );
};
export default NeuronResponse;
