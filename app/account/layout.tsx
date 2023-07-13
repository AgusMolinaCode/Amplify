import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publica tus productos de alquiler y llega a una audiencia más amplia",
  description: "Descubre los mejores sistemas de audio, iluminación y karaoke para alquiler en nuestro sitio web. Ofrecemos una amplia gama de equipos de alta calidad que te ayudarán a crear la atmósfera perfecta para tu evento.",
  keywords: ['sistemas de audio', 'equipos de iluminación', 'alquiler de karaoke', 'alquiler de equipos para eventos', 'sistemas de sonido', 'alquiler de fiestas', 'audio profesional', 'iluminación de escenario', 'equipos de DJ', 'producción de eventos'],
  };
export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
