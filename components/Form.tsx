import { useState } from "react";

interface Props {
  handleEditClick: (id: string) => void;
}

interface FormProps {
  onSubmit: (data: FormData) => void;
}

interface FormData {
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
  fotos: FileList | null;
  userId: string;
}

const Form = ({ onSubmit }: FormProps) => {
  const [formData, setFormData] = useState<FormData>({
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
    fotos: null,
    userId: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    // Validar whatsapp y precio
    if (name === "whatsapp" || name === "precio") {
      const regex = /^[0-9]+$/;
      if (regex.test(value)) {
        event.target.setCustomValidity("");
      } else {
        event.target.setCustomValidity("El campo debe contener solo números");
      }
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      fotos: files,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    await onSubmit(formData);
    setIsSubmitting(false);
    setFormData({
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
      fotos: null,
      userId: "",
    });
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
          value={formData.nombre}
          onChange={handleInputChange}
          required
        />

        <input
          className="bg-gray-900 w-full  flex justify-center mx-auto text-primary font-principal p-2 rounded-lg"
          type="text"
          placeholder="WhatssApp"
          name="whatsapp"
          value={formData.whatsapp}
          onChange={handleInputChange}
          required
        />

        <input
          className="bg-gray-900 w-full  flex justify-center mx-auto text-primary font-principal p-2 rounded-lg"
          type="text"
          placeholder="Titulo"
          name="titulo"
          value={formData.titulo}
          onChange={handleInputChange}
          required
        />

        <textarea
          className="bg-gray-900 w-full  h-[10rem] flex justify-center mx-auto text-primary font-principal p-2 rounded-lg"
          placeholder="Descripcion"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleInputChange}
          required
        />

        <input
          className="bg-gray-900 w-full  flex justify-center mx-auto text-primary font-principal p-2 rounded-lg"
          type="text"
          placeholder="Precio"
          name="precio"
          value={formData.precio}
          onChange={handleInputChange}
          required
        />

        <select
          className="bg-gray-900 w-full  flex justify-center mx-auto text-primary font-principal p-2 rounded-lg"
          name="categoria"
          value={formData.categoria}
          onChange={handleInputChange}
          required
        >
          <option value="">-- Selecciona una categoría --</option>
          <option value="1">Consola</option>
          <option value="2">Auriculares</option>
          <option value="3">Mixer</option>
        </select>

        <input
          className="bg-gray-900 w-full  flex justify-center mx-auto text-primary font-principal p-2 rounded-lg"
          type="file"
          placeholder="Fotos"
          name="fotos"
          onChange={handleFileChange}
          required
        />

        {isSubmitting ? (
          <button
            className="bg-gray-600 w-full  flex justify-center mx-auto text-primary text-xl font-bold font-principal p-2 rounded-lg"
            type="button"
            disabled
          >
            Publicando...
          </button>
        ) : (
          <button
            className="bg-gray-600 w-full  flex justify-center mx-auto text-primary text-xl font-bold font-principal p-2 hover:bg-gray-500 duration-300 rounded-lg"
            type="submit"
          >
            Publicar
          </button>
        )}
      </form>
    </div>
  );
};

export default Form;