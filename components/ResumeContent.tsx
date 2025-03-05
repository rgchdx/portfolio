import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";

export function ResumeContent() {
  return (
    <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem] pb-7">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          id={item.id}
          title={item.title}
          description={item.description}
          className={item.className}
          img={item.img}
          imgClassName={item.imgClassName}
          spareImg={item.spareImg}
          href={item.href}
        />
      ))}
    </BentoGrid>
  );
}

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl dark:bg-dot-white/[0.2] bg-dot-black/[0.2]"></div>
);

const items = [
  {
    id: 1,
    title: "My Education",
    description: "I attended Senri International School and am a computer science major at Knox College.",
    header: <Skeleton />,
    className: "md:col-span-2",
    img: "/images/schools.png",
    imgClassName: "w-full h-full",
    spareImg: "",
    href: "/AboutMe"
  },
  {
    id: 2,
    title: "Skills",
    description: "Click below to see what skills I am proficient in!",
    header: <Skeleton />,
    className: "md:col-span-1",
    img: "/images/skills.png",
    spareImg: "",
    href: "/Skills"
  },
  {
    id: 3,
    title: "About Me",
    description: "Click below to go and see who I am!",
    header: <Skeleton />,
    className: "md:col-span-1",
    img: "/images/aboutme.jpg",
    spareImg: "",
    href: "/AboutMe"
  },
  {
    id: 4,
    title: "Projects",
    description: "Click below to see what projects I've done or am currently working on!",
    header: <Skeleton />,
    className: "md:col-span-2",
    img: "/images/camelotscreen.png",
    spareImg: "",
    href: "/Projects"
  },
];

export default ResumeContent;