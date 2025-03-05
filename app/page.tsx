import Hero from "@/components/Hero"
import Resume from "@/components/Resume";
import Contactcard from "@/components/Contactcard";
import ResumeContent from "@/components/ResumeContent";
import Footer from "@/components/Footer";
import { TracingBeam } from "@/components/ui/Tracing-Beam";
import TopNav from "@/components/TopNav";

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
