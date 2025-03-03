import React from 'react'
import { FocusCards } from './ui/Focus-Cards'
import { InfiniteMovingCards } from './ui/Infinite-Moving-Cards'

const SkillsPage = () => {
  const cards = [
    {
      title: 'Leadership',
      src: '/images/skills/python.png',
      description: 'Lead teams through Sony application development and other projects. Outside of this field, I lead a team of 10+ people from age 12-60 at Les-Cheneaux Culinary School for breakfast shifts.'
    },
    {
      title: 'Collaboration',
      src: '/images/skills/javascript.png',
      description: 'Worked with teams at Sony, at Aquincum Institute of Technology and at chllege through multiple projects.'
    },
    {
      title: 'Presentation',
      src: '/images/skills/react.png',
      description: 'Presented projects to teams at Sony, at Kwanseigakuin University and was recognized by a large body of professionals'
    },
    {
      title: 'Design',
      src: '/images/skills/nodejs.png',
      description: 'Designed application ideas at Aquincum Institute of Technology, Sony and at Kwansegakuin University for projectss'
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