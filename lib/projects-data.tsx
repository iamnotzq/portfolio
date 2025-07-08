// lib/projects-data.tsx
import {
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import React from "react";

/**
* You can add or remove icons here and reference them by name in the project data.
* This makes it easy to manage icons without touching the component code.
*/
export const ICONS: { [key: string]: React.ReactNode } = {
  IconClipboardCopy: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  IconFileBroken: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  IconSignature: <IconSignature className="h-4 w-4 text-neutral-500" />,
  IconTableColumn: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
};

// A reusable skeleton component for feature cards
export const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);


// For project-features.tsx (Bento Grid)
export interface Feature {
  title: string;
  description: string;
  icon: string; // Use a key from the ICONS object
  className?: string;
}

// For project-demo.tsx (Draggable Cards)
export interface DemoScreenshot {
  title: string;
  image: string;
  className: string;
}

// For project-learnings.tsx (Animated Testimonials)
export interface Learning {
  quote: string;
  name: string;
  designation: string;
  src: string;
}

/**
* Defines the structure for a documentation section in the StickyScroll component.
* The `content` property can be one of four types:
* - 'image': Displays a single image.
* - 'code': Displays a formatted code block with syntax highlighting.
* - 'compare': Displays a before-and-after image comparison slider.
* - 'custom': Renders any custom JSX content.
*/
export interface DocumentationSection {
  title: string;
  description: string;
  content: {
      type: 'image' | 'code' | 'compare' | 'custom';
      props: any;
  };
}

// The main data structure for projects
export interface ProjectData {
  slug: string;
  title: string;
  description: string;
  year: number;
  role: string;
  techStack: string[];
  imageUrl: string;
  displayType: 'macbook' | 'mobile'; // New property to control the view
  src: string;
  liveUrl: string;
  githubUrl: string;

  // Detailed data for project page
  overview: string;
  features: Feature[];
  demoScreenshots: DemoScreenshot[];
  learnings: Learning[];
  documentation: DocumentationSection[];
}

// Example code snippet for the 'code' documentation type
const codeExample = `import React from "react";

const MyComponent = () => {
return (
  <div className="p-4 bg-gray-800 rounded-lg">
    <h1 className="text-2xl font-bold text-white">Hello, World!</h1>
    <p className="text-gray-300">This is a sample component.</p>
  </div>
);
};

export default MyComponent;`;


export const slideData: ProjectData[] = [
  {
    slug: "interactive-portfolio",
    title: "Interactive Portfolio",
    description: "A personal portfolio featuring a 3D interactive globe and scroll-based animations.",
    year: 2024,
    role: "Lead Developer",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"],
    imageUrl: "/props-factory-website-screenshot.png",
    displayType: "macbook", // Set this to 'macbook' or 'mobile' for each project
    src: "/props-factory-website-screenshot.png",
    liveUrl: "#",
    githubUrl: "#",
    overview: "This project was an opportunity to explore modern web technologies and create a deeply engaging user experience. The goal was to build more than just a static page, but an interactive journey that showcases my skills in frontend development, animation, and 3D graphics. The entire site is designed to be fluid and responsive, providing a seamless experience on all devices.",
    features: [
      {
          title: "Interactive 3D Globe",
          description: "A fully interactive 3D globe built with Three.js and React Three Fiber.",
          icon: "IconClipboardCopy",
          className: "lg:col-span-2",
      },
      {
          title: "Scroll-Based Animations",
          description: "Leveraging Framer Motion to create smooth, scroll-triggered animations.",
          icon: "IconFileBroken",
      },
      {
          title: "Component-Based Architecture",
          description: "Built with a modular and reusable component structure in Next.js.",
          icon: "IconSignature",
      },
    ],
    demoScreenshots: [
      {
          title: "Main Globe View",
          image: "https://images.unsplash.com/photo-1614726365902-1413815a5a68?q=80&w=800&auto=format&fit=crop",
          className: "absolute top-10 left-[20%] rotate-[-5deg]",
      },
      {
          title: "Project Section",
          image: "https://images.unsplash.com/photo-1554189097-c48cf332c449?q=80&w=800&auto=format&fit=crop",
          className: "absolute top-40 left-[25%] rotate-[-7deg]",
      },
    ],
    learnings: [
      {
          quote: "Deepened my understanding of state management in complex React applications.",
          name: "Key Takeaway 1",
          designation: "State Management",
          src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
          quote: "Gained proficiency in 3D rendering and animation with Three.js and React Three Fiber.",
          name: "Key Takeaway 2",
          designation: "3D Graphics",
          src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
    documentation: [
      {
          title: "Version Control with Code View",
          description: "Never stress about version control again. View your code in clear, highlighted blocks.",
          content: {
              type: 'code',
              props: {
                language: "tsx",
                filename: "MyComponent.tsx",
                code: codeExample,
                highlightLines: [4, 5, 6],
              }
          }
      },
      {
          title: "Visually Compare Changes",
          description: "Track every modification in real time. Use the visual compare tool to see differences between versions instantly.",
          content: {
              type: 'compare',
              props: {
                firstImage: "https://assets.aceternity.com/code-problem.png",
                secondImage: "https://assets.aceternity.com/code-solution.png",
                firstImageClassName: "object-cover object-left-top",
                secondImageClassName: "object-cover object-left-top",
                className: "h-full w-full rounded-lg",
                slideMode: "hover"
              }
          }
      },
      {
          title: "Display Any Content",
          description: "Our platform is flexible. You can display images, custom components, or anything you need to get your point across.",
          content: {
              type: 'image',
              props: {
                src: "https://placehold.co/800x600/1F2937/FFFFFF?text=Any+Image",
                alt: "Placeholder Image",
                className: "h-full w-full object-cover"
              }
          }
      },
      {
          title: "Collaborative Editing",
          description: "Work together in real time with your team. Our platform streamlines your workflow and increases productivity.",
          content: {
              type: 'custom',
              props: {
                content: (
                    <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white text-2xl font-bold">
                    Collaborative Editing
                    </div>
                )
              }
          }
      },
    ]
  },
  {
    slug: "mobile-finance-app",
    title: "Mobile Finance App",
    description: "A sleek and intuitive mobile application for personal finance tracking.",
    year: 2023,
    role: "UI/UX Designer & Frontend Dev",
    techStack: ["React Native", "TypeScript", "GraphQL", "Jest"],
    imageUrl: "/mobile.jpg", // Make sure this image exists in your /public folder
    displayType: "mobile",
    src: "/mobile.jpg", // Make sure this image exists in your /public folder
    liveUrl: "#",
    githubUrl: "#",
    overview: "This project focused on creating a user-friendly mobile app to help users manage their finances. The main challenge was to present complex financial data in a simple and visually appealing way. I was responsible for the entire UI/UX design process, from wireframing to final implementation in React Native.",
    features: [
      {
          title: "Real-time Expense Tracking",
          description: "Instantly categorize and track spending as it happens.",
          icon: "IconClipboardCopy",
          className: "lg:col-span-2",
      },
      {
          title: "Budgeting Tools",
          description: "Set monthly budgets and receive alerts to stay on track.",
          icon: "IconSignature",
      },
      {
          title: "Investment Portfolio",
          description: "A clear overview of investments and their performance.",
          icon: "IconTableColumn",
      },
    ],
    demoScreenshots: [
      {
          title: "Dashboard",
          image: "https://images.unsplash.com/photo-1587614203976-365c7d669a87?q=80&w=800&auto=format&fit=crop",
          className: "absolute top-10 left-[20%] rotate-[-5deg]",
      },
      {
          title: "Transaction List",
          image: "https://images.unsplash.com/photo-1587613864426-54b38343e7a3?q=80&w=800&auto=format&fit=crop",
          className: "absolute top-40 left-[25%] rotate-[-7deg]",
      },
    ],
    learnings: [
      {
          quote: "Mastered state management in React Native using Zustand for a performant experience.",
          name: "Key Takeaway 1",
          designation: "State Management",
          src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
          quote: "Learned to build complex, gesture-based interactions for mobile interfaces.",
          name: "Key Takeaway 2",
          designation: "Mobile UX",
          src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
    documentation: [
      {
          title: "Component Library",
          description: "A comprehensive library of reusable React Native components was built for this project.",
          content: {
              type: 'image',
              props: {
                src: "https://placehold.co/800x600/1F2937/FFFFFF?text=Component+Library",
                alt: "Component Library",
                className: "h-full w-full object-cover"
              }
          }
      },
      {
          title: "API Integration",
          description: "Documentation for integrating with the GraphQL backend.",
          content: {
              type: 'code',
              props: {
                language: "graphql",
                filename: "query.graphql",
                code: `query GetUserData($userId: ID!) {\n  user(id: $userId) {\n    name\n    email\n    accounts {\n      balance\n    }\n  }\n}`,
                highlightLines: [2, 3, 4],
              }
          }
      },
    ]
  },
];
