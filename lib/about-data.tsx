import React from 'react';
import { universitySkills, polytechnicSkills, auralAidSkills, propsFactorySkill } from './constants';

/**
 * Data for the timeline component in the "About" section.
 * This data is now structured and free of layout styling.
 * Color Highlighting Strategy:
 * - Green: Positive metrics, growth, and efficiency gains.
 * - Blue: Key responsibilities and collaborative achievements.
 * - Red: Reduction or elimination of negative elements.
 * - Yellow: Unique achievements or special recognition.
 * - Orange: Specific technical skills/tools mentioned in context.
 */
export const timelineData = [
  {
    title: "2024 - 2025",
    content: {
      heading: "Props Factory (S) Pte. Ltd.",
      subheading: "Full Stack Developer & Junior Project Manager",
      listItems: [
        <>Independently designed and deployed a mobile-first workforce management app that completely digitized core operations, <span className="text-red-500 font-bold">eliminating 5 distinct paper-based processes</span> including timesheets, claims, and leave requests.</>,
        <>Engineered a robust system featuring a <span className="text-blue-400 font-bold">3-second facial recognition check-in</span>, which replaced manual time-card writing. This innovation led to <span className="text-green-400 font-bold">100% user adoption</span> and <span className="text-green-400 font-bold">slashed payroll processing time by 90%</span>, modernizing the company&apos;s operational backbone.</>,
        <>Led a full-cycle corporate website revitalization, from scoping and product roadmap definition to final deployment. The new site <span className="text-green-400 font-bold">grew monthly traffic by 10% to over 400 unique views</span> and <span className="text-red-500 font-bold">decreased the bounce rate by 9%</span>.</>,
        <>Architected a headless CMS that empowered non-technical staff to manage content, establishing a new marketing channel and <span className="text-green-400 font-bold">saving 5 developer hours per month</span>.</>,
        <>As a junior project manager, I served as the <span className="text-blue-400 font-bold">central communication lead for a 10-person cross-functional team</span>, ensuring seamless project execution across multiple concurrent builds.</>,
      ],
      images: [
        { src: "/about/hero.png", alt: "Workforce Management App", className: "col-span-2" },
        { src: "/about/gallery.png", alt: "App Gallery View", className: "col-span-2" },
        { src: "/about/homePage.jpg", alt: "Corporate Website Homepage", className: "col-span-1" },
        { src: "/about/history.jpg", alt: "App Timesheet History", className: "col-span-1" },
      ],
      skills: propsFactorySkill,
    },
  },
  {
    title: "2021 - 2024",
    content: {
      heading: "University of Wollongong",
      subheading: <>Bachelor of Computer Science (Big Data) - <span className="text-green-400 font-bold">With Distinction</span></>,
      listItems: [
        <>Graduated with Distinction, reflecting a comprehensive understanding of computer science fundamentals and a <span className="text-green-400 font-bold">proven ability to excel in a demanding academic environment.</span></>,
        <>Demonstrated strong <span className="text-blue-400 font-bold">leadership and collaborative skills</span> by leading a Final Year Project team and consistently taking a pivotal role in group assignments to deliver high-quality outcomes.</>,
        <>Built a versatile technical foundation, including proficiency in core languages like <span className="text-orange-400 font-bold">Python, Java, and C++</span>, complemented by specialized experience in Big Data frameworks such as <span className="text-orange-400 font-bold">TensorFlow, Keras, and Spark</span>.</>,
        <>Awarded a competitive semester-long exchange to Wollongong, Australia—a <span className="text-yellow-400 font-bold">prestigious opportunity granted to fewer than 10 students</span>, highlighting adaptability and a global mindset.</>,
      ],
      images: [
        { src: "/about/pet1.png", alt: "University project 1", className: "col-span-2" },
        { src: "/about/azoom1.png", alt: "University project 2", className: "col-span-2" },
        { src: "/about/nutri1.png", alt: "University project 4", className: "col-span-1" },
        { src: "/about/nutri2.jpg", alt: "University project 3", className: "col-span-1" },
      ],
      skills: universitySkills,
    },
  },
  {
    title: "2023 - 2024",
    content: {
      heading: "Lagoon Laundry",
      subheading: "Part-time Customer Service & Front End Design Assistant",
      listItems: [
        <>Conducted on-the-ground user research, gathering critical qualitative insights from 5 staff members and dozens of daily customer interactions to champion a <span className="text-blue-400 font-bold">truly user-centric design</span> for a new POS system.</>,
        <>Played a key role in designing the new system, which automated the tedious manual recording of over 50 daily transactions and <span className="text-green-400 font-bold">slashed customer processing time by over 30%</span>.</>,
      ],
      images: [
        { src: "/about/lagoon1.jpg", alt: "Lagoon Laundry POS system", className: "col-span-2" },
      ],
      skills: [], 
    },
  },
  {
    title: "2017",
    content: {
      heading: "Aural-Aid Pte. Ltd.",
      subheading: "Product Design Intern",
      listItems: [
        <>Authored the company&apos;s first-ever set of 5 standardized product manuals, a self-initiated project that <span className="text-green-400 font-bold">slashed new-hire onboarding time by an estimated 25%</span> and streamlined internal workflows.</>,
        <>Demonstrated rapid learning and technical aptitude by independently mastering <span className="text-orange-400 font-bold">parametric 3D modeling (Grasshopper, 3ds Max)</span> from scratch, producing over 10 complex product models for a critical website revamp.</>,
      ],
      images: [
        { src: "/about/auralManual.png", alt: "Aural Aid Manual", className: "col-span-2" },
        { src: "/about/auralPanel.png", alt: "Aural Aid Panel", className: "col-span-2" },
      ],
      skills: auralAidSkills,
    },
  },
  {
    title: "2015 - 2018",
    content: {
      heading: "Temasek Polytechnic",
      subheading: <>Diploma in <span className="text-yellow-400 font-bold">Product & Industrial Design</span></>,
      listItems: [
        <>Mastered the <span className="text-green-400 font-bold">end-to-end product design lifecycle</span>, from ethnographic user research and ideation to detailed prototyping, testing, and final production planning.</>,
        <>Cultivated a deep-seated foundation in <span className="text-blue-400 font-bold">user-centered design methodologies</span>, consistently translating abstract user needs into tangible and effective product solutions.</>,
        <>Bridged the crucial gap between <span className="text-orange-400 font-bold">digital design and physical production</span> through extensive hands-on experience with 3D modeling software and rapid prototyping technologies.</>,
      ],
      skills: polytechnicSkills,
    },
  }
];
