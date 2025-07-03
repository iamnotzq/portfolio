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
        "grid w-full h-full grid-cols-1 gap-6 md:grid-cols-3",
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
  children, // MODIFIED: Added children prop
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  children?: React.ReactNode; // MODIFIED: Added children to props type
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-white/[0.2] bg-neutral-900/70 p-4 transition duration-200 hover:shadow-xl backdrop-blur-md hover:bg-neutral-950/80",
        // MODIFIED: Clicks are handled differently if item is expanded (has children)
        onClick && !children && "cursor-pointer hover:scale-[1.02] transition-transform",
        className
      )}
    >
      {/* MODIFIED: If children are provided, render them. Otherwise, render the default content. */}
      {children ? (
        children
      ) : (
        <>
          {header}
          <div className="transition duration-200 group-hover/bento:translate-x-2">
            {icon}
            <div className="mt-2 mb-2 font-sans font-bold text-neutral-100 text-2xl">
              {title}
            </div>
            <div className="font-sans text-sm font-normal text-neutral-200">
              {description}
            </div>
          </div>
        </>
      )}
    </div>
  );
};