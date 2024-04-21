"use client";
import React from "react";

function RuntimeTemplate({ html }) {
  const alert = (a) => {
    window.alert(a);
  };

  // NOTA: Esto asume que el HTML es seguro. Ten precaución con contenido de fuentes no confiables.
  const createMarkup = (htmlString) => {
    return { __html: htmlString };
  };

  return <div dangerouslySetInnerHTML={createMarkup(html)} />;
}

export default RuntimeTemplate;
