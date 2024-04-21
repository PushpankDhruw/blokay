import React from "react";
import { AppIcon } from "./Index.jsx";

const AppBox = function ({ title, icon, onClick }) {
  const handleClick = (e) => {
    onClick && onClick(e);
  };
  return (
    <div
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
      onClick={handleClick}
    >
      <div>
        <AppIcon className="w-6 h-6" icon={icon} />
      </div>
      <h2>{title}</h2>
    </div>
  );
};

export default AppBox;