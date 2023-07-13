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
          <div className="flex flex-wrap flex-initial justify-center items-center mx-auto gap-4 px-2 md:px-10 mt-14 pb-10 ">
            {products.map((product) => (
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
