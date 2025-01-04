import { px } from 'framer-motion'
import React from 'react'
import Projects from '../app/Projects/page'
import Link from 'next/link'
import AboutMe from '../app/AboutMe/page'
import Chatbot from '../app/Chatbot/page'

const TopNav = () => {
  return (
    <nav className="w-full bg-gradient-to-b from-green-700 to-black-100">
    <div className="flex justify-between items-center p-4 max-w-screen-xl mx-auto">
      {/* Logo on the left */}
      <img 
        src="/images/portfoliologo-removebg-preview.png" 
        alt="my logo" 
        style={{ width: '100px', height: 'auto' }} 
      />

      {/* Navigation links on the right */}
      <ul className="flex space-x-8">
        <Link href="/"><button className="smky-btn3 relative hover:text-black-100 py-2 px-6 after:absolute after:h-1 after:hover:h-[150%] transition-all duration-900 hover:transition-all hover:duration-900 after:transition-all after:duration-900 after:hover:transition-all after:hover:duration-900 overflow-hidden z-20 after:z-[-20] after:bg-green-500 after:rounded-t-full after:w-full after:bottom-0 after:left-0 text-white text-2xl">Home</button></Link>
        <Link href="/AboutMe"><button className="smky-btn3 relative hover:text-black-100 py-2 px-6 after:absolute after:h-1 after:hover:h-[150%] transition-all duration-900 hover:transition-all hover:duration-900 after:transition-all after:duration-900 after:hover:transition-all after:hover:duration-900 overflow-hidden z-20 after:z-[-20] after:bg-green-500 after:rounded-t-full after:w-full after:bottom-0 after:left-0 text-white text-2xl">About Me</button></Link>
        <Link href="/Skills"><button className="smky-btn3 relative hover:text-black-100 py-2 px-6 after:absolute after:h-1 after:hover:h-[150%] transition-all duration-900 hover:transition-all hover:duration-900 after:transition-all after:duration-900 after:hover:transition-all after:hover:duration-900 overflow-hidden z-20 after:z-[-20] after:bg-green-500 after:rounded-t-full after:w-full after:bottom-0 after:left-0 text-white text-2xl">Skills</button></Link>
        <Link href="/Projects"><button className="smky-btn3 relative hover:text-black-100 py-2 px-6 after:absolute after:h-1 after:hover:h-[150%] transition-all duration-900 hover:transition-all hover:duration-900 after:transition-all after:duration-900 after:hover:transition-all after:hover:duration-900 overflow-hidden z-20 after:z-[-20] after:bg-green-500 after:rounded-t-full after:w-full after:bottom-0 after:left-0 text-white text-2xl">Projects</button></Link>
        <Link href="/Chatbot"><button className="smky-btn3 relative hover:text-black-100 py-2 px-6 after:absolute after:h-1 after:hover:h-[150%] transition-all duration-900 hover:transition-all hover:duration-900 after:transition-all after:duration-900 after:hover:transition-all after:hover:duration-900 overflow-hidden z-20 after:z-[-20] after:bg-green-500 after:rounded-t-full after:w-full after:bottom-0 after:left-0 text-white text-2xl">Chat with me!</button></Link>      </ul>
    </div>
  </nav>
  )
}

export default TopNav