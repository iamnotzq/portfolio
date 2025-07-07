// lib/projects-data.ts

export interface Feature {
  title: string;
  description: string;
  image: string;
}

export interface Demo {
    type: 'video' | 'iframe';
    src: string;
}

// The main data structure for projects
export interface ProjectData {
  slug: string;
  title: string;
  description: string; // Short description for cards
  year: number;
  role: string;
  techStack: string[];
  imageUrl: string; // Main image for cards and hero
  src: string; // Image for the 3D card component
  liveUrl: string;
  githubUrl: string;
  // New detailed fields for the project page
  overview: string;
  features: Feature[];
  demo: Demo;
  learnings: string[];
}

export const slideData: ProjectData[] = [
    {
      slug: "interactive-portfolio",
      title: "Interactive Portfolio",
      description: "A personal portfolio featuring a 3D interactive globe and scroll-based animations.",
      year: 2024,
      role: "Lead Developer",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"],
      imageUrl: "/props-factory-website-screenshot.png",
      src: "/props-factory-website-screenshot.png",
      liveUrl: "#www.propsfactory.com.sg",
      githubUrl: "#",
      overview: "This project was an opportunity to explore modern web technologies and create a deeply engaging user experience. The goal was to build more than just a static page, but an interactive journey that showcases my skills in frontend development, animation, and 3D graphics. The entire site is designed to be fluid and responsive, providing a seamless experience on all devices.",
      features: [
        {
            title: "Interactive 3D Globe",
            description: "A fully interactive 3D globe built with Three.js and React Three Fiber, serving as the central navigation element.",
            image: "https://images.unsplash.com/photo-1614726365902-1413815a5a68?q=80&w=800&auto=format&fit=crop"
        },
        {
            title: "Scroll-Based Animations",
            description: "Leveraging Framer Motion to create smooth, scroll-triggered animations that guide the user through the content.",
            image: "https://images.unsplash.com/photo-1554189097-c48cf332c449?q=80&w=800&auto=format&fit=crop"
        },
        {
            title: "Component-Based Architecture",
            description: "Built with a modular and reusable component structure in Next.js for maintainability and scalability.",
            image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?q=80&w=800&auto=format&fit=crop"
        }
      ],
      demo: {
        type: 'video',
        src: "https://www.w3schools.com/html/mov_bbb.mp4" // Placeholder video
      },
      learnings: [
        "Deepened my understanding of state management in complex React applications.",
        "Gained proficiency in 3D rendering and animation with Three.js.",
        "Mastered advanced animation techniques using Framer Motion's scroll and transform hooks.",
        "Improved my skills in creating responsive layouts with Tailwind CSS for a variety of screen sizes."
      ]
    },
    // You can add more project objects here following the same structure
];
