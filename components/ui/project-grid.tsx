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
        // On small screens, it's a single column.
        // On medium screens (md), we use a 2-column grid.
        // On large screens (lg), it becomes a 3-column grid.
        // The row height adapts to the content in each row.
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3",
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
        // The main card is a flex container that allows content to grow.
        // Using `gap-4` provides consistent spacing between header and content.
        "group/bento shadow-input row-span-1 flex flex-col gap-4 rounded-xl border border-white/[0.2] bg-black p-4 transition duration-200 hover:shadow-xl",
        className
      )}
    >
      {/* The header container now has a fixed height to ensure consistency. */}
      <div className="w-full h-50 overflow-hidden rounded-xl">
        {header}
      </div>
      {/* The content container now grows freely to accommodate its content. */}
      {/* `flex-grow` allows it to fill the remaining space in taller grid items. */}
      <div className="flex flex-grow flex-col justify-start transition duration-200 group-hover/bento:translate-x-2">
        {icon}
        <div className="mt-2 mb-2 font-sans text-base lg:text-lg font-bold text-neutral-200">
          {title}
        </div>
        <div className="font-sans text-sm font-normal text-neutral-300">
          {description}
        </div>
      </div>
    </div>
  );
};
