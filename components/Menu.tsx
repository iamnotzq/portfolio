"use client";
import React, { useRef, useMemo, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';
import {
    IconBriefcase,
    IconUser,
    IconMail,
    IconX,
    IconCheck,
    IconAlertCircle,
    IconUpload,
} from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";
import { BentoGrid, BentoGridItem } from './ui/bento-grid';
import { WorldMap } from './ui/world-map';
import { Carousel } from './ui/carousel';
import { cn } from "@/lib/utils";
import { slideData } from '@/lib/projects-data';
import { timelineData } from '@/lib/about-data';
import { socialLinks } from '@/lib/social-links';
import { Timeline } from './ui/timeline';
import { Input } from './ui/input';
import { Label } from './ui/label';

// --- TEXTAREA COMPONENT ---
export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    const radius = 100;
    const [visible, setVisible] = React.useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }
    return (
      <motion.div
        style={{
          background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
          #3b82f6,
          transparent 80%
        )
      `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="group/input rounded-lg p-[2px] transition duration-300 w-full"
      >
        <textarea
          className={cn(
            `shadow-input dark:placeholder-text-neutral-600 flex w-full rounded-md border-none bg-gray-50 px-3 py-2 text-sm text-black transition duration-400 group-hover/input:shadow-none placeholder:text-neutral-400 focus-visible:ring-[2px] focus-visible:ring-neutral-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-800 dark:text-white dark:shadow-[0px_0px_1px_1px_#404040] dark:focus-visible:ring-neutral-600`,
            className
          )}
          ref={ref}
          {...props}
        />
      </motion.div>
    );
  }
);
Textarea.displayName = "Textarea";

// --- COMPACT FILE UPLOAD COMPONENT ---
const mainVariant = {
  initial: { x: 0, y: 0, },
  animate: { x: 10, y: -10, opacity: 0.9, },
};
function GridPattern() {
  const columns = 41;
  const rows = 11;
  return (
    <div className="flex bg-gray-100 dark:bg-neutral-900 shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px  scale-105">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={`w-10 h-10 flex shrink-0 rounded-[2px] ${
                index % 2 === 0
                  ? "bg-gray-50 dark:bg-neutral-950"
                  : "bg-gray-50 dark:bg-neutral-950 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
              }`}
            />
          );
        })
      )}
    </div>
  );
}
const CompactFileUpload = ({ onChange, }: { onChange?: (files: File[]) => void; }) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (newFiles: File[]) => {
    setFiles(newFiles);
    if (onChange) {
        onChange(newFiles);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: handleFileChange,
  });

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="p-4 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden h-full"
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <GridPattern />
        </div>
        <div className="flex flex-col items-center justify-center h-full">
          <p className="relative z-20 font-sans font-bold text-neutral-700 dark:text-neutral-300 text-sm">
            Attach File
          </p>
          <p className="relative z-20 font-sans font-normal text-neutral-400 dark:text-neutral-400 text-xs mt-1">
            Drag & drop or click
          </p>
          <div className="relative w-full mt-2 max-w-xl mx-auto">
            {files.length > 0 ?
              files.map((file, idx) => (
                <motion.div
                  key={"file" + idx}
                  layoutId={"file-upload"}
                  className="relative overflow-hidden z-40 bg-white dark:bg-neutral-900 flex items-center justify-center p-2 w-full mx-auto rounded-md shadow-sm"
                >
                    <p className="text-sm text-neutral-700 dark:text-neutral-300 truncate max-w-xs">
                      {file.name}
                    </p>
                </motion.div>
              )) : (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{ type: "spring", stiffness: 300, damping: 20, }}
                className="relative group-hover/file:shadow-xl z-40 bg-white dark:bg-neutral-900 flex items-center justify-center h-12 w-12 mx-auto rounded-full shadow-md"
              >
                {isDragActive ? (
                  <p className="text-neutral-600 text-xs">Drop</p>
                ) : (
                  <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                )}
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- MENU PROPS INTERFACE ---
interface MenuProps {
    activeItem: string | null;
    setActiveItem: (id: string | null) => void;
    id?: string;
    setPointerText: (text: string) => void;
    setPointerVisible: (visible: boolean) => void;
    menuPointerText: string;
    projectsPointerText: string;
    aboutPointerText: string;
    contactPointerText: string;
}

// --- CONTENT COMPONENTS FOR BENTO ITEMS ---
const AboutContent = ({ scrollContainerRef }: { scrollContainerRef: React.RefObject<HTMLDivElement | null> }) => (
    <div className="flex flex-col">
        <Timeline data={timelineData} scrollContainerRef={scrollContainerRef} />
    </div>
);

const ContactContent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setStatus('submitting');
      setMessage('');

      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('company', company);
      formData.append('description', description);
      if (files.length > 0) {
          formData.append('attachment', files[0]);
      }

      try {
          const response = await fetch('/api/send', {
              method: 'POST',
              body: formData,
          });

          const result = await response.json();

          if (response.ok) {
              setStatus('success');
              setMessage("Thank you for your message!");
              // Reset form
              setName('');
              setEmail('');
              setCompany('');
              setDescription('');
              setFiles([]);
          } else {
              setStatus('error');
              setMessage(result.error || "Something went wrong. Please try again.");
          }
      } catch (error) {
          console.error("Submission failed:", error);
          setStatus('error');
          setMessage("Something went wrong. Please try again.");
      }
  };

  const handleFileChange = (uploadedFiles: File[]) => {
      setFiles(uploadedFiles);
  };

  return (
      // The outermost container is now a flex container.
      <div className="w-full h-full flex flex-col p-4 lg:p-8">
          {/* This wrapper uses my-auto for vertical centering and contains the grid. */}
          <div className="my-auto w-full">
              <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-10 items-center">
                  {/* Left Column: Info & Links */}
                  <div className="flex flex-col justify-center text-center items-center">
                      <div>
                          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4 font-orbitron">
                              <span className="text-blue-400">contact</span><span className="text-white">()</span>
                          </h2>
                          <p className="text-neutral-300 max-w-md mb-4 sm:mb-8 md:text-sm lg:text-base text-xs mx-auto">
                              I&apos;m always open to new opportunities and collaborations. Feel free to send a message through one of the channels, or fill in the form, and I&apos;ll get back to you as soon as possible.
                          </p>
                          <div className="flex flex-row items-center justify-center gap-8 ">
                              {socialLinks.map(link => (
                                  <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" title={link.title} className="text-neutral-400 hover:text-white transition-colors ">
                                      {link.icon}
                                  </a>
                              ))}
                          </div>
                      </div>
                  </div>

                  {/* Right Column: Contact Form */}
                  <div className="w-full flex items-center justify-center">
                    <div className="w-full max-w-m">
                      <form onSubmit={handleSubmit} className="space-y-4 w-full">
                          <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                            <LabelInputContainer>
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" type="text" required />
                            </LabelInputContainer>
                            <LabelInputContainer>
                                <Label htmlFor="company">Company (Optional)</Label>
                                <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company" type="text" />
                            </LabelInputContainer>
                          </div>
                          <LabelInputContainer>
                              <Label htmlFor="email">Email Address</Label>
                              <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email.address@example.com" type="email" required />
                          </LabelInputContainer>
                          <LabelInputContainer>
                              <Label htmlFor="description">Message</Label>
                              <Textarea
                                  id="description"
                                  value={description}
                                  onChange={(e) => setDescription(e.target.value)}
                                  placeholder="Feel free to connect with me through this message."
                                  className="min-h-[60px] lg:min-h-[120px]"
                                  required
                              />
                          </LabelInputContainer>
                          <LabelInputContainer>
                              <Label htmlFor="file-upload">Attachment</Label>
                              <div className="bg-neutral-900/50 border border-dashed border-neutral-700 rounded-lg hover:border-blue-400 transition-colors duration-300">
                                  <CompactFileUpload onChange={handleFileChange} />
                              </div>
                          </LabelInputContainer>

                          <div className="flex flex-col items-center pt-1 sm:pt-2">
                              <button
                                  className="group/btn relative flex items-center justify-center h-12 w-full rounded-md text-white text-sm sm:text-base font-medium bg-zinc-800 from-zinc-900 to-zinc-900 shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] hover:bg-zinc-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                  type="submit"
                                  disabled={status === 'submitting'}
                              >
                                  {status === 'submitting' ? 'Sending...' : 'Send Message'}
                              </button>
                              {status === 'success' && (
                                  <div className="mt-3 flex items-center text-sm text-green-400">
                                      <IconCheck className="w-5 h-5 mr-2" />
                                      <span>{message}</span>
                                  </div>
                              )}
                              {status === 'error' && (
                                  <div className="mt-3 flex items-center text-sm text-red-400">
                                      <IconAlertCircle className="w-5 h-5 mr-2" />
                                      <span>{message}</span>
                                  </div>
                              )}
                          </div>
                      </form>
                    </div>
                  </div>
              </div>
          </div>
      </div>
  );
};


const ProjectsContent = () => (
    <div className="h-full w-full flex flex-col items-center py-2 lg:py-8">
        <div className="my-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-center"
            >
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-orbitron">
                    <span className="text-white">{'['}</span><span className="text-orange-400">{`"projects"`}</span><span className="text-white">{']'}</span>
                </h2>
                <p className="text-neutral-300 md:text-sm lg:text-base text-xs max-w-lg pb-2 mx-auto">
                    Selected works demonstrating my skills in full-stack development and end-to-end project delivery.
                </p>
            </motion.div>
            <Carousel slides={slideData} />
        </div>
    </div>
);

const LabelInputContainer = ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    return (
      <div className={cn("flex w-full flex-col space-y-2", className)}>
        {children}
      </div>
    );
  };

// --- MAIN MENU COMPONENT ---
const Menu = ({
    activeItem,
    setActiveItem,
    id,
    setPointerText,
    setPointerVisible,
    menuPointerText,
    projectsPointerText,
    aboutPointerText,
    contactPointerText,
}: MenuProps) => {
    const ref = useRef(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Scroll animations
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "start start"]
    });
    const opacity = useTransform(scrollYProgress, [0.7,0.8, 0.9, 1], [0,0.9, 1,1]);
    const scale = useTransform(scrollYProgress, [0.7, 0.8, 0.9, 1], [0,0.9, 1, 1]);
    const pointerEvents = useTransform(scrollYProgress, (v) => (v > 0.5 ? "auto" : "none"));
    
    // --- SCROLL LOCK LOGIC ---
    // This effect handles the body scroll lock when an item is expanded.
    useEffect(() => {
        // When the 'about' or 'contact' section is expanded, prevent the body from scrolling.
        if (activeItem === 'about' || activeItem === 'contact') {
            document.body.style.overflow = 'hidden';
        } else {
            // Re-enable body scrolling when the section is closed or another item is active.
            document.body.style.overflow = 'auto';
        }

        // Cleanup function to ensure body scrolling is restored when the component unmounts.
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [activeItem]); // This effect runs whenever activeItem changes.


    // Memoized menu items configuration
    const menuItems = useMemo(() => [
        {
            id: "projects",
            title: <span className="font-orbitron"><span className="text-white">{'['}</span><span className="text-orange-400">{`"projects"`}</span><span className="text-white">{']'}</span></span>,
            description: <span className="text-green-500 ">{/* // Explore a collection of my work. */}</span>,
            header: <div />,
            className: "col-span-2 row-span-5 xl:col-span-5 xl:row-span-1",
            icon: <IconBriefcase className="h-4 w-4 text-neutral-400" />,
            isExpandable: true,
            content: <ProjectsContent />,
            pointerText: projectsPointerText,
        },
        {
            id: "about",
            title: <span className="font-orbitron"><span className="text-yellow-400">about</span><span className="text-white">.me</span></span>,
            description: <span className="text-green-500">{/* // Learn more about my journey. */}</span>,
            header: <div />,
            className: "col-span-2 row-span-5 xl:col-span-3 xl:row-span-1",
            icon: <IconUser className="h-4 w-4 text-neutral-400" />,
            isExpandable: true,
            content: <AboutContent scrollContainerRef={scrollContainerRef} />,
            pointerText: aboutPointerText,
        },
        {
            id: "contact",
            title: <span className="font-orbitron"><span className="text-blue-400">contact</span><span className="text-white">()</span></span>,
            description: <span className="text-green-500">{/* // Let&apos;s get in touch now! */}</span>,
            header: <div />,
            className: "col-span-2 row-span-5 xl:col-span-2 xl:row-span-1",
            icon: <IconMail className="h-4 w-4 text-neutral-400" />,
            isExpandable: true,
            content: <ContactContent />,
            pointerText: contactPointerText,
        },
    ], [scrollContainerRef, projectsPointerText, aboutPointerText, contactPointerText]);

    // Dynamically calculate class names for grid layout
    const getClassName = (item: typeof menuItems[number]) => {
        if (!activeItem) return item.className;
    
   
        if (activeItem === 'projects') {
            if (item.id === 'projects') return 'col-span-2 row-span-12 xl:col-span-3 xl:row-span-2';
            if (item.id === 'about')    return 'row-start-1 row-span-3 xl:col-span-1 xl:row-span-2';
            if (item.id === 'contact')  return 'row-start-1 row-span-3 xl:col-span-1 xl:row-span-2';
        }
    
        if (activeItem === 'about') {
            if (item.id === 'about')    return 'col-span-2 row-span-12 xl:col-span-3 xl:row-span-2';
            if (item.id === 'projects') return 'row-start-1 row-span-3 xl:col-span-2 xl:row-span-1';
            if (item.id === 'contact')  return 'row-start-1 row-span-3 xl:col-span-2 xl:row-span-1';
        }
    
        if (activeItem === 'contact') {
            if (item.id === 'contact')  return 'col-span-2 row-span-12 xl:col-span-3 xl:row-span-2 xl:col-start-3';
            if (item.id === 'projects') return 'row-span-3 xl:col-span-2 xl:row-span-1 xl:col-start-1';
            if (item.id === 'about')    return 'row-span-3 xl:col-span-2 xl:row-span-1 xl:row-start-2 xl:col-start-1';
        }
    
        return item.className;
    };

    // Sort items for layout based on the active item
    const sortedItems = useMemo(() => {
        if (!activeItem) return menuItems;

        const projects = menuItems.find(i => i.id === 'projects');
        const about = menuItems.find(i => i.id === 'about');
        const contact = menuItems.find(i => i.id === 'contact');

        if (activeItem === 'projects') {
            return [about, projects, contact].filter(Boolean) as typeof menuItems;
        }
        if (activeItem === 'about') {
            return [about, projects, contact].filter(Boolean) as typeof menuItems;
        }
        if (activeItem === 'contact') {
            return [projects, about, contact].filter(Boolean) as typeof menuItems;
        }

        return menuItems;
    }, [activeItem, menuItems]);


    return (
        <motion.div 
            id={id} 
            ref={ref} 
            className="h-screen overflow-hidden"
            style={{ pointerEvents }}
            onMouseEnter={() => {
                if (!activeItem) {
                    setPointerText(menuPointerText);
                    setPointerVisible(true);
                }
            }}
            onMouseLeave={() => {
                setPointerVisible(false);
            }}
        >
            <style>
                {`
                    .no-scrollbar::-webkit-scrollbar {
                        display: none;
                    }
                    .no-scrollbar {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                `}
            </style>
            <motion.div
                style={{ opacity }}
                className="absolute inset-0 z-0"
            />
            <motion.div
                style={{ opacity, scale }}
                className="relative z-10 h-full w-full"
            >
                <div className="relative w-full h-full p-6 md:p-8 lg:p-10 xl:p-12 ">
                <div className="relative w-full h-full rounded-2xl ">
                        <BentoGrid className="w-full h-full grid-rows-15 xl:grid-rows-2">
                            {sortedItems.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    className={cn(getClassName(item), "relative", item.id === activeItem ? "z-30" : "z-10")}
                                    onMouseEnter={() => {
                                        if (item.id === activeItem) {
                                            setPointerVisible(false);
                                        } else {
                                            setPointerText(item.pointerText);
                                            setPointerVisible(true);
                                        }
                                    }}
                                    onMouseLeave={() => {
                                        if (item.id !== activeItem) {
                                            setPointerText(menuPointerText);
                                        }
                                    }}
                                >
                                    <BentoGridItem
                                        className={cn(
                                            "h-full w-full",
                                            "border-2 border-green-800/80 shadow-[0_0_20px_rgba(34,197,94,0.5)]"
                                        )}
                                        onClick={item.isExpandable ? () => {
                                            setActiveItem(item.id);
                                            setPointerVisible(false);
                                        } : undefined}
                                        title={item.title}
                                        description={item.description}
                                        header={item.header}
                                        icon={item.icon}
                                    >
                                        {item.id === activeItem && (
                                            <div className="relative h-full">
                                                <motion.button
                                                    initial={{ opacity: 1 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.1, duration: 0.2 }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setActiveItem(null);
                                                        setPointerText(menuPointerText);
                                                        setPointerVisible(true);
                                                    }}
                                                    className="absolute top-2 right-2 text-neutral-400 hover:text-white transition-colors z-20"
                                                >
                                                    <IconX className="h-6 w-6" />
                                                </motion.button>
                                                <motion.div
                                                    ref={scrollContainerRef}
                                                    initial={{ opacity: 1 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.1, duration: 0.2 }}
                                                    className="h-full w-full overflow-y-auto no-scrollbar"
                                                >
                                                    {item.content}
                                                </motion.div>
                                            </div>
                                        )}
                                    </BentoGridItem>
                                </motion.div>
                            ))}
                        </BentoGrid>
                        
                        <div
                            className="absolute inset-0 z-20 pointer-events-none opacity-60"
                            style={{ mixBlendMode: 'screen' }}
                        >
                            <WorldMap dots={[]} />
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Menu;
