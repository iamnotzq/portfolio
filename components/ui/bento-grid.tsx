import { cn } from "@/lib/utils";

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
        "mx-auto grid max-w-7xl grid-cols-1 gap-6 md:auto-rows-[20rem] md:grid-cols-2",
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
  onClick, // <-- Added onClick prop
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void; // <-- Added type for onClick
}) => {
  return (
    <div
      onClick={onClick} // <-- Applied onClick handler
      className={cn(
        // --- Style Changes ---
        // 1. `bg-black/30`: Darker translucent background to make the map more visible.
        // 2. `hover:bg-black/50`: Darkens the item on hover for better feedback.
        "group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-white/[0.2] bg-white/10 p-4 transition duration-200 hover:shadow-xl backdrop-blur-md hover:bg-black/30",
        // Add cursor-pointer and a subtle scale effect on hover for clickable items
        onClick && "cursor-pointer hover:scale-[1.02] transition-transform", 
        className
      )}
    >
      {/* The header is rendered here. We will pass an empty one from Menu.tsx */}
      {header}
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        {icon}
        {/* --- Text Style Changes ---
            1. `text-2xl`: Larger font size for the title.
            2. `text-sm`: Slightly larger font size for the description. */}
        <div className="mt-2 mb-2 font-sans font-bold text-neutral-300 text-2xl">
          {title}
        </div>
        <div className="font-sans text-sm font-normal text-neutral-200">
          {description}
        </div>
      </div>
    </div>
  );
};
