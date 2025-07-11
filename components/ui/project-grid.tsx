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
        // I've slightly increased the row height to better suit the new proportions
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[22rem] md:grid-cols-3",
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
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        // The main card is a flex container that distributes space between the header and content
        "group/bento shadow-input row-span-1 flex flex-col justify-between rounded-xl border border-white/[0.2] bg-black p-4 transition duration-200 hover:shadow-xl shadow-none",
        className
      )}
    >
      {/* The header container now takes up a fixed 60% of the card's height */}
      <div className="h-3/5 w-full overflow-hidden rounded-xl">
        {header}
      </div>
      {/* The content container takes the remaining 40% of the card's height */}
      <div className="flex h-2/5 flex-col justify-start pt-4 transition duration-200 group-hover/bento:translate-x-2">
        {icon}
        <div className="mt-2 mb-2 font-sans text-md font-bold text-neutral-200">
          {title}
        </div>
        {/* The description will grow to fill the available space and become scrollable if it overflows */}
        <div className="flex-grow font-sans text-sm font-normal text-neutral-300 ">
          {description}
        </div>
      </div>
    </div>
  );
};
