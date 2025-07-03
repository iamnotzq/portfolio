"use client";
import React from "react";
import { motion } from "framer-motion";
import { IconX } from "@tabler/icons-react";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal = ({ isOpen, onClose }: AboutModalProps) => {
  const backdropVariants = {
    open: { opacity: 1, pointerEvents: "auto" as const },
    closed: { opacity: 0, pointerEvents: "none" as const },
  };

  const modalVariants = {
    open: { x: 0 },
    closed: { x: "-100%" },
  };

  return (
    <motion.div
      // The `backdrop-blur-sm` class has been removed to improve performance.
      className="fixed inset-0 z-50 flex justify-start items-center bg-black/60"
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={backdropVariants}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onClick={onClose}
    >
      <motion.div
        className="relative h-full w-full md:w-2/3 bg-black border-r border-white/[0.2] p-8"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={modalVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal content
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors"
        >
          <IconX className="h-6 w-6" />
        </button>
        <h2 className="text-3xl font-bold text-white mb-4">About Me</h2>
        <p className="text-neutral-300">
          This is where you can share your story. Talk about your professional journey, the skills you've acquired, and what you're passionate about. Make it personal and engaging!
        </p>
        {/* You can add more detailed content, images, or components here */}
      </motion.div>
    </motion.div>
  );
};
