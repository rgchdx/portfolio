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
  {
    src: '/images/javaicon.png',
    name: 'Java',
    proficiency: 90,
  },
  {
    src: '/images/javascripticon.png',
    name: 'JavaScript',
    proficiency: 85,
  },
  {
    src: '/images/typescripticon.png',
    name: 'TypeScript',
    proficiency: 85
  },
  {
    src: 'images/pythonicon.png',
    name: 'Python',
    proficiency: 85
  },
  {
    src: '/images/kotlinicon.png',
    name: 'Kotlin',
    proficiency: 75
  },
  {
    src: '/images/cicon.png',
    name: 'C',
    proficiency: 70
  },
  {
    src: 'images/cplusicon.png',
    name: 'C++',
    proficiency: 70
  },
  {
    src: '/images/htmlicon.png',
    name: 'HTML',
    proficiency: 85
  },
  {
    src: '/images/cssicon.png',
    name: 'CSS',
    proficiency: 75
  },
  {
    src: 'images/ricon.jpg',
    name: 'R',
    proficiency: 70
  },
  {
    src: 'images/sqlicon.png',
    name: 'SQL',
    proficiency: 65
  },
  {
    src: '/images/goicon.png',
    name: 'Golang',
    proficiency: 65
  },
  {
    src: '/images/nexticon.png',
    name: 'Next.js',
    proficiency: 85
  },
  {
    src: '/images/prologicon.png',
    name: 'Prolog',
    proficiency: 75
  },
  {
    src: '/images/firebaseicon.png',
    name: 'Firebase',
    proficiency: 75
  },
  {
    src: '/images/supabaseicon.png',
    name: 'Supabase',
    proficiency: 75
  },
  {
    src: '/images/reacticon.png',
    name: 'React',
    proficiency: 70
  }
]

  return (
    <div>
        <div className="h-[40rem] rounded-md flex flex-col antialiased bg-black-100 items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
            images={testimonials}
            direction="right"
            speed="normal"
        />
        </div>
        <FocusCards cards={cards} />
    </div>
  )
}

export default SkillsPage