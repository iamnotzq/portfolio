// components/project/project-documentation.tsx
import React from "react";
import { StickyScroll, ContentItem } from "../ui/sticky-scroll-reveal";
import { DocumentationSection } from "@/lib/projects-data";

interface ProjectDocumentationProps {
    documentation: DocumentationSection[];
}

// Helper function to render content based on type
const renderContent = (item: DocumentationSection) => {
    const { type, props } = item.content;

    // This is a special case to handle the 'text' type.
    // It renders a simple styled div for plain text content.
    if (type === 'text' && props.text) {
        return (
            <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white text-2xl font-bold p-4 rounded-lg">
                {props.text}
            </div>
        );
    }

    // For other types, we assume the StickyScroll component's internal logic
    // can handle them based on the 'type' and 'props'.
    return { type, props };
};


const ProjectDocumentation = ({ documentation }: ProjectDocumentationProps) => {
  
  // We map the documentation data to the format expected by StickyScroll's ContentItem
  const content: ContentItem[] = documentation.map(docItem => ({
    title: docItem.title,
    description: docItem.description,
    content: renderContent(docItem)
  }));

  return (
    // The main section container. We control padding here to integrate the sticky header.
    <section className="w-full">
        
        <div className="sticky top-0 z-20 pt-24 ">
            <div className="text-center px-4">
                <h2 className="text-3xl sm:text-4xl font-bold text-white font-orbitron">
                    Project Documentation
                </h2>
                <p className="mt-4 text-neutral-400 text-lg max-w-2xl mx-auto">
                    Dive deeper into the technical aspects, from setup to deployment. Scroll to explore the details.
                </p>
            </div>
        </div>

       
        <div className="relative z-10 ">
            <StickyScroll content={content} />
        </div>
    </section>
  );
};

export default ProjectDocumentation;
