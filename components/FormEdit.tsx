import { useState, useEffect } from "react";
import { createClient } from "contentful";
import { createClient as createManagementClient } from "contentful-management";

interface ProductDetailsProps {
  editProductId: string | null;
  setEditProductId: (id: string | null) => void;
}

interface ProductData {
  sys: {
    id: string;
  };
  nombre: string;
  apellido: string;
  whatsapp: string;
  titulo: string;
  descripcion: string;
  precio: string;
  categoria: string;
  userId: string;
}

const ProductDetails = ({
  editProductId,
  setEditProductId,
}: ProductDetailsProps) => {
  const [product, setProduct] = useState<ProductData>({
    sys: {
      id: "",
    },
    nombre: "",
    apellido: "",
    whatsapp: "",
    titulo: "",
    descripcion: "",
    precio: "",
    categoria: "",
    userId: "",
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!editProductId) {
      return;
    }

    const client = createClient({
      space: "pixs9lk7954s",
      accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_KEY as string,
    });

    client
      .getEntry(editProductId)
      .then((entry) => {
        const fields = entry.fields;
        setProduct({
          sys: {
            id: entry.sys.id as string,
          },
          nombre: fields.nombre as string,
          apellido: fields.apellido as string,
          whatsapp: fields.whatsapp as string,
          titulo: fields.titulo as string,
          descripcion: fields.descripcion as string,
          precio: fields.precio as string,
          categoria: fields.categoria as string,
          userId: fields.userId as string,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [editProductId]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSaving(true);

    const client = createManagementClient({
      accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ID as string,
    });

    try {
      const space = await client.getSpace("pixs9lk7954s");
      const environment = await space.getEnvironment("master");
      const entry = await environment.getEntry(product.sys.id as string);

      entry.fields.nombre["en-US"] = product.nombre;
      entry.fields.apellido["en-US"] = product.apellido;
      entry.fields.whatsapp["en-US"] = product.whatsapp;
      entry.fields.titulo["en-US"] = product.titulo;
      entry.fields.descripcion["en-US"] = product.descripcion;
      entry.fields.precio["en-US"] = product.precio;
      entry.fields.categoria["en-US"] = product.categoria;

      await entry.update();
      await entry.unpublish().then((entry) => entry.publish());

      setEditProductId(null);
      setIsSaving(false);

      console.log("Contenido actualizado exitosamente");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fijo">
      <form
        className="flex flex-col justify-center mx-auto px-2 gap-4 w-[312px] md:w-[500px]  p-4 rounded-2xl bg-gray-700"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center font-principal font-bold text-2xl text-[#37b5e5] ">
          Formulario para tus Productos
        </h1>
        <input
          className="bg-gray-900 w-full flex justify-center mx-auto text-primary font-principal p-2 rounded-lg"
          type="text"
          placeholder="Nombre"
          name="nombre"
          value={product.nombre}
          onChange={handleInputChange}
          required
        />

        <input
          className="bg-gray-900 w-full  flex justify-center mx-auto text-primary font-principal p-2 rounded-lg"
          type="text"
          placeholder="WhatssApp"
          name="whatsapp"
          value={product.whatsapp}
          onChange={handleInputChange}
          required
          pattern="^[0-9]+$"
          inputMode="numeric"
          title="Solo se permiten números"
        />

        <input
          className="bg-gray-900 w-full  flex justify-center mx-auto text-primary font-principal p-2 rounded-lg"
          type="text"
          placeholder="Titulo"
          name="titulo"
          value={product.titulo}
          onChange={handleInputChange}
          required
        />

        <textarea
          className="bg-gray-900 w-full  h-[10rem] flex justify-center mx-auto text-primary font-principal p-2 rounded-lg"
          placeholder="Descripcion"
          name="descripcion"
          value={product.descripcion}
          onChange={handleTextareaChange}
          required
        />

        <input
          className="bg-gray-900 w-full  flex justify-center mx-auto text-primary font-principal p-2 rounded-lg"
          type="text"
          placeholder="Precio"
          name="precio"
          value={product.precio}
          onChange={handleInputChange}
          required
          pattern="^[0-9]+$"
          inputMode="numeric"
          title="Solo se permiten números"
        />

        <select
          className="bg-gray-900 w-full  flex justify-center mx-auto text-primary font-principal p-2 rounded-lg"
          name="categoria"
          value={product.categoria}
          onChange={handleSelectChange}
          required
        >
          <option value="">-- Selecciona una categoría --</option>
          <option value="1">Consola</option>
          <option value="2">Auriculares</option>
          <option value="3">Mixer</option>
        </select>

        <button
          className="bg-gray-600 w-full  flex justify-center mx-auto text-primary text-xl font-bold font-principal p-2 hover:bg-gray-500 duration-300 rounded-lg"
          type="submit"
          disabled={isSaving}
        >
          {isSaving ? "Guardando..." : "Guardar Cambios"}
        </button>

        <button
          className="bg-gray-600 w-full  flex justify-center mx-auto text-primary text-xl font-bold font-principal p-2 hover:bg-gray-500 duration-300 rounded-lg"
          onClick={() => {
            setEditProductId(null);
          }}
        >
          Volver
        </button>
      </form>
    </div>
  );
};

export default ProductDetails;