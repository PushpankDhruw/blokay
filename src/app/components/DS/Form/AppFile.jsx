"use client";
import React, { useState, useEffect } from "react";
import { AppIcon, AppLoader } from "../Index.jsx";
// import { postMultimedia } from "services/_base.js";

const AppFile = ({
  label,
  preview,
  classSelector,
  endpoint = "marketplace/uploadAsset",
  accept = ".pdf,.jpg,.jpeg,.png,.webp",
  size = "md",
  onError,
  onDone,
  onChangeFiles,
}) => {
  const [loading, setLoading] = useState(false);
  const [prev, setPrev] = useState("");
  const [filelist, setFileList] = useState([]);
  const [id] = useState((Math.random() + 1).toString(36).substring(7));

  const ext = () => {
    let file = prev || preview;
    return file ? file.split(".").pop() : null;
  };
  const previewImage = () => {
    let file = prev || preview;

    if (ext() === "pdf") {
      return null;
    }
    return file;
  };

  // const resend = (endpoint) => {
  //   return sendFile(filelist, endpoint);
  // };

  const onChange = () => {
    let el = document.getElementById(id);
    setFileList(el.files);
  };

  const sendFile = (pics, endpoint) => {
    let formData = new FormData();
    formData.append("file", pics[0]);
    return postMultimedia(endpoint, formData, { token: window.token_web });
  };

  const uploadPhoto = (pics) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("file", pics[0]);

    return sendFile(pics, endpoint)
      .then((result) => {
        onDone && onDone(result);
        if (result.data.Resource) {
          setPrev(result.data.Resource.preview);
          onChangeFiles && onChangeFiles(result.data.Resource);
        }
      })
      .catch((err) => {
        onError && onError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (filelist.length > 0) {
      uploadPhoto(filelist);
    }
  }, [filelist]);

  const renderImage = () => {
    if (loading) {
      return <AppLoader className="mx-auto px-3" size="sm" />;
    } else if (previewImage()) {
      return (
        <img
          src={previewImage()}
          alt="preview"
          className="rounded-lg mx-auto"
          style={{ width: "50px", height: "50px" }}
        />
      );
    } else if (ext === "pdf") {
      return (
        <AppIcon
          icon="pdf"
          style={{ width: "50px", height: "50px", fill: "black" }}
        />
      );
    } else {
      return (
        <AppIcon icon="upload" style={{ width: "50px", height: "50px" }} />
      );
    }
  };

  return (
    <div
      className={`p-2 rounded-lg inline-block bg-gray-100 border-2 border-gray-200 hover:bg-gray-200 w-full mb-5 ${classSelector} ${size}`}
    >
      <input
        type="file"
        className="hidden"
        id={id}
        onChange={onChange}
        accept={accept}
      />

      <label htmlFor={id} className=" items-center gap-3 cursor-pointer flex">
        <div className="prev">{renderImage()}</div>

        <div>
          {label ? (
            <div className="text-sm block py-1 text-black font-light">
              {label}
            </div>
          ) : null}

          <div className="text-left font-light text-xs text-gray-600">
            <p className="md:hidden block">
              Pulsa para tomar o ecoger una foto
            </p>
            <p className="hidden md:block">Toca aquí para seleccionar</p>
          </div>
        </div>
      </label>
    </div>
  );
};

export default AppFile;
