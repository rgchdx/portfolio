import Footer from '@/components/Footer'
import Introtome from '@/components/Introtome'
import TopNav from '@/components/TopNav'
import React from 'react'

const AboutMe = () => {
  return (
    <main className='relative bg-black-100 flex justify-center 
    items-center flex-col overflow-hidden'>
      <TopNav />
      <div className="max-w-7xl w-full">
        <Introtome />
        <Footer />
      </div> 
    </main>
  )
}

export default AboutMe