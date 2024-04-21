"use client";
import React, { forwardRef, useState, useImperativeHandle } from "react";
import { createPortal } from "react-dom";
import { AppIcon } from "./Index.jsx";

let container = typeof document != "undefined" ? document.body : null;
function Modal(
  {
    title,
    position,
    titleLogo,
    classSection,
    size,
    clickBack,
    children,
    footer,
  },
  ref
) {
  const [showing, setShowing] = useState(false);
  const [bgColor, setBackgroundColor] = useState("#fff");
  const [error, setError] = useState(null);

  const showModal = () => {
    setShowing(true);
  };

  const hideModal = () => {
    console.log("hide");
    setShowing(false);
    setError(null);
  };

  const clear = () => {
    setError(null);
  };

  const putError = (error) => {
    setError(error);
  };

  const changeColorModal = (color) => {
    setBackgroundColor(color);
  };

  useImperativeHandle(ref, () => ({
    showModal,
    hideModal,
    clear,
    putError,
    changeColorModal,
  }));

  const positionClass = () => {
    if (position === "center") {
      return "justify-center items-center rounded-3xl";
    }
    return "";
  };

  const sizeClass = () => {
    if (size === "sm") {
      return "lg:w-96 w-full mx-3 ";
    } else if (size === "md") {
      return "lg:w-1/2 w-full mx-3 ";
    } else if (size === "lg") {
      return "lg:w-2/3 w-full mx-3 ";
    }
    return "";
  };

  return container
    ? createPortal(
        showing && (
          <div className="fixed z-50 w-full h-screen py-5  top-0 left-0 flex items-center justify-center">
            <div
              className="fixed z-50 backdrop-blur-sm bg-black bg-opacity-60 top-0 left-0 w-full h-screen"
              onClick={hideModal}
            ></div>

            <section
              className={`relative z-50 transition-all duration-100 ease-in-out text-black  rounded-3xl  overflow-auto ${sizeClass()} ${positionClass()} ${size} ${classSection}`}
              style={{ maxHeight: "90vh", backgroundColor: bgColor }}
            >
              {title && (
                <div className="flex justify-between items-center border-b border-gray-200 py-4 px-4">
                  <div className="flex items-center justify-start gap-3">
                    <div
                      className="action-icon"
                      onClick={clickBack}
                      style={{ display: clickBack ? "block" : "none" }}
                    >
                      <svg viewBox="0 0 24 24">
                        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
                      </svg>
                    </div>
                    <h2 className="text-base md:text-base">{title}</h2>
                    {titleLogo && (
                      <div>
                        <img
                          src="/web/logo.svg"
                          alt="Sigfre logo"
                          className="h-10"
                        />
                      </div>
                    )}
                  </div>
                  <div
                    className="hover:bg-gray-100 p-1 rounded-full cursor-pointer"
                    onClick={hideModal}
                  >
                    <AppIcon
                      className="w-6 h-6"
                      style={{ fill: "#000" }}
                      icon={position !== "bottom" ? "close" : "arrow_bottom"}
                    />
                  </div>
                </div>
              )}
              {error && (
                <div className=" w-full  p-3 bg-red-600 items-center text-indigo-100 leading-none flex lg:inline-flex font-light">
                  <span className="mr-2 text-left flex-auto text-white">
                    {error}
                  </span>
                </div>
              )}
              <div
                className={`py-5 px-4 overflow-y-auto ${
                  error ? "with-error" : ""
                }`}
              >
                {children}
              </div>

              {footer && (
                <div className="py-5 px-4 border-t border-gray-200">
                  <div className="footer">{footer}</div>
                </div>
              )}
            </section>
          </div>
        ),
        container
      )
    : null;
}

const AppModal = forwardRef(Modal);

export default AppModal;
