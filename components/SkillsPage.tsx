import React from 'react'
import { FocusCards } from './ui/Focus-Cards'

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
  return (
    <FocusCards cards={cards} />
  )
}

export default SkillsPage