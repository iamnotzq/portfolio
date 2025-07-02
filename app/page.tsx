import Hero from "@/components/Hero";
import NavbarComponent from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative overflow-hidden h-screen w-full bg-black">
      <Hero />
      <NavbarComponent />
    </main>
  );
}
