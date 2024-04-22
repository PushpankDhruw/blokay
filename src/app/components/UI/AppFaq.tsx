"use client";
import { useState } from "react";
const AppFAQ = function (props: any) {
  const { title, color, image, children } = props;

  const [show, setShow] = useState(false);
  const toggle = () => {
    setShow(!show);
  };

  return (
    <>
      <div
        className="  text-gray-900 font-base cursor-pointer relative select-none font-light h-full"
        onClick={toggle}
      >
        <div className="h-full flex items-center gap-3 py-1 px-3 md:px-5">
          {/* <div
            className="w-14 h-14 rounded-full overflow-hidden"
            style={{ flexShrink: 0 }}
          >
            <img
              src={`/icons/${image}`}
              className="object-cover w-full h-full"
            />
          </div> */}
          <div className="md:py-5 py-3">
            <p className="text-sm text-gray-900">{title}</p>

            {show && (
              <p className="font-light text-sm text-black h-full border-t-2 mt-3 pt-3 border-gray-200">
                {children}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AppFAQ;
