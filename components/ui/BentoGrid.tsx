"use client";
import { cn } from "@/utils/cn";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  id?: number;
  header?: string | React.ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
  href?: string
}) => {
  return (
    <div
      className={cn(
        "group row-span-1 relative rounded-3xl group/bento transition duration-200 shadow-input dark:shadow-none p-4 bg-black-100 border border-transparent justify-between flex flex-col space-y-4 hover:shadow-xl hover:shadow-green-800 border-green-500 hover:translate-y-[-0.5rem] hover:scale-105",
        className
      )}
      style={{
        background: "black-100",
        backgroundColor: "linear-gradient(90deg, rgba(21,213,75,1) 29%, rgba(1,87,23,1) 100%)",
      }}
    >
      {/* Image Section */}
      {img && (
        <div className="relative w-full h-full rounded-3xl overflow-hidden">
          <img
            src={img}
            alt={title?.toString() || "Image"}
            className={cn(
              "absolute inset-0 object-cover object-center w-full h-full",
              imgClassName
            )}
          />
        </div>
      )}
      {/* Spare Image Section */}
      {spareImg && (
        <div className="absolute right-0 -bottom-5 w-full opacity-80">
          <img
            src={spareImg}
            alt="Spare"
            className="object-cover object-center w-full h-full"
          />
        </div>
      )}
      {/* Content Section */}
      <div className="group-hover/bento:translate-x-2 transition duration-200">

        <div className={cn("font-sans font-bold text-white mb-2 mt-2", titleClassName)}>
          {title}
        </div>
        <div className="font-sans font-normal text-white text-xs">{description}</div>
      </div>
    </div>
  );
};