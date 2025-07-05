// components/project/project-footer.tsx
import Link from "next/link";

export const ProjectFooter = () => {
  return (
    <footer className="mt-20 text-center border-t border-neutral-800 pt-8">
      <Link href="/#menu" className="text-sky-400 hover:text-sky-200 transition-colors text-lg">
        &larr; Back to All Projects
      </Link>
    </footer>
  );
};
