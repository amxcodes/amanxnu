"use client";

import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Music, ExternalLink } from "lucide-react";
import { Button } from '@/components/ui/button'; 

const navItems = [
  { name: "About", href: "/#about" },
  { name: "Projects", href: "/#projects" },
  { name: "Contact", href: "/#contact" },
];

const handleNavClick = (href: string) => {
  window.location.href = href;
};


export default function MusicPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Original music tracks - the core content to keep
  const musicTracks = [
    {
      title: "Filhaal ( mein tera )",
      link: "https://open.spotify.com/track/4AEftPKRx1udzu8cQX24lu?si=1acc982938aa4d55",
      description: "Original track by Aman Anu"
    },
    {
      title: "shor.",
      link: "https://open.spotify.com/track/5a4E5p6vJJ9cfbCWIgv0be?si=1ebc3de55ecb4f3b",
      description: "Original track by Aman Anu"
    },
    {
      title: "Maahi - Home Session",
      link: "https://open.spotify.com/track/42O8a3XIBTnb066jxDraI3?si=c3f6a123c80448b0",
      description: "Original home session recording"
    },
    {
      title: "Neethaane",
      link: "https://open.spotify.com/track/6DC6YFQVsnkJfgxKoVsvXL?si=04759a13c55d44de",
      description: "Original track by Aman Anu"
    },
    {
      title: "Filhaal - reprised ( tu sun zara )",
      link: "https://open.spotify.com/track/5IgnZL4TO6Y0QzpwLtCzBS",
      description: "Reprised version of the original track"
    }
  ];

  // Spotify Artist Profile Link
  const spotifyProfile = "https://open.spotify.com/artist/1KOBkEytVbBS3NXg7yciQh";

  return (
    <main className="relative min-h-screen w-full bg-black text-neutral-100">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[40rem] h-[40rem] bg-fuchsia-900/20 rounded-full blur-[180px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[40rem] h-[40rem] bg-purple-800/20 rounded-full blur-[180px]"></div>
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center">
        <div className="w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-6">
          <Navbar 
            navItems={navItems}
            handleNavClick={handleNavClick}
            scrolled={scrolled}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mt-12 flex flex-col gap-8"
          >
            {/* Page Header */}
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
                My Music
              </h1>
              <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
                Original tracks and music by Aman Anu
              </p>
            </div>

            {/* Spotify Profile Link */}
            <div className="bg-neutral-900/50 backdrop-blur-xl border border-neutral-700/50 rounded-2xl p-6 text-center">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center justify-center gap-2">
                <Music className="w-6 h-6 text-fuchsia-400" />
                Spotify Profile
              </h2>
              <p className="text-neutral-400 mb-6">Listen to all my tracks on Spotify</p>
              <Button 
                asChild
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-3 rounded-xl transition-all duration-200"
              >
                <a href={spotifyProfile} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Open Spotify Profile
                </a>
              </Button>
            </div>

            {/* Original Music Tracks */}
            <div className="bg-neutral-900/50 backdrop-blur-xl border border-neutral-700/50 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                <Music className="w-6 h-6 text-fuchsia-400" />
                Original Tracks
              </h2>
              <div className="space-y-4">
                {musicTracks.map((track, index) => (
                  <motion.div
                    key={track.link}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-neutral-800/50 hover:bg-neutral-700/50 rounded-xl border border-neutral-700/30 hover:border-neutral-600/50 transition-all duration-200 group"
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-white group-hover:text-fuchsia-300 transition-colors">
                        {track.title}
                      </h3>
                      <p className="text-sm text-neutral-400 mt-1">
                        {track.description}
                      </p>
                    </div>
                    <Button 
                      asChild
                      variant="outline"
                      size="sm"
                      className="border-neutral-600 text-neutral-300 hover:bg-fuchsia-900/30 hover:border-fuchsia-500 hover:text-white transition-all duration-200"
                    >
                      <a href={track.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Listen
                      </a>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </main>
  );
}
