"use client";
import React from 'react'
import { useState } from "react";
import { Download } from "lucide-react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";

const NavbarComponent = () => {
    const navItems = [
        {
          name: "Projects",
          link: "#projects",
        },
        {
          name: "About",
          link: "#about",
        },
        {
          name: "Contact",
          link: "#contact",
        },
      ];
     
      const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
     
      return (
        <div className="relative w-full">
          <Navbar>
            
            <NavBody>
              <NavbarLogo />
              <NavItems items={navItems} />
              <div className="hidden items-center gap-4 md:flex">
                <a href="#contact">
                  <NavbarButton variant="secondary">Get In Touch</NavbarButton>
                </a>
                <a href="/resume.pdf" download>
                  <NavbarButton variant="primary" className="flex items-center gap-2">
                    <Download className="h-4 w-4" /> Resume
                  </NavbarButton>
                </a>
              </div>
            </NavBody>
     
            {/* Mobile Navigation */}
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
                    href={item.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="relative text-neutral-600 dark:text-neutral-300"
                  >
                    <span className="block">{item.name}</span>
                  </a>
                ))}
                <div className="flex w-full flex-col gap-4">
                <a href="#contact" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                    <NavbarButton
                      variant="secondary"
                      className="w-full"
                    >
                      Get In Touch
                    </NavbarButton>
                  </a>
                  <a href="/resume.pdf" download className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                    <NavbarButton
                      variant="primary"
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Resume
                    </NavbarButton>
                  </a>
                </div>
              </MobileNavMenu>
            </MobileNav>
          </Navbar>
          
     
          {/* Navbar */}
        </div>
      );
}

export default NavbarComponent