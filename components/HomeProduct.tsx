import React, { useRef, useState } from "react";
import Image from "next/image";
import Accordion from "./Accordion";
import Link from "next/link";
import WspButton from "./UI/WspButton";

interface Product {
  sys: {
    id: string;
  };
  fields: {
    nombre: string;
    apellido: string;
    whatsapp: string;
    titulo: string;
    descripcion: string;
    precio: string;
    categoria: string;
    userId: string;
    fotos: {
      sys: {
        id: string;
      };
      fields: {
        file: {
          url: string;
        };
      };
    }[];
  };
}

const HomeProduct = ({ product }: { product: Product }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [showImage, setShowImage] = useState(true);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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

  const handleAccordionClick = (isOpen: boolean) => {
    setShowImage(isOpen);
  };

  return (
    <div className="">
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative md:h-[570px] md:w-[380px] items-center justify-center overflow-hidden rounded-xl border border-slate-400 bg-gradient-to-r from-black to-slate-950 px-2 py-2 shadow-2xl`}
      >
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
          style={{
            opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,182,255,.1), transparent 40%)`,
          }}
        />
        <div>
          <div className="flex flex-col justify-center ">
            <h1 className="text-2xl font-bold text-primary text-left font-principal">
              {product.fields.titulo}
            </h1>
            <h2 className="text-sm text-left font-bold text-rose-300 font-principal">
              {product.fields.nombre}
            </h2>
          </div>
          <hr className="border-[1px] border-slate-400 mt-3" />
          <div>
            <Accordion
              onClick={handleAccordionClick}
              descripcion={product.fields.descripcion}
            />
          </div>
          <div
            className={`w-full h-[285px] overflow-hidden  bg-gradient-to-r from-black to-slate-950 px-2 py-2 shadow-2xl ${
              showImage ? "" : "hidden"
            }`}
          >
            <Image
              className="flex justify-center mt-4 items-center mx-auto"
              src={`https:${product.fields.fotos[0].fields.file.url}`}
              width={380}
              height={380}
              alt="Foto Producto"
            />
          </div>
          <hr className="border-[1px] border-slate-400 mt-3" />
          <div className="flex justify-between items-center">
            <p className="text-xl mt-2 font-bold text-primary text-left font-principal">
              ${product.fields.precio} ARS
            </p>
            <p className="text-xl mt-2 font-bold text-primary text-left font-principal">
              <span className="text-sm text-left font-bold text-rose-300 font-principal">
                Categoria:{" "}
              </span>
              {product.fields.categoria === "1" ? "Consola" : ""}
              {product.fields.categoria === "2" ? "Mixer" : ""}
              {product.fields.categoria === "3" ? "Sonido" : ""}
            </p>
          </div>
          <hr className="border-[1px] border-slate-400 mt-3" />
          <div className="">
            {product.fields.whatsapp && (
              <Link
                href={`https://wa.me/${product.fields.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center mt-2"
              >
                <WspButton />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeProduct;
