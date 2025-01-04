import Footer from '@/components/Footer'
import TopNav from '@/components/TopNav'
import { TracingBeam } from '@/components/ui/Tracing-Beam'
import React from 'react'

const AboutMe = () => {
  return (
    <main className='relative bg-black-100 flex justify-center 
    items-center flex-col overflow-hidden'>
      <TopNav />
      <TracingBeam className="px-15">
      <div className="max-w-7xl w-full">
        <div>Currently Working on this</div>
        <Footer />
      </div>
      </TracingBeam>
    </main>
  )
}

export default AboutMe