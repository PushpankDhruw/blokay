import React from "react";
import "./Index.css";

const AppLoader = ({ size, color, className }) => {
  const loaderStyle = {
    width: size === "sm" ? "1rem" : "80px",
    height: size === "sm" ? "1rem" : "80px",
  };

  const divStyle = {
    width: size === "sm" ? "0.8rem" : "64px",
    height: size === "sm" ? "0.8rem" : "64px",
    borderWidth: size === "sm" ? "0.2rem" : "8px",
  };

  const loaderClassName = `lds-ring ${size} ${className}`;

  return (
    <div className={loaderClassName} style={loaderStyle}>
      {[1, 2, 3, 4].map((x) => (
        <div
          key={x}
          style={{
            ...divStyle,
            borderColor: color,
            borderTopColor: "transparent",
          }}
        />
      ))}
    </div>
  );
};

export default AppLoader;
