"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type NavItem = {
  name: string;
  href: string;
};

type NavbarProps = {
  navItems: NavItem[];
  handleNavClick: (href: string) => void;
  scrolled: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
};

export default function Navbar({
  navItems,
  handleNavClick,
  scrolled,
  mobileMenuOpen,
  setMobileMenuOpen,
}: NavbarProps) {
  const pathname = usePathname();
  const isMusic = pathname === '/music';

  return (
    <header className="flex justify-center lg:justify-start mb-4 w-full">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={cn(
          'flex items-center gap-4 transition-all duration-500',
          scrolled
            ? 'bg-stone-100/90 backdrop-blur-xl shadow-2xl shadow-black/10'
            : 'bg-stone-100/80 backdrop-blur-lg shadow-xl shadow-black/5',
          'rounded-full border border-stone-200/80 px-4 py-2'
        )}
      >
        {/* Logo Section */}
        <Link href="/">
          <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-sm">AA</span>
          </div>
        </Link>
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              className="text-black/70 hover:text-black rounded-full"
              onClick={() => handleNavClick(item.href)}
            >
              {item.name}
            </Button>
          ))}
          <Link href={isMusic ? '/' : '/music'}>
            <Button
              variant={isMusic ? 'default' : 'outline'}
              className={
                isMusic
                  ? 'ml-2 rounded-full bg-gradient-to-r from-green-600 to-black text-white shadow-lg border-0 hover:from-green-700 hover:to-black'
                  : 'ml-2 rounded-full border-stone-300 text-black/70 hover:text-black hover:bg-stone-200'
              }
            >
              {isMusic ? 'Show Portfolio' : 'Show Music'}
            </Button>
          </Link>
        </nav>
        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center space-x-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-black hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Link href={isMusic ? '/' : '/music'}>
            <Button
              size="sm"
              variant={isMusic ? 'default' : 'outline'}
              className={
                isMusic
                  ? 'rounded-full bg-gradient-to-r from-green-600 to-black text-white shadow-lg border-0 hover:from-green-700 hover:to-black'
                  : 'rounded-full border-stone-300 text-black/70 hover:text-black hover:bg-stone-200'
              }
            >
              {isMusic ? 'Portfolio' : 'Music'}
            </Button>
          </Link>
        </div>
      </motion.div>
    </header>
  );
} 