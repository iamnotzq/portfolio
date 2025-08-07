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
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br  from-neutral-900 to-neutral-800 "></div>
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

// Specific prop types for documentation content
interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

interface CodeProps {
  language: string;
  filename: string;
  code: string;
  highlightLines?: number[];
}

interface CompareProps {
  firstImage: string;
  secondImage: string;
  firstImageClassName?: string;
  secondImageClassName?: string;
  className?: string;
  slideMode?: 'hover' | 'click';
}

// Discriminated union for content types
type DocumentationContent =
  | { type: 'image'; props: ImageProps }
  | { type: 'code'; props: CodeProps }
  | { type: 'compare'; props: CompareProps }
  | { type: 'custom'; props: Record<string, unknown> }; // Fallback for custom components

export interface DocumentationSection {
  title: string;
  description: string | React.ReactNode;
  width?: string; // Optional: custom width for the content (e.g., '40rem')
  height?: string; // Optional: custom height for the content (e.g., '30rem')
  content: DocumentationContent;
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
    slug: "workforce-management-app",
  title: "Workforce Management App",
  description: "A custom-built mobile application for Props Factory to streamline workforce operations such as attendance tracking, payslip management, and project coordination.",
  year: 2025,
  role: "Full-Stack Developer & Product Designer",
  techStack: [
    "React Native (Expo)",
    
    "Figma",
    
    
    "Supabase",
    "Firebase",
    
    "Google Cloud",
    
    "JavaScript",
  ],
  imageUrl: "/projects/workforceApp/homePage.jpg",
  displayType: "mobile",
  src: "/projects/workforceApp/features/thumbnail.jpg",
  liveUrl: "",
  githubUrl: "",
  
  overview: "I independently designed, built, and deployed this mobile-first workforce management app for Props Factory to modernize daily operations and eliminate paper-based workflows. Tailored for a diverse and largely non-technical workforce, the app allows employees to check in/out securely using GPS and facial recognition, view payslips, submit claims and overtime, access project assignments, and manage their profiles. Real-time notifications, streamlined approvals, and role-based access controls help align workers and supervisors on key tasks. The system is powered by Supabase (PostgreSQL) for structured data and Google Cloud for serverless backend logic, media storage, and auto-deploy infrastructure. Firebase Cloud Messaging enables instant alerts, while cloud functions and RPCs handle critical logic like payroll calculations and request status updates. The result is a highly optimized, maintainable app aligned with real-world workflows and tested directly with field staff.",
  
  features: [
    {
      title: "GPS & Facial Recognition Check-In",
      description: "Employees check in and out via a location-verified interface and facial recognition, with a degree of flexibility to ensure usability.",
      icon: "IconClipboardText",
      imageUrl: "/projects/workforceApp/features/checkIn.jpg",
    },
    {
      title: "Payslip, Overtime & Claim Automation",
      description: "The app dynamically calculates their monthly pay. Workers can securely view payslips and submit claims, while backend logic ensures accuracy and auditability.",
      icon: "IconChartLine",
      imageUrl: "/projects/workforceApp/features/payslip.jpg",
    },
    {
      title: "Profile & Certification Management",
      description: "Employees can manage personal details, view roles and history. Changes are reflected instantly across dashboards, scoped by permission logic.",
      icon: "IconAnalyze",
      imageUrl: "/projects/workforceApp/features/profile.jpg",
    },
    {
      title: "Project & Assignment Dashboard",
      description: "Admins use a powerful dashboard to assign tasks, upload plans, and track expense logs, reducing miscommunication and manual coordination.",
      icon: "IconVaccine",
      imageUrl: "/projects/workforceApp/features/project.jpg",
    },
    {
      title: "Real-Time Push Notifications",
      description: "Integrated with Firebase Cloud Messaging, the system sends targeted push alerts for approvals, shift reminders, or urgent updates.",
      icon: "IconPill",
      imageUrl: "/projects/workforceApp/features/notification.jpg",
    },
    {
      title: " Submission Workflow & Approval Tracking",
      description: "A tiered approval system for edits, claims, leave, and off-days includes full traceability: status history, approver identity, remarks, and attachments.",
      icon: "IconUsers",
      imageUrl: "/projects/workforceApp/features/requests.jpg",
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
  className: "absolute top-24 left-[24%] rotate-[-1deg]",
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
            Based on the company&apos;s preference to leverage Google&apos;s ecosystem, I used Firebase for authentication, cloud functions, and storage. For more complex relational data needs, I integrated Supabase (PostgreSQL) — enabling structured schemas and triggers. I made heavy use of Supabase RPC (Remote Procedure Calls) and edge functions to shift complex calculations and business logic (e.g., payroll, request validation) to the backend. This approach kept the mobile app lightweight and performant, while ensuring centralized, secure processing of core operations.
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
              <Text style={styles.releaseNotesTitle}>What&apos;s New:</Text>
              <Text style={styles.releaseNotes}>{updateModalInfo.notes}</Text>
            </>
          )}
          <Text style={styles.modalInfo}>
            Press &apos;Download&apos; to get the latest version.
            {Platform.OS === 'android' &&
              " You&apos;ll need to install it manually after downloading."}
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
  },
  {
    slug: "corporate-website",
    title: "Corporate Website",
    description: "A custom-built corporate website for Props Factory, redesigned with modern UI and SEO best practices.",
    year: 2024,
    role: "Full-Stack Developer & Designer",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Figma"],
    imageUrl: "/projects/pfWebsite/hero.png",
    displayType: "macbook", // Set this to 'macbook' or 'mobile' for each project
    src: "/projects/pfWebsite/hero.png",
    liveUrl: "https://propsfactory.com.sg",
    githubUrl: "",

    overview: "I spearheaded the end-to-end redesign and development of the Props Factory corporate website, transforming a static, outdated platform into a modern, dynamic, and user-centric digital presence. The primary goal was to empower non-technical staff with full content control. To achieve this, I architected a headless solution using Next.js, TypeScript, and Tailwind CSS, integrating Contentful for the blog and Cloudinary for the project gallery. This allows the team to publish updates instantly without developer intervention. The site features a fully responsive design, an automated contact form, and engaging animations with Framer Motion. I also implemented a comprehensive technical SEO strategy from the ground up, resulting in measurable traffic growth, and managed the full deployment pipeline on Vercel.",
    features: [
      {
        title: "Animated Hero Section",
        description:
          "A captivating hero section with a background image slideshow and animated flip-words in the title to immediately engage visitors.",
        icon: "IconSlideshow",
        imageUrl: "/projects/pfWebsite/hero2.png",
      },
      {
        title: "Dynamic Blog Management",
        description:
          "An integrated blog system that allows the company to easily add, edit, and publish articles, keeping content fresh and engaging.",
        icon: "IconArticle",
        imageUrl: "/projects/pfWebsite/blog.png",
      },
      {
        title: "Automated Contact & Enquiry Form",
        description:
          "A user-friendly contact form that sends enquiries directly to the company and provides an automated, custom email acknowledgement to the sender.",
        icon: "IconMailForward",
        imageUrl: "/projects/pfWebsite/quote.png",
      },
      {
        title: "Dynamic Project Gallery",
        description:
          "A flexible gallery that allows the company to effortlessly upload and showcase new projects, ensuring the portfolio is always current.",
        icon: "IconLayoutGrid",
        imageUrl: "/projects/pfWebsite/gallery.png",
      },
      {
        title: "Masonry Gallery View",
        description:
          "When a project is selected, images are displayed in a beautiful and responsive masonry layout, providing an immersive viewing experience.",
        icon: "IconLayoutDashboard",
        imageUrl: "/projects/pfWebsite/galleryMasonry.png",
      },
      {
        title: "Responsive Mobile Experience",
        description:
          "A fully customized and responsive design ensures a seamless and intuitive user experience across all devices, from desktop to mobile.",
        icon: "IconDeviceMobile",
        imageUrl: "/projects/pfWebsite/mobile.png",
      },
    ],
    
    demoScreenshots: [
      {
          title: "Home Page",
          image: "/projects/pfWebsite/hero3.png",
          className: "absolute top-14 right-[27%] 3xl:top-10",
      },
      {
          title: "About Section",
          image: "/projects/pfWebsite/about.png",
          className: "absolute top-76 left-[27%] rotate-[3deg] 3xl:top-80",
      },
      {
          title: "Works Section",
          image: "/projects/pfWebsite/works.png",
          className: "absolute top-14 right-[5%] rotate-[-1deg] 3xl:top-10",
      },
    {
        title: "Gallery Page",
        image: "/projects/pfWebsite/gallery.png",
        className: "absolute top-76 right-[5%] rotate-[3deg] 3xl:top-80",
      },
      
      
      {
        title: "Mansonry View",
        image: "/projects/pfWebsite/galleryMasonry.png",
        className: "absolute top-14 left-[5%] rotate-[-5deg] 3xl:top-10",
      },
      {
        title: "Blog Page",
        image: "/projects/pfWebsite/blogPage.png",
        className: "absolute top-76 right-[27%] rotate-[-3deg] 3xl:top-80",
      },
      {
        title: "Blog Content",
        image: "/projects/pfWebsite/blogSidebar.png",
        className: "absolute top-76 left-[5%] rotate-[-2deg] 3xl:top-80",
      },
      {
        title: "Footer",
        image: "/projects/pfWebsite/footer.png",
        className: "absolute top-14 left-[27%] rotate-[2deg] 3xl:top-10",
      },

     
    ],
    learnings: [
      {
        quote: "A key takeaway was balancing advanced technical implementation with real-world usability. I chose headless CMS solutions like Contentful and Cloudinary to empower non-technical staff to manage content independently, streamlining their workflow and reducing reliance on developers for updates.",
        name: "Empowering Users Through Technology",
        designation: "CMS Integration & Usability",
        src: "/projects/pfWebsite/blogPage.png"
      },
      {
        quote: "Using Framer Motion for UI elements taught me how to create engaging animations that don't sacrifice performance. The key was applying them selectively to guide attention and enhance the brand's story, rather than adding motion for its own sake.",
        name: "Balancing Animation and Performance",
        designation: "UI/UX with Framer Motion",
        src: "/projects/pfWebsite/works.png"
      },
      {
        quote: "Implementing technical SEO from the ground up was a valuable experience. By generating a sitemap, configuring robots.txt, and using structured metadata with Next.js, I helped improve the site's discoverability, with traffic growth validated by Google Analytics.",
        name: "Driving Growth with Technical SEO",
        designation: "SEO & Performance Optimization",
        src: "/projects/pfWebsite/hero.png"
      },
      
    ],
    documentation: [
      
      {
        title: "Project Overview",
        description: (
          <>
            I redesigned my company’s website to modernize its look, improve usability, and support dynamic content updates. The old site was static and visually outdated, which limited its ability to reflect the brand and showcase our work. I aimed to create a flexible system that non-technical staff could maintain and expand. The redesign focused on content clarity, SEO optimization, and a clean, branded visual identity. My role covered everything from initial planning and wireframing to final deployment and SEO setup.        </>
        ),
        content: {
          type: 'compare',
          props: {
            firstImage: "/projects/pfWebsite/documentation/wireframe.png",
            secondImage: "/projects/pfWebsite/documentation/wireframe2.png",
            firstImageClassName: "object-cover object-center-top",
            secondImageClassName: "object-cover object-center-top",
            className: "h-full w-full rounded-lg",
            slideMode: "hover"
          }
        },
        width: "45rem",
        height: "25rem"
      },
      {
        title: "Early Conceptualization",
        description: (
          <>
            The project started with a discussion around what message the site should convey. We mapped out essential pages and decided on the tone and visual theme of the new site. I then created rough wireframes to visualize the structure, which went through multiple revisions. Our main goal was to present information clearly while highlighting the company’s projects. This phase set the foundation for both design and content decisions moving forward.          </>
        ),
        content: {
          type: 'image',
          props: {
            src: "/projects/pfWebsite/documentation/wireframeOverview.png",
            alt: "Wireframe Overview",
            className: "h-full w-full object-fit"
          }
        },
        width: "45rem",
        height: "25rem"
      },
      {
        title: "Design & Wireframing",
        description: (
          <>
            I used Figma to create page-by-page mockups and explore layout ideas. We filled in real content early to see how different sections would come together visually. These mockups helped align the team on both structure and messaging. Each iteration aimed to improve user flow and visual clarity. The process ensured we were designing for function, not just aesthetics.
          </>
        ),
       
       content: {
          type: 'compare',
          props: {
            firstImage: "/projects/pfWebsite/documentation/wireframe3.png",
            secondImage: "/projects/pfWebsite/documentation/hero4.png",
            firstImageClassName: "object-cover object-center-top",
            secondImageClassName: "object-cover object-center-top",
            className: "h-full w-full rounded-lg",
            slideMode: "hover"
          }
        },
        width: "45rem",
        height: "25rem"
      },
      {
        title: "Tech Stack & Planning",
        description: (
          <>
            The tech stack was carefully chosen to balance performance with flexibility. I used Next.js, TypeScript, and Tailwind CSS for front-end development, along with Framer Motion for custom animations. For content management, I selected Cloudinary for the gallery and Contentful for the blog. These tools allowed dynamic updates without needing to redeploy the site. Everything was planned to minimize future maintenance for the company.
          </>
        ),
        content: {
          type: 'image',
          props: {
            src: "/projects/pfWebsite/gallery.png",
            alt: "Gallery View",
            className: "h-full w-full object-fit"
          }
        },
        width: "42rem",
        height: "20rem"
      },
      {
        title: "Dynamic Gallery with Cloudinary",
        description: (
          <>
            The gallery needed to support frequent updates without technical help. I integrated Cloudinary, letting the team upload project folders directly and have them appear instantly on the site. The gallery uses a modal-based layout with a masonry grid for smooth navigation. Folder views are shareable via unique URLs that open directly to the project. This setup keeps everything on a single page, avoiding unnecessary routing.   </>
        ),
        content: {
          type: 'image',
          props: {
           src: "/projects/pfWebsite/galleryMasonry.png",
           alt: "Masonry Gallery",
            className: "h-full w-full object-fit"
          }
        },
        width: "42rem",
        height: "20rem"
      },
      {
        title: "CMS Blog with Contentful",
        description: (
          <>
           The blog was added post-launch as a new feature to keep the site updated. I needed a system the team could use easily, so I integrated Contentful as a CMS. Blog posts are automatically styled and rendered based on flexible content types. The layout includes a sidebar and footer to make it feel like a professional blog. This allowed the company to publish instantly without touching the codebase.
          </>
        ),
        content: {
          type: 'image',
          props: {
            src: "/projects/pfWebsite/blog.png",
            alt: "Blog Page",
            className: "h-full w-full object-top"
          }
        },
        width: "42rem",
        height: "20rem"
      },
      {
        title: "Contact Form & Email Handling",
        description: (
          <>
            I built a contact form that lets users reach out directly to the company via email. Upon submission, users receive a confirmation email to confirm their message was received. I used EmailJS for this integration, which kept things lightweight and serverless. This small feature adds a layer of professionalism and trust to the site. It also streamlined communication between users and the company.     </>
        ),
        content: {
          type: 'image',
          props: {
            src: "/projects/pfWebsite/quote.png",
            alt: "Contact Form",
            className: "h-full w-full object-fit"
          }
        },
        width: "42rem",
        height: "20rem"
      },
      {
        title: "Visual & UI Challenges",
        description: (
          <>
            The client wanted a concrete texture background to match the company’s branding. This introduced challenges in readability and visual contrast between sections. To address this, I used layered elements, strategic spacing, and motion to help users differentiate sections. Custom animations helped keep the homepage dynamic without overwhelming users. The result was a unique yet clean design that respected both aesthetics and usability.
          </>
            ),
        content: {
          type: 'image',
          props: {
           src: "/projects/pfWebsite/works.png",
           alt: "Works Section",
            className: "h-full w-full object-fit"
          }
        },
        width: "42rem",
        height: "20rem"
      },
      {
        title: "Challenges & Iteration Decisions",
        description: (
          <>
            One major challenge was deciding how to implement the blog in a way that didn’t overcomplicate the system. I initially considered JSON files or a custom backend, but these required too much technical effort for the team. Contentful provided a user-friendly solution that saved time and scaled well. Design-wise, I went through many iterations to balance brand identity with modern design principles. Each decision was influenced by how maintainable and intuitive the site needed to be.

          </>
            ),
        content: {
          type: 'code',
          props: {
            language: "tsx",
            filename: "project/[slug]/page.tsx",
            code: `const BlogDetails: React.FC<BlogDetailsProps> = ({ blog }) => {
  const renderOptions: Options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { title, description, file } = node.data.target.fields; 
        const { url } = file;
        const { width, height } = file.details.image;

        return (
          <div className="relative mb-5 sm:my-5">
            <Image
              src={'https:\${url}'}
              alt={title || "Embedded image"}
              width={width}
              height={height}
              className="rounded-md object-cover w-full" 
            />
            <div className="rounded-md absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent text-white text-xs sm:text-sm font-light">
              {/* Display title or description */}
              <p>{description || title || "No description available"}</p>
            </div>
          </div>
        );
      },
      [BLOCKS.PARAGRAPH]: (node) => (
        <p className="my-5 text-black text-base sm:text-2xl mb-10 font-medium">
          {node.content.map((childNode, index) => {
            if (childNode.nodeType === "text") {
              return childNode.value;
            }
            return null;
          })}
        </p>
      ),
      [BLOCKS.HEADING_4]: (node) => (
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold my-5 text-black">
          {node.content.map((childNode) =>
            childNode.nodeType === "text" ? childNode.value : ""
          )}
        </h1>
      ),
      [BLOCKS.HEADING_5]: (node) => (
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold my-5 text-black">
          {node.content.map((childNode) =>
            childNode.nodeType === "text" ? childNode.value : ""
          )}
        </h2>
      ),
      [BLOCKS.HEADING_6]: (node) => (
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold my-5 text-black">
          {node.content.map((childNode) =>
            childNode.nodeType === "text" ? childNode.value : ""
          )}
        </h3>
      ),
      [INLINES.HYPERLINK]: (node) => (
        <a
          href={node.data.uri}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          {node.content.map((childNode) =>
            childNode.nodeType === "text" ? childNode.value : ""
          )}
        </a>
      ),
    },
  };`,
            highlightLines: [1, 10, 11]
          }
        }
      },
      {
        title: "Testing & Optimization",
        description: (
          <>
           I manually tested the site across devices and browsers to ensure consistent performance. For error tracking and debugging, I used Sentry, which helped catch unexpected issues in production. I optimized image loading and API calls to improve performance. SEO best practices were implemented using structured metadata and sitemap generation. I also set up Google Analytics to monitor traffic and user behavior.


          </>
            ),
        content: {
          type: 'image',
          props: {
            src: "/projects/pfWebsite/mobile.png",
            alt: "Mobile View",
            className: "h-full w-full object-fit"
          }
        },
        width: "42rem",
        height: "20rem"
      },
      {
        title: "Deployment & SEO Setup",
        description: (
          <>
           The site was deployed on Vercel, allowing for seamless CI/CD integration. I used .env.local to manage environment variables securely. To improve SEO, I configured robots.txt, added meta tags, and monitored search performance through Google Analytics. Routing logic was handled via next.config.js to ensure clean URLs. These efforts improved the site’s discoverability and made tracking results easier.
          </>
            ),
        content: {
          type: 'code',
          props: {
            language: "tsx",
            filename: "project/[slug]/page.tsx",
            code: `export const metadata: Metadata = {
  title: "Props Fabrication & Event Solutions | Props Factory Singapore",
  description:
    "Props Factory Singapore specializes in props fabrication, event fabrication, and 3D props for exhibitions, events, and installations. As a trusted prop building company, we deliver bespoke designs for event planners, contractors, and creative professionals in Singapore.",
  metadataBase: new URL("https://propsfactory.com.sg"), // Replace with your live domain
  openGraph: {
    title: "Props Fabrication & Event Solutions | Props Factory Singapore",
    description:
      "Looking for prop building companies in Singapore? Props Factory Singapore leads in custom props fabrication, event fabrication, and 3D props for exhibitions, events, and installations. Transform your spaces with our bespoke designs.",
    images: [
      "https://propsfactory.com.sg/projectThumbnail/DIYU.jpg", // Replace with your image path
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Props Fabrication & Event Solutions | Props Factory Singapore",
    description:
      "Props Factory Singapore specializes in props fabrication, event fabrication, and 3D props for exhibitions, events, and installations. Transform events with our high-quality, custom-built props.",
    images: ["https://propsfactory.com.sg/projectThumbnail/DIYU.jpg"], // Replace with your image path
  },
};`,
            highlightLines: [1, 10, 11]
          }
        }
        
      },
      
    ],
  },
  {
    slug: "interactive-portfolio",
    title: "Interactive Portfolio",
    description: "A personal portfolio featuring a 3D interactive globe and scroll-based animations.",
    year: 2025,
    role: "Full-Stack Developer",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Figma"],
    imageUrl: "/projects/portfolioWebsite/homePage.png",
    displayType: "macbook", // Set this to 'macbook' or 'mobile' for each project
    src: "/projects/portfolioWebsite/homePage.png",
    liveUrl: "#",
    githubUrl: "#",

    overview: "I believe a portfolio should be more than a static list of accomplishments, it should tell a story. With this project, I set out to build a narrative-driven experience that departs from traditional portfolio sites. The goal was to create an immersive journey through interactive 3D visuals, scroll-triggered animations, and a layout that evolves as the user explores. These elements are brought to life using Next.js, React, TypeScript , Tailwind CSS, and a customized animation system powered by Framer Motion. The entire site is fully responsive, modularly architected, and deployed via Vercel with integrated performance analytics and error tracking through Sentry. Despite the rich visual experience, the site maintains clarity and accessibility, ensuring that visitors can easily explore my projects, skills, and technical capabilities.",
    features: [
      {
        title: "3D Interactive Globe",
        description:
          "An interactive 3D globe built using Three.js and React Three Fiber. Designed for smooth camera transitions and minimal GPU load.",
        icon: "IconGlobe",
        imageUrl: "/projects/portfolioWebsite/globe.png",
      },
      {
        title: "Framer Motion + Scroll UX",
        description:
          "Customized scroll-based animations and transitions powered by Framer Motion. Enhances engagement while maintaining performance across devices.",
        icon: "IconScrollText",
        imageUrl: "/projects/portfolioWebsite/laptop.png",
      },
      {
        title: "Modular Component Architecture",
        description:
          "Built entirely in React and Next.js using a modular, reusable component architecture. Enables clean separation and scalable feature development.",
        icon: "IconLayers",
        imageUrl: "/projects/portfolioWebsite/timeline.png",
      },
      {
        title: "Live Code Showcases",
        description:
          "Embedded live previews with syntax-highlighted code blocks to present how key components are built and styled, showcasing technical clarity and transparency.",
        icon: "IconCode",
        imageUrl: "/projects/portfolioWebsite/documentation.png",
      },
      {
        title: "Responsive, Tailored UI",
        description:
          "Fully responsive design crafted with Tailwind CSS, custom breakpoints, and layout adjustments. Optimized for touch interactions and accessibility.",
        icon: "IconDeviceMobile",
        imageUrl: "/projects/portfolioWebsite/mobile.png",
      },
      {
        title: "Optimized Performance & Monitoring",
        description:
          "Deployed on Vercel with built-in analytics and real-time error tracking via Sentry. Features optimized asset loading, lazy imports, and animation throttling.",
        icon: "IconGauge",
        imageUrl: "/projects/portfolioWebsite/loading.png",
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
        quote: "A key challenge was balancing scroll-based and pointer-driven animations without degrading performance. I customized Framer Motion and implemented a themed loader to prevent layout shifts and improve perceived speed, all validated via Vercel's performance insights.",
        name: "Optimizing Performance & User Experience",
        designation: "Framer Motion & Loading Strategy",
        src: "/projects/portfolioWebsite/loading.png"
      },
      {
        quote: "I wanted the documentation to be technical yet approachable. By designing custom components for code snippets, comparisons, and interactive media, I created a structure that makes in-depth content easier to navigate and absorb.",
        name: "Crafting Clear Technical Documentation",
        designation: "Component-Driven Documentation",
        src: "/projects/portfolioWebsite/documentation.png"
      }
    ],
    documentation: [
      
      {
        title: "Early Conceptualization",
        description: (
          <>
            The primary goal was to create a portfolio that transcended a static layout, offering an{" "}
            <strong>interactive, narrative-driven experience</strong>. I began by outlining the{" "}
            <strong>user journey and information architecture</strong>, which informed both design and technical planning. This step ensured a coherent and intuitive flow from the landing page to project detail pages.
          </>
        ),
        content: {
          type: 'image',
          props: {
            src: "/projects/portfolioWebsite/homeFlow.png",
            alt: "Portfolio Flow",
            className: "h-full w-full object-fit object-left-top"
          }
        },
        width: "45rem",
        height: "20rem"
      },
      {
        title: "Design & Prototyping",
        description: (
          <>
            Designed entirely in Figma, the portfolio UI emphasizes clarity, flow, and engagement. I mapped out <strong>component-level interactions</strong> and planned for responsiveness across breakpoints. The visual design was guided by a strong understanding of{" "}
            <strong>React componentization</strong>, ensuring design fidelity during development.
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
        },
        width: "45rem",
        height: "25rem"
      },
      {
        title: "Technical Architecture",
        description: (
          <>
            Built with Next.js and React, the site follows a component-driven architecture with a strong focus on maintainability and reusability. Both the homepage and project pages are rendered entirely on the client side to support rich interactivity, including scroll-based animations, pointer events, and context-driven transitions. This architecture allows for a highly dynamic user experience while keeping the code modular and easy to scale. The application is structured by feature, enabling clean separation of concerns and faster development cycles.          </>
        ),
        content: {
          type: 'code',
          props: {
            language: "tsx",
            filename: "project/[slug]/page.tsx",
            code: projectPageCode,
            highlightLines: [1, 10, 11]
          }
        }
      },
      {
        title: "Custom Animation System",
        description: (
          <>
            I integrated and customized <strong>Framer Motion</strong> to deliver a{" "}
            <strong>narrative-driven experience</strong>. Animations are orchestrated using{" "}
            <strong>scroll triggers, pointer-based events, and viewport transitions</strong>, all tuned
            for responsiveness and performance.
            <br /><br />
            To enhance perceived performance and prevent layout shifts, I built a{" "}
            <strong>custom-themed loading screen</strong> aligned with the site’s visual language.
            This solution was informed by runtime performance metrics from <strong>Vercel&apos;s analytics dashboard</strong>,
            helping ensure the smoothest UX possible across devices.
          </>
        ),
        content: {
          type: 'image',
          props: {
            src: "/projects/portfolioWebsite/loading.png",
            alt: "Loading Screen",
            className: "h-full w-full object-fit object-left-top"
          }
        },
        width: "42rem",
        height: "20rem"
      },
      {
        title: "Core Features & UX",
        description: (
          <>
            A unique <strong>panel-based navigation system</strong> guides the user through the experience without traditional scrolling fatigue. After the hero section, the interface simulates a descent into a digital &quot;world map&quot; from which users can explore projects.
            <br /><br />
            Selecting a project triggers a <strong>contextual &apos;data stream&apos; animation</strong>, providing visual continuity and reinforcing the site&apos;s sci-fi narrative. Each project page then reveals a <strong>layered technical breakdown</strong>.
          </>
        ),
        content: {
          type: 'image',
          props: {
            src: "/projects/portfolioWebsite/map.png",
            alt: "World Map",
            className: "h-full w-full object-fit"
          }
        },
        width: "42rem",
        height: "20rem"
      },
      {
        title: "Responsive Design Strategy",
        description: (
          <>
            I used <strong>Tailwind CSS</strong> to build a mobile-responsive layout tailored for
            <strong> touch-based interactions and scroll-based animations</strong>. Components were
            designed with utility-first classes and conditionally styled based on screen size breakpoints.
            <br /><br />
            Special care was taken to optimize tap targets, viewport animations, and content legibility
            on small screens, ensuring a <strong>frictionless experience across devices</strong>.
          </>
        ),
        content: {
          type: 'image',
          props: {
            src: "/projects/portfolioWebsite/map.png",
            alt: "World Map Responsive",
            className: "h-full w-full object-fit"
          }
        },
        width: "42rem",
        height: "20rem"
      },
      {
        title: "Deployment & Monitoring",
        description: (
          <>
            The site is <strong>deployed on Vercel</strong>, enabling zero-config CI/CD with instant rollbacks. For observability, I integrated <strong>Sentry</strong> to monitor errors in real-time, as well as <strong>Vercel Analytics</strong> to track page load times and user interaction hotspots.
          </>
        ),
        content: {
          type: 'image',
          props: {
            src: "/projects/portfolioWebsite/about.png",
            alt: "About Section",
            className: "h-full w-full object-fit object-left-top"
          }
        },
        width: "42rem",
        height: "20rem"
      },
    ],
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
    liveUrl: "",
    githubUrl: "",
 
    overview: "Nutriwise is a mobile app developed as part of my Final Year Project (FYP), aimed at tackling the critical need for active diabetes self-management. With no known cure for the condition, empowering users with the right tools is essential. The app enables users to log meals, monitor glucose levels, manage insulin intake, and stay connected with a supportive community. As Project Lead, I oversaw the UI/UX design, guided the development process, architected the backend database, and conducted in-depth user and market research to ensure the app was both effective and user-friendly."
,
    features: [
      {
        title: "Effortless Food Logging",
        description: "Log meals with ease using our built-in food database or by adding custom entries—track your nutritional intake accurately and quickly.",
        icon: "IconClipboardText",
        imageUrl: "/projects/nutriwise/features/foodRecording.jpg",
      },
      {
        title: "Blood Glucose Tracking",
        description: "Easily record blood glucose levels and monitor trends over time to maintain better control of your condition.",
        icon: "IconChartLine",
        imageUrl: "/projects/nutriwise/features/glucoseTracking.jpg",
      },
      {
        title: "Data-Driven Analysis",
        description: "Understand your progress through clear, visual summaries of your food and glucose data, helping you make informed health decisions.",
        icon: "IconAnalyze",
        imageUrl: "/projects/nutriwise/features/dataAnalysis.jpg",
      },
      {
        title: "Smart Insulin Dosing",
        description: "Get insulin dosage suggestions based on your latest glucose readings and meal data, helping reduce guesswork in your daily routine.",
        icon: "IconVaccine",
        imageUrl: "/projects/nutriwise/features/insulinDosing.jpg",
      },
      {
        title: "Medication Management",
        description: "Track insulin injections and manage your medication schedule with helpful logging tools and timely reminders.",
        icon: "IconPill",
        imageUrl: "/projects/nutriwise/features/medicationManagement.png",
      },
      {
        title: "Community & Events",
        description: "Stay connected by joining events and support groups. Share experiences and find motivation alongside others managing diabetes.",
        icon: "IconUsers",
        imageUrl: "/projects/nutriwise/features/communityEvents.jpg",
      }
    ],
    
    demoScreenshots: [
      {
          title: "Dashboard",
          image: "/projects/nutriwise/nutri2.jpg",
          className: "absolute top-10 left-[15%] rotate-[-4deg]",
      },
      {
          title: "Food Logging",
          image: "/projects/nutriwise/nutri3.jpg",
          className: "absolute top-28 left-[8%] rotate-[5deg]",
      },{
        title: "Glucose Logging",
        image: "/projects/nutriwise/nutri4.jpg",
        className: "absolute top-12 left-[41%] rotate-[-3deg]",
    },{
      title: "Food Intake Summary",
      image: "/projects/nutriwise/nutri5.jpg",
      className: "absolute top-24 left-[32%] rotate-[2deg]",
  },{
    title: "Glucose Summary",
    image: "/projects/nutriwise/nutri6.jpg",
    className: "absolute top-18 right-[15%] rotate-[4deg]",
},{
  title: "Medication Management",
  image: "/projects/nutriwise/nutri7.png",
  className: "absolute top-28 right-[8%] rotate-[-7deg]",
},{
  title: "Community Events",
  image: "/projects/nutriwise/nutri8.jpg",
  className: "absolute top-22 right-[24%]",
},{
  title: "User Profile",
  image: "/projects/nutriwise/nutri10.png",
  className: "absolute top-12 right-[32%] rotate-[-5deg]",
},{
  title: "Onboarding Flow",
  image: "/projects/nutriwise/nutri12.png",
  className: "absolute top-22 right-[39%] rotate-[4deg]",
},{
  title: "App Menu",
  image: "/projects/nutriwise/nutri16.png",
  className: "absolute top-28 left-[24%]",
},
    ],
    learnings: [
      {
        quote: "I learned how challenging it can be to lead a team with different technical skill levels. Disagreements are inevitable, but focusing on shared goals helped us align and move forward effectively.",
        name: "Leadership Through Alignment",
        designation: "Team Collaboration & Conflict Resolution",
        src: "/projects/nutriwise/nutri1.png", 
      },
      {
        quote: "During real-world testing, I realized that food tracking accuracy is difficult for users. This insight led to creating a blog section to educate users about portioning and healthy choices.",
        name: "From Testing to Teaching",
        designation: "User Education Through Content",
        src: "/projects/nutriwise/nutri14.jpg", 
      },
      
      
      {
        quote: "Using Figma alongside architecture and sequence diagrams helped our team stay aligned. These visual tools were essential in turning ideas into concrete flows.",
        name: "Design as Communication",
        designation: "Figma & System Diagrams",
        src: "/projects/nutriwise/figma.png",
      }
    ],
    documentation: [
      {
        title: "Foundational Research & Problem Framing",
        description: (
          <>
            As team lead, I conducted <strong>extensive user research</strong> to understand the lived experience of diabetics—especially <strong>older adults</strong>, who represent over 90% of cases. I studied their <strong>daily management habits</strong>, technology comfort levels, and health literacy. I also reviewed <strong>existing diabetes apps</strong> to identify gaps and opportunities.
            <br /><br />
            This research shaped the project’s direction and ensured our solution was grounded in real-world needs.
          </>
        ),
        content: {
          type: 'image',
          props: {
            src: "/projects/nutriwise/documentation/distributionAge.png",
            alt: "Age Distribution of Diabetic Users",
            className: "h-full w-full object-cover rounded-lg"
          }
        }
      },
      {
        title: "Designing for the User",
        description: (
          <>
            I translated our research insights into <strong>low- and high-fidelity designs</strong> in Figma, focusing on <strong>clarity, accessibility, and ease of use</strong>. I led discussions with my team to align on <strong>user flows</strong> that minimized complexity for older adults.
            <br /><br />
            Our UI emphasizes <strong>large tap areas</strong>, <strong>high-contrast visuals</strong>, and <strong>linear navigation</strong> to reduce confusion and improve onboarding.
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
        },
        width: "16rem",
        height: "34rem"
      },
      {
        title: "Frontend Architecture & Stack",
        description: (
          <>
            We used <strong>React Native</strong> for a shared codebase across both iOS and Android, allowing for faster development and consistent user experiences across platforms. I led the front-end setup using <strong>modular components</strong> designed specifically for accessibility, making the app intuitive for all users, particularly older adults.
          </>
        ),
        content: {
          type: 'image',
          props: {
            src: "/projects/nutriwise/documentation/nutri1.png",
            alt: "Frontend Architecture",
            className: "h-full w-full object-cover rounded-lg"
          }
        },
        width: "16rem",
        height: "34rem"
      },
      {
        title: "Backend Architecture & Scalability",
        description: (
          <>
            The backend was powered by a <strong>Node.js server</strong> with a <strong>MongoDB database</strong> to manage and store user data. We offloaded key services, such as <strong>nutrition analysis</strong> and <strong>insulin suggestions</strong>, to <strong>Firebase Cloud Functions</strong>, improving scalability and enabling the app to handle complex computations efficiently.
          </>
        ),
        content: {
          type: 'image',
          props: {
            src: "/projects/nutriwise/documentation/nutri3.jpg",
            alt: "Backend Architecture",
            className: "h-full w-full object-cover rounded-lg"
          }
        },
        width: "16rem",
        height: "34rem"
      },
      {
        title: "Core Features Built with Purpose",
        description: (
          <>
            Our app is designed to support key areas of diabetes self-management, with features tailored to meet the unique needs of our users. It enables effortless food logging, where users can search or add custom meals to easily track their nutritional intake. Blood glucose tracking is seamlessly integrated, allowing users to record and monitor their glucose levels to better understand their patterns.
          </>
        ),
        content: {
          type: 'image',
          props: {
            src: "/projects/nutriwise/documentation/nutri4.jpg",
            alt: "Core Features",
            className: "h-full w-full object-cover rounded-lg"
          }
        },
        width: "16rem",
        height: "34rem"
      },
      {
        title: "Advanced Features for Comprehensive Management",
        description: (
          <>
            In addition to basic tracking, our app provides data-driven analysis that visualizes trends from both food and glucose logs, empowering users to make informed health decisions. Smart insulin dosing recommendations are offered based on meal data and glucose readings, helping users manage their condition effectively. Medication management is streamlined, allowing users to log insulin intake and receive timely medication reminders. Lastly, the app encourages community engagement, enabling users to connect with peers, share experiences, and discover local support groups and events to stay motivated.
          </>
        ),
        content: {
          type: 'image',
          props: {
            src: "/projects/nutriwise/documentation/nutri5.jpg",
            alt: "Effortless Food Logging",
            className: "h-full w-full object-cover rounded-lg"
          }
        },
        width: "16rem",
        height: "34rem"
      },
      {
        title: "Challenges & Iteration",
        description: (
          <>
            Despite internal testing, we discovered several <strong>unexpected UX issues</strong> when older adults began using the app. These included confusion with icons, difficulty reading small text, and misclicks due to small buttons.
            <br /><br />
            We responded with <strong>multiple design iterations</strong>: simplified flows, larger UI elements, and improved feedback messages. I led the feedback cycles and coordinated fixes with the team.
          </>
        ),
        content: {
          type: 'image',
          props: {
            src: "/projects/nutriwise/documentation/nutri16.png",
            alt: "Iteration",
            className: "h-full w-full object-cover rounded-lg"
          }
        },
        width: "16rem",
        height: "34rem"
      },
      {
        title: "Real-World Testing & Optimization",
        description: (
          <>
            We conducted <strong>usability testing</strong> with diabetic users and iteratively improved the app based on findings. I focused on optimizing:
            <ul>
              <li><strong>Performance:</strong> Reduced initial load time by lazy-loading components</li>
              <li><strong>Accessibility:</strong> Increased color contrast, added readable labels</li>
              <li><strong>Resilience:</strong> Improved error handling for poor network conditions</li>
            </ul>
          </>
        ),
        content: {
          type: 'image',
          props: {
            src: "/projects/nutriwise/documentation/nutri15.jpg",
            alt: "Testing",
            className: "h-full w-full object-cover rounded-lg"
          }
        },
        width: "16rem",
        height: "34rem"
      },
      {
        title: "Deployment & Hosting",
        description: (
          <>
            The app was deployed using <strong>Expo</strong> for simplified distribution to both app stores. Backend services were hosted via <strong>Firebase</strong> and <strong>Render</strong>, enabling scalable and secure operations.
            <br /><br />
            We used <strong>GitHub Actions</strong> for continuous integration and automatic builds during feature rollouts.
          </>
        ),
         content: {
          type: 'image',
          props: {
            src: "/projects/nutriwise/documentation/nutri10.png",
            alt: "Deployment",
            className: "h-full w-full object-cover rounded-lg"
          }
        },
        width: "16rem",
        height: "34rem"
      },
      {
        title: "Marketing Materials & Website Mockup",
        description: (
          <>
            To promote the app and expand its reach, I designed targeted advertisements with the vision of them being displayed on billboards and posters. These ads are intended to capture the attention of potential users while showcasing the app&apos;s core features. Additionally, I created a mockup for the app&apos;s website to provide a digital platform where users can learn more about the app, sign up, and access support resources.
          </>
        ),
        content: {
          type: 'image',
          props: {
            src: "/projects/nutriwise/documentation/image106.png",
            alt: "Marketing",
            className: "h-full w-full object-fit rounded-lg"
          }
        },
        width: "24rem",
        height: "34rem"
      }
    ]
  },
];
