import Hero from "@/components/Hero";
import NavbarComponent from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative bg-white flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <NavbarComponent/>
        <Hero />
        
      </div>
    </main>
  );
}
