import Footer from '@/components/Footer'
import TopNav from '@/components/TopNav'
import { ExpandableCardDemo } from '@/components/ui/Expandable-Cards'
import { TracingBeam } from '@/components/ui/Tracing-Beam'
import React from 'react'

const Projects = () => {
  return (
    <main className='relative bg-black-100 flex justify-center 
    items-center flex-col overflow-hidden'>
      <TopNav />
      <TracingBeam className="px-15">
      <div className="max-w-7xl w-full">
        <ExpandableCardDemo />
        <Footer />
      </div>
      </TracingBeam>
    </main>
  )
}

export default Projects