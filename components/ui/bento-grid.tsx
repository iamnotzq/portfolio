import { cn } from "@/lib/utils";
import React from "react";

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
        "grid w-full h-full grid-cols-2 gap-2  xl:gap-6 xl:grid-cols-5",
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
  header,
  icon,
  onClick,
  children,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  children?: React.ReactNode;
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        // CORRECTED: Ensure "row-span-1" is removed from this line.
        "group/bento shadow-input flex flex-col justify-between space-y-4 rounded-xl border border-white/[0.2] bg-neutral-900/90 p-4 transition duration-200 hover:shadow-xl backdrop-blur-md hover:bg-neutral-950/90",
        onClick && !children && "cursor-pointer hover:scale-[1.02] transition-transform",
        className
      )}
    >
      {children ? (
        children
      ) : (
        <>
          {header}
          <div className="transition duration-200 group-hover/bento:translate-x-2">
            {icon}
            <div className=" font-sans font-bold text-neutral-100 text-base sm:text-xl md:text-2xl ">
              {title}
            </div>
            <div className="font-sans text-xs sm:text-sm font-normal text-neutral-200">
              {description}
            </div>
          </div>
        </>
      )}
    </div>
  );
};