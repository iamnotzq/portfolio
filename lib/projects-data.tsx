// lib/projects-data.tsx
import {
  IconClipboardCopy,
  IconClipboardText,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
  IconChartLine,
  IconAnalyze,
  IconVaccine,
  IconPill,
  IconUsers,
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
  IconClipboardText: <IconClipboardText className="h-4 w-4 text-neutral-500" />,
  IconChartLine: <IconChartLine className="h-4 w-4 text-neutral-500" />,
  IconAnalyze: <IconAnalyze className="h-4 w-4 text-neutral-500" />,
  IconVaccine: <IconVaccine className="h-4 w-4 text-neutral-500" />,
  IconPill: <IconPill className="h-4 w-4 text-neutral-500" />,
  IconUsers: <IconUsers className="h-4 w-4 text-neutral-500" />,
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
  imageUrl?: string; // <-- ADDED: Optional image URL for the feature card header
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
  description: string | React.ReactNode;
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

const codeExample = `import React from "react";

const ProjectDocumentation = ({ documentation }: ProjectDocumentationProps) => {
  
  const content: ContentItem[] = documentation.map(docItem => ({
    title: docItem.title,
    description: docItem.description,
    content: renderContent(docItem)
  }));

  return (
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
`;
const projectPageCode = `"use client";

import React from "react";

export default function ProjectPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const [project, setProject] = useState<ProjectData | null>(null);
  
  const [loadingState, setLoadingState] = useState('loading'); // loading -> completed -> finished
  const [loadingText, setLoadingText] = useState("Entering the data stream...");

  useEffect(() => {
    // Phase 1: Initial "loading" text
    const loadingTimer = setTimeout(() => {
      const currentProject = slideData.find((p) => p.slug === params.slug);
      if (currentProject) {
        setProject(currentProject); // Set the project data
        
        // Phase 2: Switch to "completed" text
        setLoadingText("Connection established.");
        setLoadingState('completed');

        // Phase 3: Wait a moment, then finish to trigger fade-out
        const completedTimer = setTimeout(() => {
          setLoadingState('finished');
        }, 1500); // Show "completed" message for 1.5 seconds

        return () => clearTimeout(completedTimer);
      } else {
        notFound();
      }
    }, 3000); // Show "loading" message for 3 seconds

    return () => clearTimeout(loadingTimer);
  }, [params.slug]);

  const handleNavMenuClick = (id: 'about' | 'contact' | 'projects') => {
    router.push('id');
  };
`;


export const slideData: ProjectData[] = [
  {
    slug: "interactive-portfolio",
    title: "Interactive Portfolio",
    description: "A personal portfolio featuring a 3D interactive globe and scroll-based animations.",
    year: 2025,
    role: "Lead Developer",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Figma"],
    imageUrl: "/projects/portfolioWebsite/homePage.png",
    displayType: "macbook", // Set this to 'macbook' or 'mobile' for each project
    src: "/projects/portfolioWebsite/homePage.png",
    liveUrl: "#",
    githubUrl: "#",

    overview: "I believe a portfolio should be more than a static list of accomplishments; it should tell a story. With this project, I set out to create a narrative-driven journey that departs from traditional portfolio websites. The goal was to build an immersive experience that captivates visitors through interactive 3D elements and fluid animations, guiding them through my professional story. While the presentation is designed to be engaging, the core content—my projects, skills, and experiences—remains easily accessible, allowing you to dive into the details that matter most.",
    features: [
      {
          title: "Interactive 3D Globe",
          description: "A fully interactive 3D globe built with Three.js and React Three Fiber, inviting user exploration.",
          icon: "IconAnalyze",
          imageUrl: "/projects/portfolioWebsite/globe.png",
      },
      {
          title: "Scroll-Based Animations",
          description: "Leveraging Framer Motion to create smooth, scroll-triggered animations that guide the user.",
          icon: "IconChartLine",
          imageUrl: "/projects/portfolioWebsite/laptop.png",
      },
      {
          title: "Component-Based Architecture",
          description: "Built with a modular and reusable component structure in Next.js for maintainability and scalability.",
          icon: "IconTableColumn",
          imageUrl: "/projects/portfolioWebsite/laptop.png",
      },
      {
        title: "Live Code Previews",
        description: "An integrated code viewer with syntax highlighting to showcase the underlying implementation.",
        icon: "IconClipboardText",
        imageUrl: "/projects/portfolioWebsite/documentation.png",
      },
      {
          title: "Engaging UI Components",
          description: "A collection of custom-built, interactive components designed to enhance user engagement.",
          icon: "IconUsers",
          imageUrl: "/projects/portfolioWebsite/laptop.png",
      },
      {
          title: "Fully Responsive Design",
          description: "Meticulously crafted for a seamless and visually consistent experience across all devices.",
          icon: "IconSignature",
          imageUrl: "/projects/portfolioWebsite/laptop.png",
      },
    ],
    demoScreenshots: [
      {
          title: "Home Page",
          image: "/projects/portfolioWebsite/homePage.png",
          className: "absolute top-10 right-[27%] ",
      },
      {
          title: "Project Section",
          image: "/projects/portfolioWebsite/projects.png",
          className: "absolute top-80 left-[27%] rotate-[2deg]",
      },
      {
          title: "About Section",
          image: "/projects/portfolioWebsite/about.png",
          className: "absolute top-10 right-[5%] rotate-[3deg]",
      },
      {
          title: "Contact Section",
          image: "/projects/portfolioWebsite/contact.png",
          className: "absolute top-80 right-[27%] rotate-[-5deg]",
      },
      {
        title: "Main Globe View",
        image: "/projects/portfolioWebsite/globe.png",
        className: "absolute top-10 left-[27%] rotate-[-5deg]",
    },
    {
        title: "Project Page",
        image: "/projects/portfolioWebsite/laptop.png",
        className: "absolute top-80 right-[5%] rotate-[2deg]",
      },
      
      
      {
        title: "Documentation Section",
        image: "/projects/portfolioWebsite/documentation.png",
        className: "absolute top-10 left-[5%] rotate-[3deg]",
      },
      {
        title: "Learnings Section",
        image: "/projects/portfolioWebsite/learning.png",
        className: "absolute top-80 left-[5%] rotate-[-4deg]",
    },
    ],
    learnings: [
      {
          quote: "A key challenge was managing the performance of numerous animations and complex user interactions, including scroll-based triggers and pointer events. To address this, I implemented themed loading screens that not only prevent content flashing but also enhance the narrative experience.",
          name: "Optimizing Performance & User Experience",
          designation: "Performance & UX",
          src: "/projects/portfolioWebsite/loading.png",
      },
      {
          quote: "For the documentation, the goal was to present technical information without overwhelming the user. I developed a sectioned layout using custom components to showcase code snippets and visual comparisons, effectively breaking down complex topics into digestible parts.",
          name: "Crafting Clear Technical Documentation",
          designation: "Component-Driven Documentation",
          src: "/projects/portfolioWebsite/documentation.png",
      },
    ],
    documentation: [
      {
        title: "Early Conceptualization",
        description: (
          <>
            The primary goal was to create a portfolio that transcended a static
            layout, offering an{" "}
            <strong>interactive, narrative-driven experience</strong>. I aimed to
            showcase my skills in web and mobile application design through a{" "}
            <strong>captivating user journey</strong>. The initial phase involved
            conceptualizing the <strong>user flow and page structure</strong>,
            which served as the <strong>foundational blueprint</strong> for the
            site's architecture.
          </>
        ),
        content: {
          type: 'image',
          props: {
            src: "/projects/portfolioWebsite/homeFlow.png",
            className: "h-full w-full object-fit object-left-top"
          }
      }
      },{
        title: "Design & Prototyping",
        description: (
          <>
            Using Figma, I designed the{" "}
            <strong>complete user interface and experience</strong>, mapping out
            the <strong>visual flow and component interactions</strong>. The
            design process was grounded in the{" "}
            <strong>technical foundation of Next.js and React</strong>,
            leveraging my prior experience from building the Props Factory
            corporate website to ensure a{" "}
            <strong>practical and performant implementation</strong>.
          </>
        ),
        content: {
          type: 'compare',
          props: {
            firstImage: "/projects/portfolioWebsite/homeWireframe.png",
            secondImage: "/projects/portfolioWebsite/homePage.png",
            firstImageClassName: "object-cover object-center-top",
            secondImageClassName: "object-cover object-center-top",
            className: "h-full w-full rounded-lg",
            slideMode: "hover"
          }
      }
    },{
      title: "Technical Architecture",
      description: (
        <>
          The site is built on a <strong>component-based architecture</strong>{" "}
          using Next.js and React, ensuring{" "}
          <strong>modularity and future scalability</strong>. To optimize
          performance, I leveraged Next.js's capabilities for both{" "}
          <strong>client-side and server-side rendering</strong>. The codebase
          is organized into <strong>distinct sections for improved
          maintainability</strong> and cleaner code.
        </>
        ),
      
      content: {
        type: 'code',
        props: {
          language: "tsx",
          filename: "project/[slug]/page.tsx",
          code: projectPageCode,
          highlightLines: [1, 10, 11],
        }
    }
      },
      {
        title: "Core Features & UX",
        description: (
          <>
            To avoid endless scrolling, the homepage features a unique{" "}
            <strong>panel-based navigation system</strong> below the hero
            section. This design choice aligns with the site's narrative: as the
            user scrolls, they 'descend' towards the planet, revealing an{" "}
            <strong>interactive world map</strong>. From here, users can select
            a project, triggering a <strong>'data stream' transition</strong>{" "}
            into the project page. This thematic approach ensures a{" "}
            <strong>clear and engaging path</strong> to the core content, with
            each project page providing a <strong>detailed technical breakdown</strong>.
          </>
        ),
        content: {
          type: 'image',
          props: {
            src: "/projects/portfolioWebsite/map.png",
            className: "h-full w-full object-fit"
          }
      }
    },
      
      {
          title: "Deployment",
          description: (
            <>
              The portfolio is <strong>deployed and hosted on Vercel</strong>,
              chosen for its <strong>seamless integration with Next.js</strong>,{" "}
              <strong>robust CI/CD pipeline</strong>, and analytics tools. For{" "}
              <strong>proactive error monitoring and debugging</strong>, I
              integrated <strong>Sentry to track and analyze bugs</strong> and
              crashes in real-time.
            </>
          ),
          content: {
            type: 'image',
            props: {
              src: "/projects/portfolioWebsite/about.png",
              className: "h-full w-full object-fit object-left-top"
            }
        }
      },
      
    ]
  },
  {
    slug: "diabetes-management-app",
    title: "Nutriwise",
    description: "A mobile application for diabetics to manage their condition done for FYP.",
    year: 2024,
    role: "Project Leader, UI/UX Designer & Frontend Dev",
    techStack: ["React Native", "TypeScript", "JavaScript", "MongoDB", "Expo", "Figma"],
    imageUrl: "/projects/nutriwise/nutri1.png", 
    displayType: "mobile",
    src: "/projects/nutriwise/nutri1.png", 
    liveUrl: "#",
    githubUrl: "#",
 
    overview: "Nutriwise addresses the critical need for active diabetes management by providing an intuitive mobile app. Since there is no cure, empowering users with the right tools is the only viable solution. As Project Lead, I spearheaded the UI/UX design, guided the development team, architected the database, and led research and documentation to ensure the app was both effective and user-friendly.",
    features: [
      {
          title: "Effortless Food Logging",
          description: "Quickly log meals by searching our comprehensive food database or adding custom entries to track nutritional intake.",
          icon: "IconClipboardText",
          imageUrl: "/projects/nutriwise/features/foodRecording.jpg",
      },
      {
          title: "Blood Glucose Tracking",
          description: "Seamlessly record and monitor blood glucose levels to identify patterns and stay in control.",
          icon: "IconChartLine",
          imageUrl: "/projects/nutriwise/features/glucoseTracking.jpg",
      },
      {
          title: "Data-Driven Analysis",
          description: "Gain valuable insights through clear, visual summaries of your blood glucose and food intake trends.",
          icon: "IconAnalyze",
          imageUrl: "/projects/nutriwise/features/dataAnalysis.jpg",
      },{
        title: "Smart Insulin Dosing",
        description: "Receive intelligent insulin dosage recommendations based on your blood glucose readings and food intake.",
        icon: "IconVaccine",
        imageUrl: "/projects/nutriwise/features/insulinDosing.jpg",
      },{
        title: "Medication Management",
        description: "Log your insulin intake and manage your medication schedule with timely reminders.",
        icon: "IconPill",
        imageUrl: "/projects/nutriwise/features/medicationManagement.png",
      },{
        title: "Community & Events",
        description: "Connect with others, share experiences, and find local events and support groups to stay motivated on your health journey.",
        icon: "IconUsers",
        imageUrl: "/projects/nutriwise/features/communityEvents.jpg",
      }
    ],
    demoScreenshots: [
      {
          title: "Dashboard",
          image: "/projects/nutriwise/nutri2.jpg",
          className: "absolute top-10 left-[14%] rotate-[-8deg]",
      },
      {
          title: "Food Logging",
          image: "/projects/nutriwise/nutri3.jpg",
          className: "absolute top-24 left-[8%] rotate-[5deg]",
      },{
        title: "Glucose Logging",
        image: "/projects/nutriwise/nutri4.jpg",
        className: "absolute top-5 left-[41%] rotate-[-3deg]",
    },{
      title: "Food Intake Summary",
      image: "/projects/nutriwise/nutri5.jpg",
      className: "absolute top-32 left-[33%] rotate-[10deg]",
  },{
    title: "Glucose Summary",
    image: "/projects/nutriwise/nutri6.jpg",
    className: "absolute top-8 right-[16%] rotate-[4deg]",
},{
  title: "Medication Management",
  image: "/projects/nutriwise/nutri7.png",
  className: "absolute top-36 right-[8%] rotate-[-9deg]",
},{
  title: "Community Events",
  image: "/projects/nutriwise/nutri8.jpg",
  className: "absolute top-12 right-[25%]",
},{
  title: "User Profile",
  image: "/projects/nutriwise/nutri10.png",
  className: "absolute top-20 right-[33%] rotate-[-5deg]",
},{
  title: "Onboarding Flow",
  image: "/projects/nutriwise/nutri12.png",
  className: "absolute top-40 right-[40%] rotate-[4deg]",
},{
  title: "App Menu",
  image: "/projects/nutriwise/nutri16.png",
  className: "absolute top-28 left-[24%] rotate-[-2deg]",
},
    ],
    learnings: [
      {
          quote: "Mastered state management in React Native using Zustand for a performant experience.",
          name: "Efficient State Management",
          designation: "State Management",
          src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
          quote: "Learned to build complex, gesture-based interactions for mobile interfaces.",
          name: "Advanced Mobile Interactions",
          designation: "Mobile UX",
          src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
    documentation: [
      {
        title: "Early Design & Planning",
        description: (
          <>
            We began with <strong>in-depth research</strong> into diabetes, understanding that <strong>active self-management</strong> is the only viable solution. This insight shaped the app&apos;s <strong>core goals and feature set</strong>, focusing on nutritional tracking, blood glucose monitoring, and insulin management.
          </>
        ),
        content: {
          type: 'image',
          props: {
            src: "/projects/nutriwise/documentation/distributionAge.png",
            alt: "Component Library",
            className: "h-full w-full object-cover"
          }
        }
      },
      {
        title: "User-Centric Design",
        description: (
          <>
            Following a <strong>competitor analysis</strong>, we designed the app in Figma with a focus on creating a <strong>user-friendly experience</strong> for all, especially <strong>older adults</strong> who make up over 90% of diabetics. Our design prioritizes <strong>clarity, simplicity, and accessibility</strong> to ensure the app is intuitive for everyone.
          </>
        ),
        content: {
          type: 'compare',
          props: {
            firstImage: "/projects/nutriwise/documentation/figma.png",
            secondImage: "/projects/nutriwise/documentation/nutri.jpg",
            firstImageClassName: "object-cover object-left-top",
            secondImageClassName: "object-cover object-left-top",
            className: "h-full w-full rounded-lg",
            slideMode: "hover"
          }
        }
      },
      {
        title: "Frontend Overview",
        description: (
          <>
            We built the app with <strong>React Native</strong> to enable a <strong>single, cross-platform codebase</strong> for both iOS and Android. This decision improved development efficiency while delivering a native-like experience.
            <br /><br />
            The UI uses <strong>modular components</strong> optimized for <strong>older adults</strong>, incorporating <strong>high-contrast visuals</strong>, <strong>large tap targets</strong>, and <strong>readable typography</strong>. Navigation follows a <strong>linear structure</strong>, making key features like food logging and glucose tracking easily accessible without deep menus.
          </>
        ),
        content: {
          type: 'code',
          props: {
            language: "graphql",
            filename: "query.graphql",
            code: "query GetUserData($userId: ID!) {\n  user(id: $userId) {\n    name\n    email\n    accounts {\n      balance\n    }\n  }\n}",
            highlightLines: [2, 3, 4],
          }
        }
      },
      {
        title: "Backend Architecture & Logic",
        description: (
          <>
            The backend is powered by a <strong>Node.js server</strong> connected to a <strong>MongoDB database</strong>. It manages essential functions including <strong>data storage</strong>, <strong>user authentication</strong>, and <strong>analytics processing</strong>. Key operations such as food entry submissions or glucose logs are handled by clear API endpoints with proper access controls.
          </>
        ),
        content: {
          type: 'code',
          props: {
            language: "graphql",
            filename: "query.graphql",
            code: "query GetUserData($userId: ID!) {\n  user(id: $userId) {\n    name\n    email\n    accounts {\n      balance\n    }\n  }\n}",
            highlightLines: [2, 3, 4],
          }
        }
      },
      {
        title: "Scalability & Documentation",
        description: (
          <>
            To ensure scalability, we used <strong>cloud functions</strong> (e.g., Firebase Functions) to offload heavy computation like <strong>nutrition analysis</strong> and <strong>insulin recommendations</strong>. Each function acts as a <strong>microservice</strong>, triggered on demand. We supported this architecture with <strong>sequence diagrams</strong> and <strong>use case flows</strong> to map user actions to system behavior.
          </>
        ),
        content: {
          type: 'code',
          props: {
            language: "graphql",
            filename: "query.graphql",
            code: "query GetUserData($userId: ID!) {\n  user(id: $userId) {\n    name\n    email\n    accounts {\n      balance\n    }\n  }\n}",
            highlightLines: [2, 3, 4],
          }
        }
      },
      {
        title: "Authentication & Data Security",
        description: (
          <>
            To protect sensitive health data, we implemented <strong>JWT-based authentication</strong> with secure <strong>email/password login</strong>, supported by <strong>email verification</strong> and <strong>password recovery</strong> flows.
            <br /><br />
            All APIs enforce <strong>token validation</strong> and <strong>role-based access control (RBAC)</strong>. User data is <strong>encrypted at rest and in transit</strong>, and communication is secured using <strong>HTTPS</strong>. Future updates may support <strong>biometric logins</strong> or <strong>OAuth</strong> for added security and ease of use.
          </>
        ),
        content: {
          type: 'code',
          props: {
            language: "graphql",
            filename: "query.graphql",
            code: "query GetUserData($userId: ID!) {\n  user(id: $userId) {\n    name\n    email\n    accounts {\n      balance\n    }\n  }\n}",
            highlightLines: [2, 3, 4],
          }
        }
      },
      {
        title: "Database Schema Overview",
        description: (
          <>
            The database design includes <strong>five core collections</strong>: Users, Food Entries, Glucose Logs, Medication, and Analytics. This structure supports all primary app functions—tracking meals, logging health data, and generating insights. <br/><br/>  Collections are <strong>linked via references</strong> (e.g., <code>userId</code>), enabling efficient <strong>aggregation and filtering</strong>. This setup supports <strong>fast lookups</strong> of historical logs and powers <strong>personalized feedback</strong> like glucose trends and diet impact, all while ensuring <strong>scalability</strong> as data grows.
     
          </>
        ),
        content: {
          type: 'code',
          props: {
            language: "graphql",
            filename: "query.graphql",
            code: "query GetUserData($userId: ID!) {\n  user(id: $userId) {\n    name\n    email\n    accounts {\n      balance\n    }\n  }\n}",
            highlightLines: [2, 3, 4],
          }
        }
      },
      
    ]
  },
];
