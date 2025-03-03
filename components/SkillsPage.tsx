import React from 'react'
import { FocusCards } from './ui/Focus-Cards'
import { InfiniteMovingCards } from './ui/Infinite-Moving-Cards'

const SkillsPage = () => {
  const cards = [
    {
      title: 'Python',
      src: '/images/skills/python.png',
    },
    {
      title: 'JavaScript',
      src: '/images/skills/javascript.png',
    },
    {
      title: 'React',
      src: '/images/skills/react.png',
    },
    {
      title: 'Node.js',
      src: '/images/skills/nodejs.png',
    },
    {
      title: 'MongoDB',
      src: '/images/skills/mongodb.png',
    },
  ]

  const testimonials = [
    "/images/javaicon.png",
    "/images/javascripticon.png",
    "/images/reacticon.png"
  ];

  return (
    <div>
        <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
            images={testimonials}
            direction="right"
            speed="slow"
        />
        </div>
        <FocusCards cards={cards} />
    </div>
  )
}

export default SkillsPage