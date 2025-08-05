import React from 'react';
import { universitySkills, polytechnicSkills, auralAidSkills, propsFactorySkill } from './constants';

/**
 * Data for the timeline component in the "About" section.
 * This data is now structured and free of layout styling.
 */
export const timelineData = [
  {
    title: "2024 - 2025",
    content: {
      heading: "Props Factory",
      subheading: "Full Stack Developer & Assistant Project Manager",
      listItems: [
        <>Spearheaded digital transformation by solo-developing a comprehensive Expo React Native app that <span className="text-green-400 font-bold">automated core business operations</span>, including worker check-in/out, expense claims, and payroll.</>,
        <>The new system <span className="text-green-400 font-bold">slashed payroll processing time by over 90%</span> and <span className="text-red-500 font-bold">eliminated 100%</span> of manual work hour tracking, boosting operational efficiency.</>,
        <>Designed and developed the corporate website, implementing SEO best practices that <span className="text-green-400 font-bold">doubled site traffic within 6 months</span> and enhanced online presence.</>,
        <>As Assistant Project Manager, managed event projects from planning to execution, receiving commendations for <span className="text-blue-400 font-bold">excellent communication and project management</span>, which resulted in significant repeat business.</>,
      ],
      skills: propsFactorySkill,
    },
  },
  {
    title: "2021 - 2024",
    content: {
      heading: "University of Wollongong",
      subheading: <>Bachelor of Computer Science (<span className="text-yellow-400 font-bold">Big Data</span>) - <span className="text-green-400 font-bold">With Distinction</span></>,
      listItems: [
        <>Graduated with Distinction, demonstrating a <span className="text-green-400 font-bold">solid foundation</span> across the full stack, from front-end and back-end development to machine learning.</>,
        <>Led the Final Year Project team and played a pivotal role in numerous group projects, showcasing strong <span className="text-blue-400 font-bold">leadership and collaborative skills</span>.</>,
        <>Acquired a diverse technical toolkit, including proficiency in <span className="text-orange-400 font-bold">Python, Java, C++, and PHP</span>, and hands-on experience with Big Data frameworks like <span className="text-orange-400 font-bold">TensorFlow, Keras, Spark, and R</span>.</>,
        <>Selected for a competitive semester exchange to Wollongong, Australia—an honor awarded to <span className="text-yellow-400 font-bold">fewer than 10 students.</span></>,
      ],
      images: [
        { src: "/about/pet1.png", alt: "University project 1" },
        { src: "/about/azoom1.png", alt: "University project 2" },
        { src: "/about/bugger1.png", alt: "University project 3" },
        { src: "/about/nutri1.png", alt: "University project 4" },
      ],
      skills: universitySkills,
    },
  },
  {
    title: "2023 - 2024",
    content: {
      heading: "Lagoon Laundry",
      subheading: "Part-time Customer Service & Front End Developer",
      listItems: [
        <>Contributed to the development of a new POS system by analyzing staff and customer workflows, which <span className="text-red-500 font-bold">eliminated 100% of manual bookkeeping</span> and boosted operational efficiency.</>,
        <>Honed customer service and communication skills, becoming a familiar face to regulars and contributing to a <span className="text-green-400 font-bold">high rate of repeat customers</span>.</>,
        <>Leveraged insights on user behavior to assist in designing and developing the <span className="text-blue-400 font-bold">front-end of the POS system</span>, ensuring it met both staff and customer requirements.</>,
      ],
      images: [
        { src: "/about/lagoon1.jpg", alt: "Lagoon Laundry POS system" },
      ],
      skills: [], // No skills section in original content
    },
  },
  {
    title: "2018",
    content: {
      heading: "Aural Aid",
      subheading: "Product Design Intern",
      listItems: [
        <>
            <span className="text-blue-400 font-bold">Entrusted as the workshop in-charge</span> to manage the <span className="text-green-400 font-bold">end-to-end crafting of bespoke client products</span>, and produced innovative parametric designs by mastering <span className="text-orange-400 font-bold">Grasshopper</span> and <span className="text-orange-400 font-bold">3ds Max</span> from scratch.
        </>,
        <>Contributed to a major website overhaul by designing, modeling, and rendering 3D product visuals, which <span className="text-green-400 font-bold">enhanced the site's UI/UX</span>.</>,
        <>Authored detailed product manuals as a self-initiated project, which <span className="text-blue-400 font-bold">streamlined internal work processes</span> and was commended by management.</>,
      ],
      images: [
        { src: "/about/auralManual.png", alt: "Aural Aid Manual" },
        { src: "/about/auralPanel.png", alt: "Aural Aid Panel" },
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
        <>Gained comprehensive experience in the <span className="text-green-400 font-bold">end-to-end product design lifecycle</span>, from initial user research and ideation to prototyping and final production.</>,
        <>Developed a strong foundation in <span className="text-blue-400 font-bold">user-centered design principles</span>, learning to gather insights, refine ideas based on feedback, and conduct usability testing.</>,
        <>Acquired hands-on skills in 3D modeling and rapid prototyping, bridging the gap between <span className="text-orange-400 font-bold">digital design and physical production</span>.</>,
        <>Demonstrated <span className="text-yellow-400 font-bold">rapid mastery of Rhino 3D</span>, becoming a go-to resource for peers due to a strong ability to visualize complex assemblies and troubleshoot modeling challenges.</>,
      ],
      skills: polytechnicSkills,
    },
  }
];
