import { useAuth } from "@clerk/nextjs";
import { createClient } from "contentful";
import Image from "next/image";
import useSWR from "swr";
import { useState } from "react";

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

interface Props {
  handleDelete: (id: string) => void;
  handleEditClick: (id: string) => void;
}

export default function Products({
  handleDelete,
  handleEditClick,
}: Props): JSX.Element {
  const { isLoaded, userId } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // In case the user signs out while on the page.
  if (!isLoaded || !userId) {
    return <div></div>;
  }

  const handleDeleteClick = async (id: string) => {
    setIsLoading(true);
    await handleDelete(id);
    setIsLoading(false);
  };

  const client = createClient({
    space: "pixs9lk7954s",
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_KEY as string,
  });

  async function getContent(): Promise<Product[]> {
    const entries = await client.getEntries<Product>();
    const products = entries.items.map((item) => {
      return {
        sys: item.sys,
        fields: item.fields,
        contentTypeId: item.sys.contentType.sys.id,
      };
    });
    return products;
  }

  const { data: content, error } = useSWR<Product[]>("content", getContent, {
    refreshInterval: 1000,
  });

  if (error) {
    console.error(error);
    return <div>Error al cargar los Productos</div>;
  }

  const filteredContent = content?.filter(
    (item) => item.fields.userId === userId
  );

  return (
    <>
      <div className="">
        <div className="flex flex-col gap-4 w-[321px] md:w-[490px] px-2 rounded-2xl">
          {filteredContent?.map((item) => (
            <div
              key={item.sys.id}
              className=" border-[1px] border-primary  gap-2 p-4 bg-gray-800 rounded-md"
            >
              <div className="flex items-center flex-col gap-2">
                <div>
                  <h1 className="text-xl font-principal text-primary">
                    {item.fields.nombre} {item.fields.apellido}
                  </h1>
                </div>

                <div>
                  <h1 className="text-2xl font-principal text-primary">
                    {item.fields.titulo}
                  </h1>
                </div>
                <div className="flex justify-center mx-auto">
                  {item.fields.fotos.map((foto) => (
                    <div key={foto.sys.id} className="">
                      <Image
                        src={`https:${foto.fields.file.url}`}
                        width={250}
                        height={250}
                        alt="Foto Producto"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <hr className="m-5" />
              <div className="flex items-center">
                <h1 className="text-lg font-principal w-[500px] text-center text-primary">
                  {item.fields.descripcion}
                </h1>
              </div>
              <hr className="m-5" />
              <div className="flex flex-wrap items-center justify-around">
                <h1 className="text-lg md:text-xl font-principal text-primary">
                  $ {item.fields.precio} ARS
                </h1>
                
                <h1 className="text-lg md:text-xl font-principal text-primary">
                  Wsp: {item.fields.whatsapp}
                </h1>
              </div>
              <hr className="m-5" />
              <div className="flex justify-center mx-auto gap-4">
                <button
                  className="text-white p-2 border-[1px] hover:bg-indigo-600 duration-300 font-principal rounded-xl font-semibold text-xl"
                  onClick={() => handleEditClick(item.sys.id)}
                >
                  Editar
                </button>
                <button
                  className="text-white p-2 border-[1px] hover:bg-red-600 duration-300 font-principal rounded-xl font-semibold text-xl"
                  onClick={() => handleDeleteClick(item.sys.id)}

                >
                  {isLoading ? "Eliminando..." : "Eliminar"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
