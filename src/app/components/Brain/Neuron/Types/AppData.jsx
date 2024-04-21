import React, { useState, useEffect, useRef } from "react";
import {
  AppSelect,
  AppInput,
  AppButton,
  AppIcon,
  AppModal,
} from "@/app/components/DS/Index";
import { money } from "@/app/helpers/functions";
import Neuron from "../Neuron";
// import { useSelector } from "react-redux";

function AppData({ data, onReload, onBack, neuronName = "", autoExecuted }) {
  const modalRef = useRef();
  const [sort, setSort] = useState(null);
  const [filters, setFilters] = useState({ search: "" });
  const [table, setVarTable] = useState({ data: [], header: [] });
  const [originalTable, setOriginalTable] = useState({});
  const [page, setPage] = useState(null);
  const [PER_PAGE, setPerPage] = useState(10);
  const [subneuron, setSubneuron] = useState({ neuronId: null, form: {} });

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    init();
  }, [data]);

  const setTable = (data) => {
    setPage(1);
    if (data) {
      setVarTable(data);
      setOriginalTable(JSON.parse(JSON.stringify(table)));
    } else {
      setVarTable({});
      setOriginalTable({});
    }
  };

  const init = () => {
    setTable(data);
  };

  const functions = {
    openNeuron: ({ neuronKey, form }) => {
      setSubneuron({ neuronKey, form });
      modalRef.current.showModal();
    },
  };

  // const generateExcel = () => {
  //   // Lógica para generar un archivo Excel
  //   // Implementa según sea necesario
  // };

  const download = (file, filename) => {
    let blob = new Blob([file], { type: "text/csv;charset=utf-8;" });
    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, filename);
    } else {
      var link = document.createElement("a");
      if (link.download !== undefined) {
        // feature detection
        // Browsers that support HTML5 download attribute
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  const FileExportContent = () => {
    let data = table.data.map((row) => {
      return row.map((col) => {
        if (typeof col == "object") {
          return col.text;
        }
        return col;
      });
    });
    return [originalTable.header, ...data];
  };

  const generateCSV = () => {
    const rows = FileExportContent();
    let csvContent = "";
    rows.forEach(function (rowArray) {
      let row = rowArray.join(",");
      csvContent += row + "\r\n";
    });
    download(csvContent, "Descarga.csv");
  };

  const tableContent = () => {
    let content = table?.data.slice(0);
    if (!content?.length) return [];
    if (sort) {
      let criteria = Object.keys(sort)[0];
      let valCriteria = sort[criteria];
      let sortTypes = (a, b) => {
        if (typeof a == "string" && typeof b == "string") {
          a = a.toLowerCase();
          b = b.toLowerCase();
          if (a > b) {
            return -1;
          } else if (b > a) {
            return 1;
          }
          return 0;
        }
        return a - b;
      };
      content = content.sort((a, b) => {
        let val1 =
          typeof a[criteria] == "object" ? a[criteria]?.text : a[criteria];
        let val2 =
          typeof b[criteria] == "object" ? b[criteria]?.text : b[criteria];
        if (valCriteria == "DESC") {
          return sortTypes(val2, val1);
        }
        return sortTypes(val1, val2);
      });
    }
    let arr = [];
    let from = (page - 1) * PER_PAGE;
    let until = from + PER_PAGE;
    for (let i = from; i < until; i++) {
      if (i < content.length) {
        arr.push(content[i]);
      }
    }
    return arr;
  };

  const pagesCount = () => {
    let pages = 0;
    if (table.data.length > PER_PAGE) {
      pages = table.data.length / PER_PAGE;
    }
    pages = Math.floor(pages);
    return pages + 1;
  };

  const footerRow = () => {
    if (!table?.data?.length) return { sum: [] };
    let actived = false;
    const sumArray = Array(table.header.length).fill();
    for (let row of table.data) {
      for (let index in row) {
        let val = row[index];
        if (typeof val != "object") {
          continue;
        }
        actived = true;
        if (val.fn == "SUM") {
          if (!sumArray[index])
            sumArray[index] = { val: 0, fn: val.fn, type: val.type };
          sumArray[index].val += +val.text;
        } else if (val.fn == "COUNT") {
          if (!sumArray[index])
            sumArray[index] = { val: 0, fn: val.fn, type: val.type };
          sumArray[index].val += 1;
        }
      }
    }

    if (!actived) return [];

    return sumArray.map((item, index) => {
      if (!item) return null;
      let val = item.val;
      if (item.type == "money") {
        val = money(val);
      }
      item.val = val;
      return item;
    });
  };

  const search = (toSearch = "") => {
    toSearch = toSearch.toLowerCase();
    let arr = [];
    let content = data.data;
    if (!content?.length) return;
    for (var i = 0; i < content.length; i++) {
      for (var j = 0; j < content[i].length; j++) {
        var str = ("" + content[i][j]).toLowerCase();
        if (str.includes(toSearch)) {
          j = content[i].length;
          arr.push(content[i]);
        }
      }
    }

    setVarTable({ ...table, data: arr });
  };

  const footerRowVals = footerRow();
  const tableContentVals = tableContent();

  return (
    <div className="">
      <div className="">
        <div className="mb-5">
          <div>
            <div className="justify-end flex items-center gap-3">
              {onBack && !autoExecuted && (
                <div
                  className="flex gap-3 items-center mr-auto"
                  onClick={() => onBack()}
                >
                  <div
                    className="size-8 p-1 cursor-pointer border-2 border-stone-100 hover:border-stone-300 rounded-full bg-white"
                    onClick={() => {
                      setPage(page - 1);
                    }}
                  >
                    <AppIcon
                      icon="left"
                      className="fill-stone-800 w-full h-full"
                    />
                  </div>
                  <div>{neuronName}</div>
                </div>
              )}
              {data?.data?.length > 10 && (
                <div className="ml-auto lg:w-1/3">
                  <AppInput
                    type="text"
                    value={filters.search}
                    onChange={(val) => {
                      setFilters({ ...filters, search: val });
                      search(val);
                    }}
                    label="Buscar"
                    placeholder="Buscar"
                    mb="0"
                    icon="search"
                    className="input-search-main "
                  />
                </div>
              )}

              {table.data.length > 0 && (
                <AppButton
                  variant="primary"
                  type="button"
                  color="blue"
                  size="lg"
                  text="CSV"
                  onClick={() => generateCSV()}
                />
              )}
            </div>
          </div>
        </div>

        <div className="boxx">
          <div className="box-table">
            <div className="">
              <div className=" w-full">
                <div className="">
                  <div className="table overflow-x-scroll w-full">
                    {(table.header?.length > 0 || table.data?.length > 0) && (
                      <table className="w-full mb-2">
                        {table.header && (
                          <thead>
                            <tr>
                              {table.header.map((th, index) => (
                                <th
                                  key={index}
                                  className="th-sortable"
                                  onClick={() =>
                                    setSort({
                                      [index]:
                                        sort?.[index] == "DESC"
                                          ? "ASC"
                                          : "DESC",
                                    })
                                  }
                                >
                                  <div className="flex items-center gap-2">
                                    <span>{th}</span>
                                    {sort && sort[index] && (
                                      <AppIcon
                                        icon={
                                          sort?.[index] == "ASC"
                                            ? "arrow_top"
                                            : "arrow_bottom"
                                        }
                                        className="h-4 w-4"
                                      />
                                    )}
                                  </div>
                                </th>
                              ))}
                            </tr>
                          </thead>
                        )}

                        {tableContentVals && (
                          <tbody>
                            {tableContentVals.map((row, index) => (
                              <tr key={index}>
                                {row.map((td, k) => (
                                  <td key={k} className="text-sm">
                                    {typeof td == "object" && (
                                      <>
                                        {td == null && <strong>NULL</strong>}
                                        {(td?.type == "money" ||
                                          td?.type == "number") && (
                                          <span>{money(td.text)}</span>
                                        )}
                                        {td?.type == "text" && (
                                          <span>{td.text}</span>
                                        )}

                                        {td?.html && (
                                          <div
                                            onClick={() => {
                                              td.click &&
                                                functions[td.click](td.args);
                                            }}
                                            dangerouslySetInnerHTML={{
                                              __html: td.html,
                                            }}
                                          />
                                        )}
                                      </>
                                    )}

                                    {typeof td != "object" && <>{td}</>}
                                  </td>
                                ))}
                              </tr>
                            ))}

                            {footerRowVals?.length > 0 && (
                              <tr>
                                {footerRowVals.map((item, index) => (
                                  <td key={index}>
                                    <span className="text-sm font-bold">
                                      <span>{item?.val}</span>
                                    </span>
                                  </td>
                                ))}
                              </tr>
                            )}
                          </tbody>
                        )}
                      </table>
                    )}

                    {!table.header?.length && !table.data?.length && (
                      <div className="bg-gray-100 text-center py-10 text-2xl text-gray-700 rounded-2xl">
                        Sin resultados para mostrar
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {table?.data?.length > 10 && (
                <div className="mt-5 flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <AppSelect
                      label="Por página"
                      value={PER_PAGE}
                      onChange={(val) => {
                        setPerPage(val);
                      }}
                      type="select"
                      mb="0"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </AppSelect>
                  </div>
                  <div className="flex ml-auto gap-2 items-center">
                    {page > 1 && (
                      <div
                        className="size-8 p-1 cursor-pointer hover:bg-slate-300 rounded-full bg-stone-50"
                        onClick={() => {
                          setPage(page - 1);
                        }}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="fill-stone-900 w-full h-full"
                        >
                          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
                        </svg>
                      </div>
                    )}

                    <span>
                      {" "}
                      Página: {page} - {pagesCount()}{" "}
                    </span>

                    {page < pagesCount() && (
                      <div
                        className="size-8 p-1 cursor-pointer hover:bg-slate-300 rounded-full bg-stone-50"
                        onClick={() => {
                          setPage(page + 1);
                        }}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="fill-slate-900 w-full h-full"
                        >
                          <path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <AppModal size="lg" position="center" ref={modalRef}>
        {subneuron.neuronKey && (
          <Neuron
            neuronKey={subneuron.neuronKey}
            defaultForm={subneuron.form}
            onExec={(result) => {
              if (
                !result.type ||
                result.type == "error" ||
                result.type == "message"
              ) {
                modalRef.current.hideModal();
                onReload && onReload();
              }
            }}
          />
        )}
      </AppModal>
    </div>
  );
}

export default AppData;
