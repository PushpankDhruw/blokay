"use client";
import { useEffect, useState } from "react";

export const useScreenDetector = () => {
  const windowObj: any = typeof window !== "undefined" ? window : {};
  const [width, setWidth] = useState(windowObj.innerWidth);

  const handleWindowSizeChange = () => {
    setWidth(windowObj.innerWidth);
  };

  useEffect(() => {
    windowObj.addEventListener("resize", handleWindowSizeChange);

    return () => {
      windowObj.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;
  const isTablet = width <= 1024;
  const isDesktop = width > 1024;

  return { isMobile, isTablet, isDesktop };
};
