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
          imageUrl: "https://images.unsplash.com/photo-1614726365902-1413815a5a68?q=80&w=800&auto=format&fit=crop",
      },
      {
          title: "Scroll-Based Animations",
          description: "Leveraging Framer Motion to create smooth, scroll-triggered animations.",
          icon: "IconFileBroken",
          imageUrl: "https://images.unsplash.com/photo-1554189097-c48cf332c449?q=80&w=800&auto=format&fit=crop",
      },
      {
          title: "Component-Based Architecture",
          description: "Built with a modular and reusable component structure in Next.js.",
          icon: "IconSignature",
          // No imageUrl here, so it will fall back to the skeleton
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
    slug: "diabetes-management-app",
    title: "Nutriwise",
    description: "A mobile application for diabetics to manage their condition.",
    year: 2024,
    role: "Project Leader, UI/UX Designer & Frontend Dev",
    techStack: ["React Native", "TypeScript", "JavaScript", "MongoDB", "Expo"],
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
            The database design includes <strong>five core collections</strong>: Users, Food Entries, Glucose Logs, Medication, and Analytics. This structure supports all primary app functions—tracking meals, logging health data, and generating insights.
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
        title: "Schema Relationships & Performance",
        description: (
          <>
            Collections are <strong>linked via references</strong> (e.g., <code>userId</code>), enabling efficient <strong>aggregation and filtering</strong>. This setup supports <strong>fast lookups</strong> of historical logs and powers <strong>personalized feedback</strong> like glucose trends and diet impact, all while ensuring <strong>scalability</strong> as data grows.
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
      }
    ]
  },
];
