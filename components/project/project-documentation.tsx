// components/project/project-documentation.tsx
import React from "react";
import { StickyScroll, ContentItem } from "../ui/sticky-scroll-reveal";
import { DocumentationSection } from "@/lib/projects-data";

interface ProjectDocumentationProps {
    documentation: DocumentationSection[];
    // The 'displayType' prop is no longer needed as dimensions are data-driven.
}

// Define potential prop types for content items.
// This helps TypeScript understand the possible shapes of `props`.
interface TextProps {
    text: string;
}

// Helper function to render content based on type
const renderContent = (item: DocumentationSection): ContentItem['content'] => {
    const { type, props } = item.content;

    // This is a special case to handle a simple 'text' prop.
    // We use a type guard ('in' operator) to check for the 'text' property's existence.
    // This safely narrows the type of `props`.
    if ('text' in props) {
        // After the check, we perform a safer type assertion by first casting to 'unknown'.
        // This satisfies TypeScript's stricter type checking rules.
        const textProps = props as unknown as TextProps;
        return {
            type: 'custom',
            props: {
                content: (
                    <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white text-2xl font-bold p-4 rounded-lg">
                        {textProps.text}
                    </div>
                )
            }
        };
    }

    // For other types, we pass them through directly.
    // We assert the type to match what StickyScroll expects.
    return { type, props } as ContentItem['content'];
};


const ProjectDocumentation = ({ documentation }: ProjectDocumentationProps) => {
  
  // We map the documentation data to the format expected by StickyScroll's ContentItem,
  // now including the optional width and height properties.
  const content: ContentItem[] = documentation.map(docItem => ({
    title: docItem.title,
    description: docItem.description,
    width: docItem.width,
    height: docItem.height,
    content: renderContent(docItem)
  }));

  return (
    // The main section container. We control padding here to integrate the sticky header.
    <section className="w-full">
        
        <div className="lg:sticky top-0 z-20 pt-24 ">
            <div className="text-center px-4">
                <h2 className="text-2xl sm:text-4xl font-bold text-white font-orbitron">
                    Project Documentation
                </h2>
                <p className="mt-4 text-neutral-400 md:text-xl text-base max-w-2xl mx-auto">
                    Dive deeper into the technical aspects, from setup to deployment. Scroll to explore the details.
                </p>
            </div>
        </div>

       
        <div className="relative z-10 ">
            {/* The displayType prop has been removed from StickyScroll */}
            <StickyScroll content={content} />
        </div>
    </section>
  );
};

export default ProjectDocumentation;
