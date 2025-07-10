import React from 'react';
import { AnimatedTooltip } from '@/components/ui/animated-tooltip';
import { universitySkills, polytechnicSkills } from './constants';

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
          <li>Spearheaded digital transformation by solo developing a comprehensive Expo React Native app, <span className="text-green-400 font-bold">shifting the company to a fully automated system.</span></li>
          <li>The app features robust modules for worker check-in/out, expense claims, payroll access, user data management, and real-time project monitoring.</li>
          <li>Designed and developed the corporate website, implementing SEO best practices that <span className="text-green-400 font-bold">resulted in a 2x increase in site traffic.</span></li>
          <li>As Assistant Project Manager, successfully managed event projects by <span className="text-blue-400 font-bold">planning timelines</span> and <span className="text-blue-400 font-bold">communicating with stakeholders and clients</span> to ensure seamless execution.</li>
        </ul>
      </div>
    ),
  },
  {
      title: "2021 - 2024",
      content: (
        <div>
          <h3 className="text-5xl font-bold text-white mb-2">University of Wollongong</h3>
          <h4 className="text-2xl font-semibold text-neutral-300 mb-4">Bachelor of Computer Science (<span className="text-yellow-400 font-bold">Big Data</span>) - <span className="text-green-400 font-bold">With Distinction</span></h4>
          <ul className="list-disc list-outside text-md text-neutral-200 space-y-2 mb-4">
            <li>Awarded a competitive semester exchange to Wollongong, Australia, selected from the entire Computer Science cohort.</li>
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
    title: "2023",
    content: (
      <div>
        <h3 className="text-5xl font-bold text-white mb-2">Lagoon Laundry</h3>
        <h4 className="text-2xl font-semibold text-neutral-300 mb-4">Part-time Customer Service & Assistant Developer</h4>
        <p className="font-normal text-md text-neutral-200 mb-4">
          Contributed to a new POS system by <span className="text-blue-400 font-bold">analyzing staff and customer behavior</span>. This initiative was key to <span className="text-green-400 font-bold">automating manual bookkeeping</span> and significantly enhancing operational efficiency.
        </p>
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
          <ul className="list-disc list-outside text-md text-neutral-200 space-y-2">
              <li>Spearheaded a new product design initiative, mastering <span className="text-orange-400 font-bold">Grasshopper</span> software to produce innovative parametric design solutions.</li>
              <li>Executed a complete website overhaul, <span className="text-green-400 font-bold">improving UI/UX</span> and receiving commendation from senior leadership.</li>
              <li>Authored detailed product manuals and developed custom solutions, <span className="text-green-400 font-bold">increasing client satisfaction.</span></li>
          </ul>
      </div>
    ),
  },
  {
      title: "2015 - 2018",
      content: (
        <div>
          <h3 className="text-5xl font-bold text-white mb-2">Temasek Polytechnic</h3>
          <h4 className="text-2xl font-semibold text-neutral-300 mb-4">Diploma in <span className="text-yellow-400 font-bold">Product & Industrial Design</span></h4>
          <p className="text-md font-normal text-neutral-200 mb-4">
            Acquired a strong foundation in the end-to-end product design lifecycle, from ideation and prototyping to final production.
          </p>
           <h5 className="text-xl font-bold text-white mt-6 mb-3">Key Skills & Technologies</h5>
           <div className="flex flex-row flex-wrap items-center justify-start">
              <AnimatedTooltip items={polytechnicSkills} />
           </div>
        </div>
      ),
    }
];
