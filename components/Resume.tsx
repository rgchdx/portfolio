"use client";

import React from 'react'
import { LampContainer } from './ui/Lamp'
import { motion } from "framer-motion";


const RESUME_URL = '/Richie_Gordon_Dix_Resume.pdf';

//FIX THIS PART LATER ON SO THAT WE CAN MAKE IT INTO SAVE DIRECTLY

const Resume = () => {
  const downloadPdf = () => {
    window.location.href=RESUME_URL;
  }

  return (
    <div>
        <LampContainer>
            <motion.h1
                initial={{ opacity: 0.5, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
                }}
                className="mt-8 bg-gradient-to-br from-white to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-8xl"
            >
                My resume
            </motion.h1>
            <motion.div 
              className='mt-8'
              initial={{opacity:0.5,y:100}}
              whileInView={{opacity:1,y:0}}
              transition={{
                delay:0.3,
                duration:0.8,
                ease:"easeInOut",
              }}>
                <button className="button" onClick={downloadPdf}>
                    <span className="actual-text">&nbsp;Download Resume&nbsp;</span>
                    <span aria-hidden="true" className="hover-text">&nbsp;Download&nbsp;Resume&nbsp;</span>
                </button>
            </motion.div>
        </LampContainer>
        <div>
            
        </div>
    </div>
  )
}

export default Resume