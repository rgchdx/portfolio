import TopNav from '@/components/TopNav'
import { TracingBeam } from '@/components/ui/Tracing-Beam'
import Chatpage from '@/components/Chatpage'
import React from 'react'

const Chatbot = () => {
  return (
    <main className='relative bg-black-100 flex justify-center 
    items-center flex-col overflow-hidden'>
      <TopNav />
      <Chatpage />
    </main>
  )
}

export default Chatbot