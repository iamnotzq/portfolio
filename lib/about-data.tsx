import React from 'react';
import { AnimatedTooltip } from '@/components/ui/animated-tooltip';
import { universitySkills, polytechnicSkills, auralAidSkills, propsFactorySkill } from './constants';

/**
 * Data for the timeline component in the "About" section.
 */
export const timelineData = [
  {
    title: "2024 - 2025",
    content: (
      <div>
        <h3 className="text-5xl font-bold text-white mb-2">Props Factory</h3>
        <h4 className="text-2xl font-semibold text-neutral-300 mb-4">Full Stack Developer & Assistant Project Manager</h4>
        <ul className=" list-disc list-outside text-md text-neutral-200 space-y-3">
          <li>Spearheaded digital transformation by solo-developing a comprehensive Expo React Native app that <span className="text-green-400 font-bold">automated core business operations</span>, including worker check-in/out, expense claims, and payroll.</li>
          <li>The new system <span className="text-green-400 font-bold">slashed payroll processing time by over 90%</span> and <span className="text-red-500 font-bold">eliminated 100%</span> of manual work hour tracking, boosting operational efficiency.</li>
          <li>Designed and developed the corporate website, implementing SEO best practices that <span className="text-green-400 font-bold">doubled site traffic within 6 months</span> and enhanced online presence.</li>
          <li>As Assistant Project Manager, managed event projects from planning to execution, receiving commendations for <span className="text-blue-400 font-bold">excellent communication and project management</span>, which resulted in significant repeat business.</li>
        </ul>
        <h5 className="text-xl font-bold text-white mt-6 mb-3">Key Skills & Technologies</h5>
          <div className="flex flex-row flex-wrap items-center justify-start mb-6">
            <AnimatedTooltip items={propsFactorySkill} />
          </div>
      </div>
    ),
  },
  {
      title: "2021 - 2024",
      content: (
        <div>
          <h3 className="text-5xl font-bold text-white mb-2">University of Wollongong</h3>
          <h4 className="text-2xl font-semibold text-neutral-300 mb-4">Bachelor of Computer Science (<span className="text-yellow-400 font-bold">Big Data</span>) - <span className="text-green-400 font-bold">With Distinction</span></h4>
          <ul className="list-disc list-outside text-md text-neutral-200 space-y-3 mb-4">
            <li>Graduated with Distinction, demonstrating a <span className="text-green-400 font-bold">solid foundation</span> across the full stack, from front-end and back-end development to machine learning.</li>
            <li>Selected for a competitive semester exchange to Wollongong, Australia—an honor awarded to <span className="text-yellow-400 font-bold">fewer than 10 students.</span> </li>
          </ul>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/about/pet1.png"
              alt="University project 1"
              className="w-full h-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <img
              src="/about/azoom1.png"
              alt="University project 2"
              className="w-full h-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
          <h5 className="text-xl font-bold text-white mt-6 mb-3">Key Skills & Technologies</h5>
          <div className="flex flex-row flex-wrap items-center justify-start mb-6">
            <AnimatedTooltip items={universitySkills} />
          </div>
        </div>
      ),
    },
  {
    title: "2023 - 2024",
    content: (
      <div>
        <h3 className="text-5xl font-bold text-white mb-2">Lagoon Laundry</h3>
        <h4 className="text-2xl font-semibold text-neutral-300 mb-4">Part-time Customer Service & Front End Developer</h4>
        <ul className="list-disc list-outside text-md text-neutral-200 space-y-3 mb-4">
            <li>Contributed to the development of a new POS system by analyzing staff and customer workflows, which <span className="text-red-500 font-bold">eliminated 100% of manual bookkeeping</span> and boosted operational efficiency.</li>
            <li>Honed customer service and communication skills, becoming a familiar face to regulars and contributing to a <span className="text-green-400 font-bold">high rate of repeat customers</span>.</li>
            <li>Leveraged insights on user behavior to assist in designing and developing the <span className="text-blue-400 font-bold">front-end of the POS system</span>, ensuring it met both staff and customer requirements.</li>
        </ul>
        <div className="grid grid-cols-1 gap-4">
            <img
              src="/about/lagoon1.jpg"
              alt="Lagoon Laundry POS system"
              className="w-full h-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
        </div>
      </div>
    ),
  },
  {
    title: "2018",
    content: (
      <div>
          <h3 className="text-5xl font-bold text-white mb-2">Aural Aid</h3>
          <h4 className="text-2xl font-semibold text-neutral-300 mb-4">Product Design Intern</h4>
          <ul className="list-disc list-outside text-md text-neutral-200 space-y-3">
              <li><span className="text-blue-400 font-bold">Entrusted as the workshop in-charge</span> to manage the <span className="text-green-400 font-bold">end-to-end crafting of bespoke client products</span>, and produced innovative parametric designs by mastering <span className="text-orange-400 font-bold">Grasshopper</span> from scratch.</li>
              <li>Contributed to a major website overhaul by designing, modeling, and rendering 3D product visuals, which <span className="text-green-400 font-bold">enhanced the site's UI/UX</span>.</li>
              <li>Authored detailed product manuals as a self-initiated project, which <span className="text-blue-400 font-bold">streamlined internal work processes</span> and was commended by management.</li>
          </ul>
        <h5 className="text-xl font-bold text-white mt-6 mb-3">Key Skills & Technologies</h5>
           <div className="flex flex-row flex-wrap items-center justify-start">
              <AnimatedTooltip items={auralAidSkills} />
           </div>
      </div>
    ),
  },
  {
      title: "2015 - 2018",
      content: (
        <div>
          <h3 className="text-5xl font-bold text-white mb-2">Temasek Polytechnic</h3>
          <h4 className="text-2xl font-semibold text-neutral-300 mb-4">Diploma in <span className="text-yellow-400 font-bold">Product & Industrial Design</span></h4>
          <ul className="list-disc list-outside text-md text-neutral-200 space-y-3 mb-4">
            <li>Gained comprehensive experience in the <span className="text-green-400 font-bold">end-to-end product design lifecycle</span>, from initial user research and ideation to prototyping and final production.</li>
            <li>Developed a strong foundation in <span className="text-blue-400 font-bold">user-centered design principles</span>, learning to gather insights, refine ideas based on feedback, and conduct usability testing.</li>
            <li>Acquired hands-on skills in 3D modeling and rapid prototyping, bridging the gap between <span className="text-orange-400 font-bold">digital design and physical production</span>.</li>
            <li>Demonstrated <span className="text-yellow-400 font-bold">rapid mastery of Rhino 3D</span>, becoming a go-to resource for peers due to a strong ability to visualize complex assemblies and troubleshoot modeling challenges.</li>
          </ul>
           <h5 className="text-xl font-bold text-white mt-6 mb-3">Key Skills & Technologies</h5>
           <div className="flex flex-row flex-wrap items-center justify-start">
              <AnimatedTooltip items={polytechnicSkills} />
           </div>
        </div>
      ),
    }
];
