"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { menuData, MenuItem, SubPage } from '../data/menuData';
import HamburgerIcon from './icons/HamburgerIcon';
import CloseIcon from './icons/CloseIcon';
import LeafIcon from './icons/LeafIcon';

const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Responsiveness, has a lg breakpoint (1024 pixels width)
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024; 
      setIsMobile(mobile);
      if (!mobile) {
        setIsMobileMenuOpen(false);
        setOpenDropdown(null);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // This closes the dropdown when the user clicks outside 
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedOutside = Object.values(dropdownRefs.current).every(
        ref => ref && !ref.contains(event.target as Node)
      );
      
      if (clickedOutside) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuItemClick = (item: MenuItem) => {
    if (item.subPages && item.subPages.length > 0) {
      setOpenDropdown(openDropdown === item.name ? null : item.name);
    } else {
      router.push(item.href);
      setIsMobileMenuOpen(false);
      setOpenDropdown(null);
    }
  };

  const handleSubPageClick = (subPage: SubPage) => {
    if (subPage.id) {
      router.push(`${subPage.href}#${subPage.id}`);
      // Smooth scroll to section after navigation
      setTimeout(() => {
        const element = document.getElementById(subPage.id!);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      router.push(subPage.href);
    }
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setOpenDropdown(null);
  };

  return (
    <nav className="bg-nav-bg shadow-nav relative z-50 border-b border-nav-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          
          {/* Mobile/Medium Layout: Empty left space for centering */}
          <div className="flex-1 lg:flex-initial lg:hidden"></div>

          {/* Logo - Centered on mobile/medium, left on large */}
          <div className="flex-shrink-0 lg:mr-8">
            <Link href="/" className="flex items-center group">
              <div className="relative">
                <Image
                  src="/logo cream.png" 
                  alt="The Riverview Horticultural Centre Society Logo"
                  width={250} 
                  height={35}
                  className="h-10 w-auto lg:h-12 transition-transform duration-300 group-hover:scale-105"
                  priority 
                />
                {/* Subtle glow effect on hover */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-golden blur-md"></div>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Menu */}
          <div className="hidden lg:flex lg:items-center lg:space-x-2 lg:ml-auto">
            {menuData.map((item) => (
              <div
                key={item.name}
                className="relative"
                ref={(el) => { dropdownRefs.current[item.name] = el; }}
              >
                <button
                  onClick={() => handleMenuItemClick(item)}
                  className="group flex items-center px-4 py-3 rounded-xl text-sm font-medium text-nav-text-desktop hover:text-nav-text-desktop-hover hover:bg-nav-bg-hover transition-all duration-300 ease-in-out relative overflow-hidden"
                >
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-golden/20 to-nav-text-desktop-hover/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  
                  {/* Leaf icon with sway animation */}
                  <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 mr-2 transform group-hover:animate-leaf-sway relative z-10">
                    <LeafIcon />
                  </span>
                  
                  <span className="relative z-10 font-display">{item.name}</span>
                  
                  {item.subPages && (
                    <svg
                      className={`ml-2 h-4 w-4 transition-all duration-300 relative z-10 ${
                        openDropdown === item.name 
                          ? 'rotate-180 text-nav-text-desktop-hover' 
                          : 'text-nav-text-desktop group-hover:text-nav-text-desktop-hover'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>

                {/* Desktop Dropdown */}
                {item.subPages && openDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-nav-dropdown rounded-2xl shadow-dropdown ring-1 ring-nav-border z-50 animate-dropdown-appear overflow-hidden">
                    <div className="py-2">
                      {item.subPages.map((subPage, index) => (
                        <button
                          key={subPage.name}
                          onClick={() => handleSubPageClick(subPage)}
                          className="group flex items-center w-full px-5 py-3 text-sm text-nav-subtext-desktop hover:text-nav-subtext-desktop-hover hover:bg-nav-subtext-desktop-bg-hover transition-all duration-300 relative"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          {/* Hover accent line */}
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-nav-subtext-desktop-hover to-golden opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          
                          <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 mr-3 transform group-hover:scale-110">
                            <LeafIcon size="sm" />
                          </span>
                          
                          <span className="font-body group-hover:translate-x-1 transition-transform duration-300">
                            {subPage.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button - Right side */}
          <div className="flex-1 flex justify-end lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-3 rounded-xl hover:bg-nav-bg-hover transition-all duration-300 relative overflow-hidden group"
              aria-label="Toggle navigation menu"
            >
              {/* Background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-golden/50 to-nav-hamburger/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              
              <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                {isMobileMenuOpen ? (
                  <div className="text-nav-close">
                    <CloseIcon />
                  </div>
                ) : (
                  <div className="text-nav-hamburger">
                    <HamburgerIcon />
                  </div>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-nav-dropdown shadow-dropdown border-t border-nav-border z-40 animate-slide-down">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {menuData.map((item, itemIndex) => (
              <div key={item.name} style={{ animationDelay: `${itemIndex * 100}ms` }} className="animate-fade-in">
                <button
                  onClick={() => handleMenuItemClick(item)}
                  className="group flex items-center w-full px-4 py-4 rounded-xl text-base font-medium text-nav-text-mobile hover:text-nav-text-mobile-hover hover:bg-nav-subtext-desktop-bg-hover transition-all duration-300 relative"
                >
                  {/* Hover accent line */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-nav-text-mobile-hover to-golden opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-r"></div>
                  
                  <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 mr-3 transform group-hover:animate-leaf-sway">
                    <LeafIcon />
                  </span>
                  
                  <span className="font-display flex-1 text-left group-hover:translate-x-1 transition-transform duration-300">
                    {item.name}
                  </span>
                  
                  {item.subPages && (
                    <svg
                      className={`h-5 w-5 transition-all duration-300 ${
                        openDropdown === item.name 
                          ? 'rotate-180 text-nav-text-mobile-hover' 
                          : 'text-nav-text-mobile group-hover:text-nav-text-mobile-hover'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>

                {/* Mobile Submenu with improved animation */}
                {item.subPages && (
                  <div 
                    className={`ml-6 mt-2 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
                      openDropdown === item.name 
                        ? 'max-h-96 opacity-100 animate-submenu-expand' 
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    {item.subPages.map((subPage, subIndex) => (
                      <button
                        key={subPage.name}
                        onClick={() => handleSubPageClick(subPage)}
                        className="group flex items-center w-full px-4 py-3 rounded-lg text-sm text-nav-text-mobile/80 hover:text-nav-text-mobile-hover hover:bg-nav-subtext-desktop-bg-hover transition-all duration-300 relative"
                        style={{ 
                          animationDelay: `${subIndex * 75}ms`,
                          transform: openDropdown === item.name ? 'translateY(0)' : 'translateY(-10px)'
                        }}
                      >
                        <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 mr-3 transform group-hover:scale-110">
                          <LeafIcon size="sm" />
                        </span>
                        
                        <span className="font-body group-hover:translate-x-1 transition-transform duration-300">
                          {subPage.name}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;