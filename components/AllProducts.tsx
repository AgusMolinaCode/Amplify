import React from "react";
import { createClient } from "contentful";
import HomeProduct from "./HomeProduct";
import Footer from "./Footer";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";

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

const AllProducts = () => {
  const queryClient = new QueryClient();

  const { isLoading, data } = useQuery<Product[]>("products", async () => {
    const client = createClient({
      space: "pixs9lk7954s",
      accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_KEY as string,
    });

    const response = await client.getEntries<Product>();
    return response.items;
  });

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
            {data?.map((product) => (
              <HomeProduct key={product.sys.id} product={product} />
            ))}
          </div>
          <Footer />
        </div>
      )}
      
    </div>
  );
};

const AllProductsWrapper = () => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <AllProducts />
    </QueryClientProvider>
  );
};

export default AllProductsWrapper;