'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Bell, Bookmark, Group, GroupIcon, Home, LucideLayoutPanelTop, Mail, Menu, X } from 'lucide-react';
import Link from 'next/link';
import MessagesButton from "./MessagesButton";
import NotificationsButton from "./NotificationsButton";

interface MenuBarSmallProps {
  className?: string;
}

export default function MenuBarSmall({ className = "" }: MenuBarSmallProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Button - Visible on mobile */}
      <Button
        variant="ghost"
        className="sm:hidden fixed top-4 left-4 z-50 bg-card rounded-full p-2 h-10 w-10 shadow-lg"
        onClick={toggleMenu}
        title="Menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>

      {/* Overlay - Visible when menu is open */}
      {isOpen && (
        <div 
          className="sm:hidden fixed inset-0 bg-black/50 z-40"
          onClick={closeMenu}
        />
      )}

      {/* Sidebar Menu */}
      <div className={`
        sm:hidden fixed top-0 left-0 h-full w-64 bg-card shadow-xl z-40
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        ${className}
      `}>
        {/* Menu Header */}
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold">Navigation</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={closeMenu}
            className="h-8 w-8"
          >
            <X size={16} />
          </Button>
        </div>
        
        {/* Menu Items */}
        <div className="p-4 space-y-2">
          <Button
            variant="ghost"
            className="flex items-center justify-start gap-3 w-full"
            title="Home"
            asChild
            onClick={closeMenu}
          >
            <Link href="/">
              <Home />
              <span>Home</span>
            </Link>
          </Button>
          
        
          
        
          
          <Button
            variant="ghost"
            className="flex items-center justify-start gap-3 w-full"
            title="Notification"
            asChild
            onClick={closeMenu}
          >
            <Link href="/notifications">
              <Bell />
              <span>Notification</span>
            </Link>
          </Button>

          <Button
            variant="ghost"
            className="flex items-center justify-start gap-3 w-full"
            title="Messages"
            asChild
            onClick={closeMenu}
          >
            <Link href="/messages">
              <Mail/>
              <span>Messages</span>
            </Link>
          </Button>

          <Button
            variant="ghost"
            className="flex items-center justify-start gap-3 w-full"
            title="Communities"
            asChild
            onClick={closeMenu}
          >
            <Link href="/kothbiro">
              <GroupIcon />
              <span>Kothbiro</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="flex items-center justify-start gap-3 w-full"
            title="Wadau"
            asChild
            onClick={closeMenu}
          >
            <Link href="/wadau">
              <GroupIcon />
              <span>Wadau</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="flex items-center justify-start gap-3 w-full"
            title="Bookmarks"
            asChild
            onClick={closeMenu}
          >
            <Link href="/bookmarks">
              <Bookmark />
              <span>Bookmarks</span>
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}