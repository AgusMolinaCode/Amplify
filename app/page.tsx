"use client";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AllProducts from "../components/AllProducts";

export default function Home(): JSX.Element {
  return (
    <main className="fondo border-zinc-900 ">
      <Navbar />
      <Hero />
      <AllProducts />
    </main>
  );
}
