"use client";

import { cn } from "@/utils/cn";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  images,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  images: { src: string; name: string; proficiency: number }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);

  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      const duration = speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
      containerRef.current.style.setProperty("--animation-duration", duration);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {images.map((item, idx) => (
          <li
            key={idx}
            className="w-[200px] h-[200px] max-w-full relative rounded-lg flex-shrink-0 border border-slate-700 overflow-hidden md:w-[150px] md:h-[150px] group flex items-center justify-center"
          >
            <img
              src={item.src}
              alt={item.name}
              className="w-full h-full object-contain p-4 transition duration-300 group-hover:brightness-50 group-hover:blur-sm"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-white text-sm font-semibold">{item.name}</span>
              <span className="text-white text-xs mt-1">Proficiency Level</span>
              <div className="w-3/4 bg-gray-600 h-2 mt-1 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full" style={{ width: `${item.proficiency}%` }}></div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

