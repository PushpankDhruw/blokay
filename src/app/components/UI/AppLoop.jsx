"use client";
import { useEffect, useState } from "react";

export default function AppLoop({
  separation = 15,
  time = 20,
  direction = "left",
  children,
}) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    let el = document.getElementById("firstSlot");
    if (el) {
      setWidth(Math.floor(el.offsetWidth / 2 + separation));
    }
  }, []);

  return (
    <div>
      <section className="slide-option">
        <div className="highway-slider">
          <div className="highway-barrier">
            <div className={`highway-lane ${direction}`}>
              <div
                id="firstSlot"
                className="flex"
                style={{
                  "--widthSlide": `${width}px`,
                  "--time": `${time}s`,
                  gap: `${separation}px`,
                }}
              >
                {children}
                {children}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
