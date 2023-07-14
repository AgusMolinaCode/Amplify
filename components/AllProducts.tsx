import React, { useState, useEffect } from "react";
import { createClient } from "contentful";
import HomeProduct from "./HomeProduct";
import Footer from "./Footer";

interface Product {
  sys: {
    id: string;
    contentType: {
      sys: {
        id: string;
      };
    };
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
  contentTypeId: string;
}

const AllProducts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    const client = createClient({
      space: "pixs9lk7954s",
      accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_KEY as string,
    });

    client
      .getEntries<Product>({
        content_type: "alquiler",
      })
      .then((response) => {
        const products = response.items.map((item) => {
          return {
            sys: item.sys,
            fields: item.fields,
            contentTypeId: item.sys.contentType.sys.id,
          };
        });
        setProducts(products);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleShowAll = () => {
    setSelectedCategory("");
  };

  const filteredProducts = selectedCategory
    ? products.filter(
        (product) => product.fields.categoria === selectedCategory
      )
    : products;

  return (
    <div className="">
      {isLoading ? (
        <div className="flex mt-14 pb-10 justify-center items-center">
          <h1 className="animate-bounce text-4xl text-rose-300 font-secundario">
            Cargando...
          </h1>
        </div>
      ) : (
        <div>
          <div>
            <h1 className="text-2xl text-center text-white font-secundario mt-14">
              Filtrar Categoria
            </h1>
          </div>
          <div className="flex justify-center items-center mx-auto gap-4 px-2 md:px-10 mt-14 pb-10 ">
            <button
              className={`filter-button text-white h-12 px-6 rounded ${
                selectedCategory === "" ? "inline-flex h-12 animate-background-shine items-center justify-center rounded-md border-2 border-slate-600 bg-[linear-gradient(90deg,#000103,65%,#f3a4ce,75%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-2 focus:ring-offset-slate-50 font-principal" : "font-principal"
              }`}
              onClick={handleShowAll}
              onFocus={(e) => e.target.blur()}
            >
              Todos
            </button>
            <button
              className={`filter-button text-white h-12 px-6 rounded ${
                selectedCategory === "1" ? "inline-flex h-12 animate-background-shine items-center justify-center rounded-md border-2 border-slate-600 bg-[linear-gradient(90deg,#000103,65%,#f3a4ce,75%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-2 focus:ring-offset-slate-50 font-principal" : "font-principal"
              }`}
              onClick={() => handleCategorySelect("1")}
              onFocus={(e) => e.target.blur()}
            >
              Consolas
            </button>
            <button
              className={`filter-button text-white h-12 px-6 rounded ${
                selectedCategory === "2" ? "inline-flex h-12 animate-background-shine items-center justify-center rounded-md border-2 border-slate-600 bg-[linear-gradient(90deg,#000103,65%,#f3a4ce,75%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-2 focus:ring-offset-slate-50 font-principal" : "font-principal"
              }`}
              onClick={() => handleCategorySelect("2")}
              onFocus={(e) => e.target.blur()}
            >
              Mixer
            </button>
            <button
              className={`filter-button text-white h-12 px-6 rounded ${
                selectedCategory === "3git push origin maingit push origin main" ? "inline-flex h-12 animate-background-shine items-center justify-center rounded-md border-2 border-slate-600 bg-[linear-gradient(90deg,#000103,65%,#f3a4ce,75%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-2 focus:ring-offset-slate-50 font-principal" : "font-principal"
              }`}
              onClick={() => handleCategorySelect("3")}
              onFocus={(e) => e.target.blur()}
            >
              Sonido
            </button>
          </div>
          <div className="flex flex-wrap flex-initial justify-center items-center mx-auto gap-4 px-2 md:px-10 mt-14 pb-10 ">
            {filteredProducts.map((product) => (
              <HomeProduct key={product.sys.id} product={product} />
            ))}
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default AllProducts;
