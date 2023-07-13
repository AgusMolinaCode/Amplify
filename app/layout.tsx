import Signed from "@/clerk/Signed";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "Amplify",
  description: "Sonido e iluminación de élite en tus manos.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Outfit:wght@200;400;600;700&family=Racing+Sans+One&display=swap"
            rel="stylesheet"
          />
        </head>
        <body>
        
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
