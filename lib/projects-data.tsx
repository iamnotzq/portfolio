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
  width?: string; // Optional: custom width for the content (e.g., '40rem')
  height?: string; // Optional: custom height for the content (e.g., '30rem')
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
    slug: "workforce-management-app",
  title: "Workforce Management App",
  description: "A custom-built mobile application for Props Factory to streamline workforce operations such as attendance tracking, payslip management, and project coordination.",
  year: 2025,
  role: "Full-Stack Developer & Product Designer",
  techStack: [
    "React Native (Expo)",
    "EmailJS",
    "Figma",
    
    
    "Supabase (PostgreSQL)",
    "Firebase Authentication",
    
    "Google Cloud Functions",
    
    "JavaScript",
  ],
  imageUrl: "/projects/workforceApp/homePage.jpg",
  displayType: "mobile",
  src: "/projects/workforceApp/features/thumbnail.jpg",
  liveUrl: "#",
  githubUrl: "#",
  
  overview: "I independently designed, developed, and deployed this mobile app to support day-to-day workforce operations at Props Factory. The app empowers staff to securely check in and out of work, view and download their payslips, submit claims and overtime, access their personal profiles and certifications, receive mobile notifications, and stay informed on ongoing project assignments. The system is fully integrated with a Supabase database and serverless functions via Google Cloud.",
  
  features: [
    {
      title: "Check-In & Check-Out System",
      description: "Enables employees to log their attendance via a location-aware and timestamped interface, ensuring accurate tracking of work hours.",
      icon: "IconClipboardText",
      imageUrl: "/projects/workforceApp/features/checkIn.jpg",
    },
    {
      title: "Payslip & Overtime Calculations",
      description: "Automated payroll calculations including overtime, allowances, and deductions, with secure access to digital payslips.",
      icon: "IconChartLine",
      imageUrl: "/projects/workforceApp/features/payslip.jpg",
    },
    {
      title: "Facial Recognition Integration",
      description: "Integrated face recognition during check-in for added verification and improved accountability.",
      icon: "IconAnalyze",
      imageUrl: "/projects/workforceApp/homePage.jpg",
    },
    {
      title: "Employee Profile Management",
      description: "Staff can view and update their personal data, certifications, employment history, and role details through an intuitive interface.",
      icon: "IconVaccine",
      imageUrl: "/projects/workforceApp/features/profile.jpg",
    },
    {
      title: "Real-Time Push Notifications",
      description: "Utilized Firebase to send targeted alerts and reminders to employees for updates, check-in deadlines, or administrative actions.",
      icon: "IconPill",
      imageUrl: "/projects/workforceApp/features/notification.jpg",
    },
    {
      title: "Project & Team Assignment View",
      description: "Provides visibility into ongoing projects, assigned team members, and project timelines to keep staff informed and aligned.",
      icon: "IconUsers",
      imageUrl: "/projects/workforceApp/features/project.jpg",
      }
    ],
    demoScreenshots: [
      {
          title: "Dashboard",
          image: "/projects/workforceApp/dashboard.jpg",
          className: "absolute top-10 left-[17%] rotate-[10deg]",
      },
      {
          title: "Calendar",
          image: "/projects/workforceApp/calendar.jpg",
          className: "absolute top-24 left-[8%] rotate-[3deg]",
      },{
        title: "Certificates",
        image: "/projects/workforceApp/certificates.jpg",
        className: "absolute top-8 left-[42%] ",
    },{
      title: "History",
      image: "/projects/workforceApp/history.jpg",
      className: "absolute top-20 left-[33%] rotate-[-7deg]",
  },{
    title: "Home Page",
    image: "/projects/workforceApp/homePage.jpg",
    className: "absolute top-10 right-[16%] rotate-[4deg]",
},{
  title: "Payslip",
  image: "/projects/workforceApp/payslip.jpg",
  className: "absolute top-36 right-[8%] rotate-[-4deg]",
},{
  title: "Requests",
  image: "/projects/workforceApp/requests.jpg",
  className: "absolute top-12 right-[25%] rotate-[-3deg]",
},{
  title: "Projects",
  image: "/projects/workforceApp/projects.jpg",
  className: "absolute top-18 right-[32%] rotate-[3deg]",
},{
  title: "Timeline",
  image: "/projects/workforceApp/timeline.jpg",
  className: "absolute top-32 right-[40%] rotate-[-4deg]",
},{
  title: "Notification",
  image: "/projects/workforceApp/notification.jpg",
  className: "absolute top-28 left-[24%] rotate-[-1deg]",
},
    ],
    learnings: [
      {
        quote:
          "Despite designing with clear logic and conducting my own QA, I learned first-hand how crucial real-world user testing is—especially for non-technical users. Some actions I thought were intuitive turned out to be confusing for workers with less digital experience. Observing users helped me simplify flows, clarify layouts, and build in guardrails for easier navigation.",
        name: "The Importance of Real-World Testing",
        designation: "User Research & Feedback",
        src: "/projects/workforceApp/homePage.jpg"
      },
      {
        quote:
          "This project pushed me to deeply explore cloud functions, scheduled tasks, and how to move heavy logic server-side to reduce app load. From calculating payslip summaries to auto-updating request statuses, I built scalable backend logic that interacted seamlessly with our UI and notification system.",
        name: "Backend-First Thinking",
        designation: "Cloud Functions & Server Logic",
        src: "/projects/workforceApp/notification.jpg"
      },
      {
        quote:
          "Wearing two hats—developer and assistant project manager—gave me a rare opportunity to gather feedback directly from both ground workers and admins. This helped me make better decisions, from defining user roles and permissions to designing workflows that reflected real-world needs and minimized friction.",
        name: "Bridging Tech and Operations",
        designation: "Cross-Disciplinary Insight",
        src: "/projects/workforceApp/projects.jpg"
      }
    ],
    documentation: [
      {
        title: "Early Conceptualization & Research",
        description: (
          <>
            I was tasked with designing a mobile application to completely replace manual processes for staff check-in/out and streamline payroll workflows, including base pay, overtime, allowances, and deductions. As development progressed, I expanded the app to support auxiliary features such as leave, off-day, and claim submissions. Recognizing the need for operational oversight, I later built an admin version of the app for supervisors to review and manage staff requests. Additionally, I introduced a project management module to help coordinate manpower assignments for events — providing visibility into ongoing projects and task allocations.
          </>
        ),
        content: {
          type: 'image',
          props: {
            src: "/projects/workforceApp/documentation/flow.png",
            alt: "Initial Planning",
            className: "h-full w-full object-contain"
          }
        },
        width: "46rem",
        height: "18rem"
      },
      {
        title: "User-Centered Design & UX Planning",
        description: (
          <>
            Many of our workers were older and from overseas, so I prioritized accessibility and simplicity. I designed a clean and intuitive layout, ensuring key tasks like check-in, claims, and payslip access were just one or two taps away. Given our event-based nature, I also factored in irregular work hours and built a flexible, configurable pay calculation system. All wireframes and logic diagrams were presented to stakeholders via Figma for early feedback.
          </>
        ),
        content: {
          type: 'compare',
          props: {
            firstImage: "/projects/workforceApp/documentation/wireframe.png",
            secondImage: "/projects/workforceApp/documentation/homepage.jpg",
            firstImageClassName: "object-cover ",
            secondImageClassName: "object-cover ",
            className: "h-full w-full rounded-lg",
            slideMode: "hover"
          },
          
        },
        width: "15rem",
        height: "35rem"
      },
      {
        title: "Tech Architecture & Backend Setup",
        description: (
          <>
            Based on the company's preference to leverage Google's ecosystem, I used Firebase for authentication, cloud functions, and storage. For more complex relational data needs, I integrated Supabase (PostgreSQL) — enabling structured schemas and triggers. I made heavy use of Supabase RPC (Remote Procedure Calls) and edge functions to shift complex calculations and business logic (e.g., payroll, request validation) to the backend. This approach kept the mobile app lightweight and performant, while ensuring centralized, secure processing of core operations.
          </>
        ),
        content: {
          type: 'code',
          props: {
            language: "sql",
            filename: "get_checkin_data.sql",
            code: `BEGIN
  RETURN QUERY
  SELECT
    v.unique_id,
    v."userId",
    v.username,
    v.checkin_location,
    v."checkInTimestamp",
    v."checkOutTimestamp",
    v."locationName",
    v."hasLunch",
    v."hasDinner",
    v.date,
    v.month,
    v.year,
    v.day_of_week,
    v.is_public_holiday,
    v."verificationPhotoUrl",
    v."canUpdate",
    v.duration,
    v.ot_hours,
    v.unfulfilled_work_minutes,
    v.scheduled_start
  FROM public.checkinout_calculated v
  WHERE
    -- Filter by user ID only if p_user_id is provided (not NULL)
    (p_user_id IS NULL OR v."userId" = p_user_id)
    -- Always filter by month and year
    AND v.month = p_month
    AND v.year = p_year
    -- Filter by date only if p_date is provided (not NULL)
    AND (p_date IS NULL OR v.date = p_date)
    -- Ensure both check-in and check-out timestamps exist
    AND v."checkInTimestamp" IS NOT NULL
  
  ORDER BY
    -- Adjust ordering based on whether user_id is provided
    CASE WHEN p_user_id IS NOT NULL THEN v.date END DESC, -- Order by date if specific user
    v."userId" ASC, -- Then by user ID if fetching for all users
    v."checkInTimestamp" DESC; -- Finally by check-in time
END;`,
          }
        }
      },
      {
        title: "Core Features & Logic",
        description: (
          <>
            The central feature is a GPS-based check-in/out system paired with facial recognition. To prevent abuse, the app enforces a location radius and verifies face presence — though we kept rules slightly lenient to avoid worker discomfort. I also designed a three-tier request system (Pending → Approved/Rejected) for claims, leave, and off-days. For payroll, I implemented logic to dynamically calculate monthly OT pay based on working days, weekends, and public holidays.
          </>
        ),
        content: {
          type: 'image',
          props: {
            src: "/projects/workforceApp/documentation/payslip.jpg",
            alt: "Admin Tools",
            className: "h-full w-full object-cover"
          }
        },
        width: "16rem",
        height: "34rem"
      },
      {
        title: "Admin Dashboard & Project Tools",
        description: (
          <>
            I developed a robust admin-facing app alongside the worker version. It includes a clean dashboard showing worker logs, a management system to approve or reject submissions, and tools to manage project timelines and expenses. The calendar view shows all project overlaps, while a drill-down list shows task progression and upcoming milestones. Admins can also create and assign tasks, attach documents like floorplans, and record project-specific expenses. All data was centralized in Google Cloud Storage for easy access.
          </>
        ),
        content: {
          type: 'image',
          props: {
            src: "/projects/workforceApp/documentation/dashboard.jpg",
            alt: "Admin Tools",
            className: "h-full w-full object-cover"
          }
        },
        width: "16rem",
        height: "34rem"
      },
      {
        title: "Facial Detection & Role Access",
        description: (
          <>
            Facial validation was implemented using <code>react-native-vision-camera</code> with a face detector plugin to ensure a real face was present during check-in. Photos were stored daily on Google Cloud for admin verification. Users were segmented via role-based logic using an <code>isAdmin</code> flag and project-user relationship tables. Row-Level Security (RLS) in Supabase ensured appropriate data filtering without custom policy bloat.
          </>
        ),
        content: {
          type: 'code',
          props: {
            language: "tsx",
            filename: "CameraVerificationModal.tsx",
            code: `// CameraVerificationModal.jsx
import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react'
import { View, StyleSheet, Alert, Text, Platform } from 'react-native'
import {
  Modal,
  Portal,
  useTheme,
  IconButton,
  ActivityIndicator,
  Icon,
  Button as PaperButton,
} from 'react-native-paper'

// --- Vision Camera Imports ---
import {
  Camera,
  useCameraDevice,
  useFrameProcessor,
} from 'react-native-vision-camera'
import { useFaceDetector } from 'react-native-vision-camera-face-detector'
import { Worklets } from 'react-native-worklets-core'

// --- Constants for Auto-Capture ---
const COUNTDOWN_SECONDS = 1 // A longer countdown for user readiness
const YAW_ANGLE_THRESHOLD = 25 // Relaxed: Allows for more head turn
const PITCH_ROLL_ANGLE_THRESHOLD = 25 // Relaxed: Allows for more head tilt
const MIN_FACE_SIZE = 0.3 // Relaxed: Face can be further from the camera
const EYE_OPEN_PROBABILITY_THRESHOLD = 0.4 // Relaxed: Less strict on eye-opening
const STABILITY_COUNTER_MAX = 15 // The max value for our stability counter
const STABILITY_LOCK_THRESHOLD = 5 // Lower threshold for a faster lock
const STABILITY_UNLOCK_THRESHOLD = 2 // Lower threshold to prevent losing lock easily
const DETECTION_TIMEOUT_SECONDS = 30 // A longer timeout for the verification process`
     }
        }
      },
      {
        title: "Notifications, Request Tracking & Feedback Loop",
        description: (
          <>
            I used Firebase Cloud Messaging (FCM) for real-time push notifications regarding request approvals or rejections. Workers could easily track their request history and see full state transitions, including who approved it, any notes, and attached files like receipts or payment proofs. I ran multiple field feedback sessions to test navigation, and small UI refinements were made for accessibility and ease of use — especially across different age groups and font settings.
          </>
        ),
        content: {
          type: 'code',
          props: {
            language: "js",
            filename: "index.js",
            code: `// functions/index.js
async function sendPushNotifications(pushTokens, title, body, data = {}) {
    const messages = [];
    const validTokens = [];
    // Filter out invalid tokens
    for (const pushToken of pushTokens) {
        if (!Expo.isExpoPushToken(pushToken)) {
            logger.warn('Push token \${pushToken} is not a valid Expo push token');
        } else {
            validTokens.push(pushToken);
        }
    }
    // Create messages for valid tokens
    for (const pushToken of validTokens) {
        messages.push({
            to: pushToken,
            sound: 'default',
            title: title,
            body: body,
            data: data, // Pass additional data if needed
            channelId: 'default', // Ensure channel exists on Android 8.0+
        });
    }
    // Chunk and send notifications
    const chunks = expo.chunkPushNotifications(messages);
    logger.info('Sending \${messages.length} notifications in \${chunks.length} chunks.');
    for (const chunk of chunks) {
        try {
            const tickets = await expo.sendPushNotificationsAsync(chunk);
            logger.log("Sent chunk, tickets received:", tickets);
            tickets.forEach((ticket, index) => {
                if (ticket.status === 'error') {
                    logger.error('Error sending notification to token \${chunk[index].to}: \${ticket.message}', ticket.details);
                }
            });
        } catch (error) {
            logger.error('Error sending push notification chunk:', error);
        }
    }
}`
     }
        }
      },
      {
        title: "UX Challenges & Iterative Improvements",
        description: (
          <>
            One key challenge was presenting time-based data (e.g., shift start/end) compactly. I eventually drew inspiration from flight-tracking apps to visually represent time intervals. Another real-world case revealed a worker checking in without showing their face — prompting me to integrate facial detection, ensuring images had valid human faces before submission. These real-world test cases shaped app policies and improved overall system reliability.
          </>
        ),
        content: {
          type: 'image',
          props: {
            src: "/projects/workforceApp/documentation/history.jpg",
            alt: "Admin Tools",
            className: "h-full w-full object-cover"
          }
        },
        width: "16rem",
        height: "34rem"
      },
      {
        title: "Testing & Real-World Optimization",
        description: (
          <>
            I conducted usability testing with actual workers to ensure the app was intuitive across all age groups. One issue discovered was oversized text on certain devices due to user font settings — breaking layouts. I updated my styles to dynamically respond to font scaling and screen dimensions. These hands-on tests helped surface and solve practical edge cases before launch.
          </>
        ),
        content: {
          type: 'image',
          props: {
            src: "/projects/workforceApp/documentation/homePage.jpg",
            alt: "Admin Tools",
            className: "h-full w-full object-cover"
          }
        },
        width: "16rem",
        height: "34rem"
      },
      {
        title: "Deployment & Auto Updates",
        description: (
          <>
            I used Expo for development and managed separate builds for Android and iOS. For Android, I distributed APKs directly, while iOS testing was done via development builds. I implemented an auto-update mechanism using version files stored on Google Cloud. The app checks these files on launch and prompts users to download a new version when needed. For iOS, I researched and implemented internal enterprise distribution using provisioning certificates — allowing the app to be installed without publishing to the App Store.
          </>
        ),
        content: {
          type: 'code',
          props: {
            language: "jsx",
            filename: "UpdateChecker.jsx",
            code: `import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  Modal,
  StyleSheet,
  Linking,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import * as Application from 'expo-application';
import Constants from 'expo-constants'; // To get project version if needed

// --- URL for the version.json file hosted on Firebase Cloud Storage ---
const VERSION_INFO_URL =
  'https://firebasestorage.googleapis.com/v0/b/propsfactoryapp.firebasestorage.app/o/app%2Fversions%2Fversion.json?alt=media&token=1f6886eb-cdd7-4670-8517-5f47fbaa87d5';

// Function to compare versions 
// Returns true if remoteVersion is newer than currentVersion
const isUpdateAvailable = (currentVersion, remoteVersion) => {
  if (!currentVersion || !remoteVersion) return false;
  const currentParts = currentVersion.split('.').map(Number);
  const remoteParts = remoteVersion.split('.').map(Number);
  for (let i = 0; i < Math.max(currentParts.length, remoteParts.length); i++) {
    const current = currentParts[i] || 0;
    const remote = remoteParts[i] || 0;
    if (remote > current) return true;
    if (remote < current) return false;
  }
  return false;
};


const UpdateChecker = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [updateModalInfo, setUpdateModalInfo] = useState(null); // { version, downloadUrl, notes }
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const checkForUpdates = async () => {
      setIsLoading(true);
      console.log('Fetching version info from: \${VERSION_INFO_URL}');

      try {
        const currentVersion = Application.nativeApplicationVersion;
        if (!currentVersion) {
          console.warn('Could not get current application version.');
          setIsLoading(false);
          return;
        }
        console.log(
          'Current app version: \${currentVersion} on Platform: \${Platform.OS}'
        );

        const response = await fetch(VERSION_INFO_URL, {
          headers: {
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache',
            Expires: '0',
          },
        });

        console.log('Fetch response status: \${response.status}');
        if (!response.ok) {
          const errorText = await response.text();
          console.error(
            'Fetch failed. Status: \${response.status}, Body: \${errorText}'
          );
          if (response.status === 403) {
            Alert.alert(
              'Update Check Failed',
              'Permission denied fetching update information. Please check server configuration.'
            );
          } else {
            Alert.alert("Update Check Failed", 'Could not check for updates (Status: \${response.status}).');
          }
          throw new Error('HTTP error! status: \${response.status}');
        }

        const allVersionInfo = await response.json();
        console.log('All version info fetched:', allVersionInfo);

        let platformSpecificInfo = null;
        let downloadUrl = null;
        let releaseNotes = allVersionInfo.commonReleaseNotes || ''; // Default to common notes

        if (Platform.OS === 'android' && allVersionInfo.android) {
          platformSpecificInfo = allVersionInfo.android;
          downloadUrl = platformSpecificInfo.apkUrl;
          if (platformSpecificInfo.releaseNotes)
            releaseNotes = platformSpecificInfo.releaseNotes;
        } else if (Platform.OS === 'ios' && allVersionInfo.ios) {
          platformSpecificInfo = allVersionInfo.ios;
          downloadUrl = platformSpecificInfo.manifestUrl; // For Ad Hoc, this is the itms-services link
          if (platformSpecificInfo.releaseNotes)
            releaseNotes = platformSpecificInfo.releaseNotes;
        }

        if (!platformSpecificInfo) {
          console.log(
            'No update information found for platform: \${Platform.OS}'
          );
          setIsLoading(false);
          return;
        }

        console.log(
          'Platform specific info for \${Platform.OS}:',
          platformSpecificInfo
        );

        if (!platformSpecificInfo.latestVersion || !downloadUrl) {
          console.error(
            'Invalid version info format for \${Platform.OS}:',
            platformSpecificInfo
          );
          setIsLoading(false);
          return;
        }

        if (
          isUpdateAvailable(currentVersion, platformSpecificInfo.latestVersion)
        ) {
          console.log(
            'Update available for \${Platform.OS}: \${currentVersion} -> \${platformSpecificInfo.latestVersion}'
          );
          setUpdateModalInfo({
            version: platformSpecificInfo.latestVersion,
            downloadUrl: downloadUrl,
            notes: releaseNotes,
          });
          setIsModalVisible(true);
        } else {
          console.log('App on \${Platform.OS} is up to date.');
        }
      } catch (error) {
        console.error(
          'Error checking for \${Platform.OS} updates:',
          error.message,
          error
        );
      } finally {
        setIsLoading(false);
      }
    };

    // Delay the check slightly
    const timerId = setTimeout(checkForUpdates, 2000);
    return () => clearTimeout(timerId);
  }, []);

  const handleDownloadPress = () => {
    if (updateModalInfo?.downloadUrl) {
      console.log('Attempting to open URL: \${updateModalInfo.downloadUrl}');
      Linking.openURL(updateModalInfo.downloadUrl).catch((err) => {
        console.error('Failed to open URL:', err);
        Alert.alert('Error', 'Could not open the update link.');
      });
      setIsModalVisible(false);
    }
  };

  const handleLaterPress = () => {
    setIsModalVisible(false);
  };

  if (!isModalVisible || !updateModalInfo) {
    return null;
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={handleLaterPress}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Update Available</Text>
          <Text style={styles.modalText}>
            A new version ({updateModalInfo.version}) is available.
          </Text>
          {updateModalInfo.notes && (
            <>
              <Text style={styles.releaseNotesTitle}>What's New:</Text>
              <Text style={styles.releaseNotes}>{updateModalInfo.notes}</Text>
            </>
          )}
          <Text style={styles.modalInfo}>
            Press 'Download' to get the latest version.
            {Platform.OS === 'android' &&
              " You'll need to install it manually after downloading."}
          </Text>
          <View style={styles.buttonContainer}>
            <Button title="Later" onPress={handleLaterPress} color="#777" />
            <View style={{ width: 15 }} />
            <Button title="Download" onPress={handleDownloadPress} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default UpdateChecker`,
            highlightLines: [2, 3, 4],
          }
        }
      },
    ]
  },{
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
          src: "",
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
