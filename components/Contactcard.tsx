"use client";

import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { LampContainer } from './ui/Lamp';
import { motion } from 'framer-motion';

export const Contactcard = () => {
  const form = useRef<HTMLFormElement | null>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .sendForm('service_svywrh9', 'template_okey3ph', form.current!, 'IzbSzKgt-E40yGdid')
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <div className="relative z-0 flex flex-col items-center justify-center min-h-screen bg-black-500">
      <LampContainer>
        <motion.h1 
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut",
        }}
        className='mt-8 bg-gradient-to-br from-white to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-8xl'
        >Contact me!
        </motion.h1>
      </LampContainer>
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0.5, y: 50 }}
        animate={{ opacity: 1, y: -150 }}
        transition={{
          duration: 1.0,
          ease: "easeInOut",
          delay: 0.5
        }}
      >
        <form
          ref={form}
          onSubmit={sendEmail}
          className="bg-white shadow-lg rounded-lg p-8 w-full"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Send me an email
          </h2>
          <label className="block mb-2 font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="user_name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your Name"
            required
          />
          <label className="block mb-2 font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="user_email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your Email"
            required
          />
          <label className="block mb-2 font-medium text-gray-700">Message</label>
          <textarea
            name="message"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your Message"
            rows={4}
            required
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
          >
            Send
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Contactcard;