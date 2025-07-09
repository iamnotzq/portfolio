"use client";
import React from 'react'
import { useState } from "react";
import { Download } from "lucide-react";
import {
  Navbar,
  NavBody,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";

interface NavbarComponentProps {
  // Make props optional to allow use on pages where these handlers are not relevant.
  onMenuClick?: (id: 'about' | 'contact' | 'projects') => void;
  onHomeClick?: () => void;
}

const NavbarComponent = ({ onMenuClick, onHomeClick }: NavbarComponentProps) => {
  const navItems = [
    {
      name: (
        <span className="font-orbitron "><span className="text-white">&lt;</span><span className="text-green-400">Home</span><span className="text-white"> /&gt;</span></span>
      ),
      link: "#home",
      key: "home",
    },
    {
      name: (
        <span className="font-orbitron"><span className="text-white">{'['}</span><span className="text-orange-400">"projects"</span><span className="text-white">{']'}</span></span>
       ),
      id: "projects" as const,
      key: "projects",
    },
    {
      name: <span className="font-orbitron"><span className="text-yellow-400">about</span><span className="text-white">.me</span></span>,
      id: "about" as const,
      key: "about",
    },
    {
      name: <span className="font-orbitron"><span className="text-blue-400">contact</span><span className="text-white">()</span></span>,
      id: "contact" as const,
      key: "contact",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Define the type for a single nav item explicitly for clarity
  type NavItem = (typeof navItems)[number];

  const handleLinkClick = (
    item: NavItem
  ) => {
    if ("link" in item && item.link) { // Home button
      if (onHomeClick) {
        // If onHomeClick is provided (i.e., on the main page), use it for smooth scrolling.
        onHomeClick();
      } else {
        // If not provided (i.e., on another page), navigate to the home page.
        window.location.href = '/';
      }
    } else if ("id" in item && item.id) { // Other menu buttons
      if (onMenuClick) {
        // If onMenuClick is provided, use it for the expanding menu.
        onMenuClick(item.id);
      } else {
        // If on another page, navigate to the home page with a hash
        // to identify the section to open.
        window.location.href = `/#${item.id}`;
      }
    }
    setIsMobileMenuOpen(false);
  };
     
      return (
        <div className="fixed top-0 left-0 w-full z-50">
          <Navbar>
            <NavBody>
              <NavbarLogo />
              <div className="hidden md:flex items-center gap-6 text-md font-semibold">
                  {navItems.map((item) => (
                      <button
                          key={item.key}
                          onClick={() => handleLinkClick(item)}
                          className="relative group cursor-pointer text-neutral-400 transition-colors hover:text-white"
                      >
                          {item.name}
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                      </button>
                  ))}
              </div>

              <div className="hidden items-center gap-4 md:flex">
                <NavbarButton href="/resume.pdf" download variant="primary" className="flex items-center gap-2 font-orbitron">
                  <Download className="h-4 w-4" /> Resume
                </NavbarButton>
              </div>
            </NavBody>
     
            <MobileNav>
              <MobileNavHeader>
                <NavbarLogo />
                <MobileNavToggle
                  isOpen={isMobileMenuOpen}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                />
              </MobileNavHeader>
     
              <MobileNavMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
              >
                {navItems.map((item) => (
                  <button
                    key={`mobile-link-${item.key}`}
                    onClick={() => handleLinkClick(item)}
                    className="relative cursor-pointer text-left text-neutral-600 dark:text-neutral-300"
                  >
                    <span className="block">{item.name}</span>
                  </button>
                ))}
                <div className="flex w-full flex-col gap-4">
                  <NavbarButton
                    href="/resume.pdf"
                    download
                    variant="primary"
                    className="w-full flex items-center justify-center gap-2 font-orbitron"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Download className="h-4 w-4" />
                    Resume
                  </NavbarButton>
                </div>
              </MobileNavMenu>
            </MobileNav>
          </Navbar>
        </div>
      );
}

export default NavbarComponent;
