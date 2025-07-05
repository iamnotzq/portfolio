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
  // Updated the type to include 'projects'
  onMenuClick: (id: 'about' | 'contact' | 'projects') => void;
}

const NavbarComponent = ({ onMenuClick }: NavbarComponentProps) => {
    const navItems = [
        { name: "Home", link: "#home" },
        // Changed 'link' to 'id' to match the behavior of About and Contact
        { name: "Projects", id: "projects" as const },
        { name: "About", id: "about" as const },
        { name: "Contact", id: "contact" as const },
      ];
     
      const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

      const handleLinkClick = (item: (typeof navItems)[number]) => {
        if ('link' in item && item.link) {
            // Special case for the "Home" link to scroll to the top of the page.
            if (item.link === '#home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const element = document.getElementById(item.link.substring(1));
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        } else if ('id' in item && item.id) {
            // This now handles 'projects' as well
            onMenuClick(item.id);
        }
        setIsMobileMenuOpen(false);
      };
     
      return (
        <div className="fixed top-0 left-0 w-full z-50">
          <Navbar>
            <NavBody>
              <NavbarLogo />
              <div className="hidden md:flex items-center gap-6 text-sm">
                  {navItems.map((item) => (
                      <a
                          key={item.name}
                          onClick={() => handleLinkClick(item)}
                          className="relative group cursor-pointer text-neutral-400 transition-colors hover:text-white"
                      >
                          {item.name}
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                      </a>
                  ))}
              </div>

              <div className="hidden items-center gap-4 md:flex">
                <NavbarButton onClick={() => onMenuClick('contact')} variant="secondary">
                  Get In Touch
                </NavbarButton>
                <NavbarButton href="/resume.pdf" download variant="primary" className="flex items-center gap-2">
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
                {navItems.map((item, idx) => (
                  <a
                    key={`mobile-link-${idx}`}
                    onClick={() => handleLinkClick(item)}
                    className="relative cursor-pointer text-neutral-600 dark:text-neutral-300"
                  >
                    <span className="block">{item.name}</span>
                  </a>
                ))}
                <div className="flex w-full flex-col gap-4">
                  <NavbarButton
                    variant="secondary"
                    className="w-full"
                    onClick={() => handleLinkClick({ name: 'Contact', id: 'contact' })}
                  >
                    Get In Touch
                  </NavbarButton>
                  <NavbarButton
                    href="/resume.pdf"
                    download
                    variant="primary"
                    className="w-full flex items-center justify-center gap-2"
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

export default NavbarComponent
