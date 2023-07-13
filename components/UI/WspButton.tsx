"use client";
import React, { useRef, useState } from "react";
import { BsWhatsapp } from "react-icons/bs";

const WspButton = () => {
  const divRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLInputElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <>
      <div className="relative w-full">
        <div
          onMouseMove={handleMouseMove}
          onBlur={handleBlur}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="h-12 w-full cursor-default rounded-md border border-slate-800 bg-neutral-950 p-3.5 text-slate-100 transition-colors duration-500  flex items-center justify-center gap-2 placeholder:text-neutral-500 focus:border-green-300 focus:outline-none"
        >
          <div className="flex justify-center gap-2 items-center text-center">
            <BsWhatsapp size={25} className=" text-green-500  text-sm" />
            <p className="text-slate-100 font-principal text-xl">Contactar</p>
          </div>
        </div>

        <div
          ref={divRef}
          style={{
            border: "2px solid #68c523",
            opacity,
            WebkitMaskImage: `radial-gradient(30% 40px at ${position.x}px ${position.y}px, black 50%, transparent)`,
          }}
          className="pointer-events-none absolute left-0 top-0  h-12 w-full cursor-default rounded-md border border-green-300 bg-[transparent] p-3.5  transition-opacity duration-500 placeholder:select-none"
        ></div>
      </div>
    </>
  );
};

export default WspButton;
