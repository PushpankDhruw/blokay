"use client";
import { useState, useEffect } from "react";
import { AppIcon } from "@/app/components/DS/Index";
import {
  Tree,
  getBackendOptions,
  MultiBackend,
} from "@minoru/react-dnd-treeview";
import { DndProvider } from "react-dnd";

const createTreeList = (neurons) => {
  let arr = neurons.slice(0).map((n) => {
    return {
      id: n.id,
      parent: n.parentId || "default",
      droppable: true,
      text: n.key,
      data: n,
    };
  });

  return [
    {
      id: "default",
      parent: null,
      droppable: false,
      text: "Blocks",
      data: {},
    },
    ...arr,
  ];
};

const TreeMenu = ({ onClickNeuron, view, search, neurons, editMode }) => {
  const [treeData, setTreeData] = useState(createTreeList(neurons));

  useEffect(() => {
    setTreeData(createTreeList(neurons));
  }, [neurons]);

  const handleDrop = (newTreeData) => {
    setTreeData(newTreeData);
  };

  //   const neuronsSearch = () => {
  //     let s = search.toLowerCase();
  //     return neurons.filter((n) => {
  //       return n.description.toLowerCase().includes(s);
  //     });
  //   };

  const inLayout = (n) => {
    if (!view?.layout?.length) return false;
    return view.layout.find((l) => l.i == n.id);
  };

  return (
    <div>
      {onClickNeuron && (
        <>
          <div className="pt-3 border-t border-stone-200 pb-3 px-2">
            <DndProvider backend={MultiBackend} options={getBackendOptions()}>
              <Tree
                classes={{
                  dropTarget: "preview-drag",
                }}
                tree={treeData}
                enableAnimateExpand={true}
                rootId={null}
                onDrop={handleDrop}
                render={(node, { depth, isOpen, onToggle, hasChild }) => (
                  <div className="node" style={{ marginLeft: depth * 15 }}>
                    <div
                      className="droppable-element"
                      draggable={editMode === "grid" && !!node.data?.key}
                      unselectable="on"
                      onClick={() => {
                        if (node.data?.key) {
                          onClickNeuron(node);
                        }
                      }}
                      width={6}
                      onDragStart={(e) => {
                        // console.log(node.id);
                        if (node.data?.key) {
                          e.dataTransfer.setData("text/plain", node?.id);
                        }
                      }}
                    >
                      <div className="py-1 text-sm  hover:bg-stone-100 rounded-lg px-1.5 flex justify-between items-center">
                        <div
                          className={` ${
                            inLayout(node.data)
                              ? " text-indigo-600"
                              : "font-light"
                          }`}
                        >
                          <div className="flex items-center gap-1">
                            {hasChild && (
                              <div
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  onToggle();
                                }}
                              >
                                <AppIcon
                                  icon="right"
                                  className={`fill-stone-600 size-4 ${
                                    isOpen ? "rotate-90" : ""
                                  }`}
                                />
                              </div>
                            )}
                            <span> {node.text || node?.data?.description}</span>
                          </div>
                        </div>

                        {node.data?.key && (
                          <AppIcon
                            icon="component"
                            className={`size-4 ${
                              inLayout(node.data)
                                ? "fill-indigo-900"
                                : "fill-indigo-600"
                            }`}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}
              />
            </DndProvider>
          </div>
        </>
      )}
    </div>
  );
};

export default TreeMenu;
