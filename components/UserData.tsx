import { useState, useEffect } from "react";
import { createClient, Entry } from "contentful-management";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";

interface EntryData {
  nombre: string;
  apellido: string;
  whatsapp: string;
  titulo: string;
  descripcion: string;
  precio: string;
  categoria: string;
  fotos: File[];
  userId: string;
}

export default function UserData() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const client = createClient({
          accessToken: "CFPAT-mU6ko0U4I8EfK82m7N72opM3bmrsSyZsYGvBwmjf8ns",
        });
        const space = await client.getSpace("pixs9lk7954s");
        const environment = await space.getEnvironment("master");
        const entries = await environment.getEntries({
          content_type: "alquiler",
        });
        const filteredEntries = entries.items.filter(
          (entry) => entry.fields.userId?.["en-US"] === userId
        );
        setEntries(filteredEntries);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEntries();
  }, [userId]);

  console.log(entries);

  return (
    <div>
      <h1 className="text-white text-2xl">Entradas del usuario {userId}</h1>
      {entries.map((entry) => (
        <div key={entry.sys.id}>
          <h2 className="text-white">{entry.fields.titulo["en-US"]}</h2>
          <p className="text-white">{entry.fields.descripcion["en-US"]}</p>

          {/* <Image
            src={`https:${entry.fields.fotos?.[0]?.fields?.file?.url}`}
            width={100}
            height={100}
            alt="Foto"
          /> */}
        </div>
      ))}
    </div>
  );
}
