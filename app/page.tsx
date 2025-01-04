import Image from "next/image";
import Hero from "@/components/Hero"
import Resume from "@/components/Resume";
import Contactcard from "@/components/Contactcard";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { FaHome } from "react-icons/fa";
import ResumeContent from "@/components/ResumeContent";
import Chatbot from "@/app/Chatbot/page";
import Projects from "@/app/Projects/page";
import AboutMe from "@/app/AboutMe/page";
import Footer from "@/components/Footer";
import { TracingBeam } from "@/components/ui/Tracing-Beam";
import TopNav from "@/components/TopNav";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function Home() {
  return (
    <main className='relative bg-black-100 flex justify-center 
    items-center flex-col overflow-hidden'>
      <TopNav />
      <TracingBeam className="px-15">
      <div className="max-w-7xl w-full">
        <Hero />
        <Resume />
        <ResumeContent />
        <Contactcard />
        <Footer />
      </div>
      </TracingBeam>
    </main>
  );
}
