"use client";

import { useEffect, useState } from "react";
import { SiCarthrottle } from "react-icons/si";
import Link from "next/link";
import Signed from "../../clerk/Signed";
import Form from "../../components/Form";
import FormEdit from "../../components/FormEdit";
import { v4 as uuidv4 } from "uuid";
import { createClient } from "contentful-management";
import { useAuth } from "@clerk/nextjs";
import Products from "@/components/Products";
import Footer from "@/components/Footer";

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

export default function Public() {
  const [loadSigned, setLoadSigned] = useState(false);
  const [editProductId, setEditProductId] = useState<string | null>(null);

  const { isLoaded, userId } = useAuth();

  // In case the user signs out while on the page.
  if (!isLoaded || !userId) {
    return null;
  }

  useEffect(() => {
    setLoadSigned(true);
  }, []);

  const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ID;

  if (!accessToken) {
    throw new Error("Contentful access token not defined");
  }

  const client = createClient({
    accessToken,
  });

  const handleSubmit = async (formData: FormData) => {
    try {
      const space = await client.getSpace("pixs9lk7954s");
      const environment = await space.getEnvironment("master");

      const fotos = await Promise.all(
        Array.from(formData.fotos || []).map(async (file) => {
          const reader = new FileReader();
          reader.readAsArrayBuffer(file);
          await new Promise((resolve) => {
            reader.onload = resolve;
          });
          const buffer = new Uint8Array(reader.result as ArrayBuffer);
          const upload = await environment.createAssetFromFiles({
            fields: {
              title: {
                "en-US": file.name,
              },
              file: {
                "en-US": {
                  contentType: file.type,
                  fileName: file.name,
                  file: buffer,
                },
              },
              description: {},
            },
          });
          const asset = await upload.processForAllLocales();
          await asset.publish(); // Procesa y publica el asset
          return {
            sys: {
              type: "Link",
              linkType: "Asset",
              id: asset.sys.id,
            },
          };
        })
      );

      const entry = await environment.createEntryWithId("alquiler", uuidv4(), {
        fields: {
          nombre: { "en-US": formData.nombre },
          apellido: { "en-US": formData.apellido },
          whatsapp: { "en-US": formData.whatsapp },
          titulo: { "en-US": formData.titulo },
          descripcion: { "en-US": formData.descripcion },
          precio: { "en-US": formData.precio },
          categoria: { "en-US": formData.categoria },
          fotos: {
            "en-US": await Promise.all(fotos), // Procesa y publica la entrada
          },
          userId: {
            "en-US": userId,
          },
        },
      });

      await entry.publish();

      console.log("Entry created and published successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-900">
      <div className="pt-5 px-2 md:px-20 gap-2 md:gap-4 flex items-center justify-between">
        <Link href="/">
          <SiCarthrottle className="text-6xl md:text-7xl p-2 rounded-s-3xl rounded-t-3xl bg-slate-900 border-2 text-primary" />
        </Link>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {loadSigned && <Signed />}
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-4xl px-2 font-principal mt-10 text-primary text-center font-bold">
          Panel de Administracion /{" "}
          <span className="text-rose-300">Amplify</span>
          <span className="text-rose-300 text-[1.4rem]">.hh</span>
        </h1>
        <h3 className="font-principal px-2 text-center mt-5 text-primary text-xl ">
          Publica y alquila tu producto: Añade todos los detalles necesarios
          para que los usuarios puedan alquilarlo.
        </h3>
      </div>
      <div className="grid lg:flex justify-center mx-auto  gap-4 px-4 pt-14 pb-10">
        <div className="">
          {editProductId ? (
            <FormEdit
              editProductId={editProductId}
              setEditProductId={setEditProductId}
            />
          ) : (
            <Form onSubmit={handleSubmit} />
          )}
        </div>

        <div className="">
          <Products
            handleDelete={async (id) => {
              try {
                const space = await client.getSpace("pixs9lk7954s");
                const environment = await space.getEnvironment("master");
                const entry = await environment.getEntry(id);
                await entry.unpublish();
                
                await entry.delete();

                console.log("Entry updated successfully.");
                setEditProductId(null);
              } catch (error) {
                console.error(error);
              }
            }}
            handleEditClick={(id) => {
              setEditProductId(id);
            }}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
