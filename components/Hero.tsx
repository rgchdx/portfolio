"use client";

import React, { useEffect, useMemo, useState } from 'react'
import { BackgroundLines } from './ui/Background-lines'
import Image from 'next/image'
import { ReactTyped, Typed } from 'react-typed';
import {IconArrowLeft, IconArrowRight} from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';

const Hero = () => {
  const testimonials = [
    {
      name: "programmer",
      quote: "a programmer",
      src: "/images/programmer.jpeg",
    },
    {
      name: "handler",
      quote: "a handler",
      src: "/images/frisbee.jpeg",
    },
    {
      name: "volleyballer",
      quote: "a volleyballer",
      src: "/images/volleyball.jpeg",
    },
    {
      name: "chef",
      quote: "a chef",
      src: "/images/chef.jpeg",
    },
    {
      name: "climber",
      quote: "a climber",
      src: "/images/climbing.jpeg",
    },
  ];
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [typed,setTyped] = useState<Typed | undefined>();
  const [rotationValues, setRotationValues] = useState<number[]>([]);

  useEffect(() => {
    // Generate random rotation values only on the client side
    setRotationValues(testimonials.map(() => Math.floor(Math.random() * 21) - 10));
  }, []);

  const gotoNext = () => {
    // Increment index and wrap around
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const gotoPrev = () => {
    // Decrement index and wrap around
    setActiveIndex((prevIndex) => (testimonials.length + prevIndex - 1) % testimonials.length);
  };

  // Access the active testimonial using the current index
  const active = testimonials[activeIndex];

  const isActive = (i:number) => i === testimonials.indexOf(active);
  
  const randomRotate = (i: number) => rotationValues[i];

  /*
  const typedText = () => {
    if(typed){
      typed.reset();
      typed.strings={[active.quote]};
      typed.start();
    }
  }
  */

  return (
    <div className='pb-20 pt-36'>
        <div>
          <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 relative">
            <div className='grid grid-cols-2 gap-12 max-w-4xl mx-auto relative z-10'>
              <div className='relative h-80 w-full'>
                <AnimatePresence>
                  {testimonials.map((testimonial ,i) => (
                    <motion.div 
                    initial={{
                      opacity: 0, 
                      scale: 0.9, 
                      z: -100, 
                      rotate: randomRotate(i), 
                      y: 0
                    }} 
                    animate={{
                      opacity: isActive(i) ? 1 : 0.7,
                      scale: isActive(i) ? 1 : 0.95,
                      rotate: isActive(i) ? 0 : randomRotate(i),
                      zIndex: isActive(i) ? 999 : testimonials.length + 2 - i,
                      y: isActive(i) ? [0, -80, 0] : 0
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      rotate: randomRotate(i),
                      z: 100
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut"
                    }}
                    key={testimonial.name}
                    className='absolute inset-0 origin-bottom'
                  >
                      <Image
                        src={testimonial.src}
                        className='rounded-3xl h-full w-full'
                        height={500}
                        width={500}
                        alt={testimonial.name}/>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <div>
                <h2 className='font-bold text-2xl text-white'>My name is Richie Dix and I am...</h2>
                <h2 className='font-bold text-2xl text-green-500'>{active.quote}</h2>
                <ReactTyped 
                  typedRef={setTyped}
                  strings={[active.quote]}
                  typeSpeed={40}
                />
                <div className='flex gap-4 pt-4'>
                  <button onClick={gotoPrev} className='h-6 w-6 rounded-full bg-green-500 flex items-center justify-center'>
                    <IconArrowLeft className='h-4 w-4 text-black-100'/>
                  </button>
                  <button onClick={()=>{
                    gotoNext();
                    //typed.;    work on type later
                    }} 
                    className='h-6 w-6 rounded-full bg-green-500 flex items-center justify-center'>
                    <IconArrowRight className='h-4 w-4 text-black-100'/>
                  </button>
                </div>
              </div>
            </div>
          </BackgroundLines>
        </div>
    </div>
  )
}

export default Hero