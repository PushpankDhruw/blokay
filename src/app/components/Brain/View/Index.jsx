"use client";
import { useState, useEffect, useRef } from "react";
import { AppModal } from "@/app/components/DS/Index";
import {
  viewGet,
  saveView as saveViewApi,
  brainList,
} from "@/app/services/brain";
import Header from "@/app/components/Header";
import AddToView from "./AddToView";
import Neuron from "../Neuron/Neuron";
import NeuronAdmin from "../Neuron/Admin/NeuronAdmin";
import GridLayout from "react-grid-layout";
import Menu from "@/app/components/Menu/Menu";
import "/node_modules/react-grid-layout/css/styles.css";

const ViewBrain = ({ slug }) => {
  const modalRef = useRef();
  const [view, setView] = useState(null);
  const [neurons, setNeurons] = useState([]);
  const [containerWidth, setContainerWidth] = useState(null);
  const [neuron, setNeuron] = useState(null);
  const [editMode, setEditMode] = useState("functions");
  const containerRef = useRef(null);

  const fetchListNeurons = () => {
    brainList().then((l) => {
      setNeurons(l.Neurons);
    });
  };

  const fetchView = () => {
    viewGet(slug).then((r) => {
      setView(r.View);
      if (r.View.layout?.length == 0) {
        setEditMode("grid");
      }
    });
  };
  useEffect(() => {
    fetchView();
    fetchListNeurons();
  }, []);

  const saveView = (form) => {
    setView({
      ...view,
      ...form,
    });
    saveViewApi({
      id: view.id,
      ...form,
    });
  };

  const refreshView = () => {
    fetchView();
  };

  useEffect(() => {
    setContainerWidth(
      containerRef.current ? containerRef.current.offsetWidth : 0
    );
  }, [containerRef.current]);

  const onDrop = (layout, layoutItem, _event) => {
    let i = _event.dataTransfer.getData("text/plain");

    saveView({
      layout: [
        ...view.layout,
        {
          ...layoutItem,
          i,
        },
      ],
    });
  };

  const clickNeuron = (neuron) => {
    setNeuron(neuron);
    modalRef.current.showModal();
  };

  const deleteFromLayout = (n) => {
    let index = view.layout.findIndex((k) => k.i == n.id);
    if (index !== -1) {
      let newLayout = view.layout.slice(0);
      newLayout.splice(index, 1);
      saveView({ layout: newLayout });
    }
  };

  const onCreateNeuron = (n) => {
    fetchListNeurons();
    setNeuron(n);
    modalRef.current.showModal();
  };

  return (
    <div className="container mx-auto pt-8">
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-3">
          <Menu
            view={view}
            onClickNeuron={clickNeuron}
            editMode={editMode}
            neurons={neurons}
          />
        </div>
        <div className="col-span-9 pb-10">
          <div className="relative container mx-auto ">
            <Header view={view} save={saveView} />

            <div className="flex items-center justify-between gap-3 mt-10">
              <AddToView
                view={view}
                save={saveView}
                refresh={refreshView}
                onCreate={onCreateNeuron}
              />

              {view?.layout?.length > 0 && (
                <div className="flex  justify-end ">
                  <div className="bg-stone-300 flex select-none gap-0.5 items-center text-stone-900 p-1 rounded-lg">
                    <div
                      className={`px-2 py-1 text-sm  rounded-md ${
                        editMode == "functions"
                          ? "bg-white"
                          : "hover:bg-stone-200"
                      }`}
                      onClick={() => setEditMode("functions")}
                    >
                      Functions
                    </div>
                    <div
                      className={`px-2 py-1 text-sm rounded-md ${
                        editMode == "grid" ? "bg-white" : "hover:bg-stone-200"
                      }`}
                      onClick={() => setEditMode("grid")}
                    >
                      Grid
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div
              className={`mt-10 ${editMode == "grid" ? "select-none" : ""}`}
              ref={containerRef}
            >
              {containerWidth && (
                <GridLayout
                  className="relative"
                  cols={12}
                  style={{ minHeight: 600 }}
                  rowHeight={15}
                  width={containerWidth}
                  droppingItem={{ i: "__dropping-elem__", h: 10, w: 6 }}
                  margin={[20, 30]}
                  containerPadding={[0, 0]}
                  onDrop={onDrop}
                  isDroppable={editMode === "grid"}
                  onLayoutChange={(layout) => {
                    if (layout.find((item) => isNaN(item.i))) {
                      return;
                    }
                    saveView({
                      layout: layout.map((l) => ({
                        i: l.i,
                        x: l.x,
                        y: l.y,
                        w: l.w,
                        h: l.h,
                      })),
                    });
                  }}
                >
                  {(view?.layout || []).map((neuron) => (
                    <div
                      key={neuron.i}
                      data-grid={{
                        x: neuron.x,
                        y: neuron.y,
                        w: neuron.w,
                        h: neuron.h,
                        static: editMode !== "grid",
                      }}
                    >
                      <Neuron
                        onEditNeuron={clickNeuron}
                        editMode={editMode}
                        neuronId={neuron.i}
                        defaultForm={{}}
                        deleteFromLayout={(neuron) => deleteFromLayout(neuron)}
                      />
                    </div>
                  ))}
                </GridLayout>
              )}
            </div>
          </div>
        </div>
      </div>

      <AppModal size="md" position="center" ref={modalRef}>
        {neuron && (
          <NeuronAdmin
            reload={() => {
              //TODO
            }}
            neuron={neuron}
            changeColorModal={(color) => {
              modalRef.current.changeColorModal(color);
            }}
          />
        )}
      </AppModal>
    </div>
  );
};
export default ViewBrain;