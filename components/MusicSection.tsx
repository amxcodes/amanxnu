"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Instagram, Music, Pen } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";

export default function MusicSection() {
  const [tab, setTab] = useState("latest");

  return (
    <div className="min-h-screen w-full bg-black relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 to-black/50 pointer-events-none" />
      
      {/* Main content */}
      <ScrollArea className="relative h-[calc(100vh-4rem)] w-full">
        <div className="flex flex-col items-center w-full pb-6">
          {/* Hero section */}
          <div className="w-full bg-gradient-to-b from-black to-transparent pt-8 pb-12 px-6">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-emerald-200">
                My Music Portfolio
              </h2>
              <p className="text-emerald-200/80 text-lg max-w-2xl">
                Explore my latest tracks, artistic endeavors, and musical writings
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="sticky top-0 w-full bg-black/80 backdrop-blur-lg z-10 px-6 py-3">
            <Tabs value={tab} onValueChange={setTab} className="max-w-7xl mx-auto">
              <TabsList className="bg-white/5 p-1 rounded-full border border-white/10 shadow-lg inline-flex gap-1">
                <TabsTrigger
                  value="latest"
                  className={cn(
                    "rounded-full data-[state=active]:bg-emerald-500 data-[state=active]:text-black text-sm font-medium text-gray-400 hover:text-white px-4 py-2 flex items-center gap-2 transition-all"
                  )}
                >
                  <Music className="h-4 w-4" /> Latest
                </TabsTrigger>
                <TabsTrigger
                  value="art"
                  className={cn(
                    "rounded-full data-[state=active]:bg-emerald-500 data-[state=active]:text-black text-sm font-medium text-gray-400 hover:text-white px-4 py-2 flex items-center gap-2 transition-all"
                  )}
                >
                  <Instagram className="h-4 w-4" /> Art
                </TabsTrigger>
                <TabsTrigger
                  value="writing"
                  className={cn(
                    "rounded-full data-[state=active]:bg-emerald-500 data-[state=active]:text-black text-sm font-medium text-gray-400 hover:text-white px-4 py-2 flex items-center gap-2 transition-all"
                  )}
                >
                  <Pen className="h-4 w-4" /> Writing
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Content */}
          <div className="w-full max-w-7xl mx-auto px-6 mt-8">
            {tab === "latest" && <LatestSection />}
            {tab === "art" && <ArtSection />}
            {tab === "writing" && <WritingSection />}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

function LatestSection() {
  const spotifyEmbed = "https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator";
  const youtubeEmbed = "https://www.youtube.com/embed/videoseries?list=PLFgquLnL59alCl_2TQvOiD5Vgm1hCaGSI";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Spotify */}
      <div className="bg-white/5 rounded-2xl p-1 shadow-2xl shadow-black/20">
        <div className="aspect-[4/3] w-full rounded-xl overflow-hidden">
          <iframe
            src={spotifyEmbed}
            width="100%"
            height="100%"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
            loading="lazy"
            className="bg-black"
          />
        </div>
      </div>
      {/* YouTube */}
      <div className="bg-white/5 rounded-2xl p-1 shadow-2xl shadow-black/20">
        <div className="aspect-[4/3] w-full rounded-xl overflow-hidden">
          <iframe
            src={youtubeEmbed}
            title="Latest YouTube uploads"
            width="100%"
            height="100%"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            loading="lazy"
            className="bg-black"
          />
        </div>
      </div>
    </div>
  );
}

function ArtSection() {
  const posts = [
    "https://www.instagram.com/p/CzYbY0eM1dR/",
    "https://www.instagram.com/p/CydPz2vMf9x/",
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((url) => (
        <div key={url} className="bg-white/5 rounded-2xl p-1 shadow-2xl shadow-black/20">
          <iframe
            src={`${url}embed`}
            width="100%"
            height="450"
            className="rounded-xl overflow-hidden w-full bg-black"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}

function WritingSection() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Small preview card */}
      <div className="flex justify-center">
        <Card
          onClick={() => setOpen(true)}
          className="cursor-pointer bg-white/5 hover:bg-white/10 transition-all border border-white/10 rounded-2xl p-6 w-full max-w-sm text-center select-none"
        >
          <CardTitle className="text-white/90 text-lg">Shards – Short Story (PDF)</CardTitle>
          <p className="text-gray-400 text-sm mt-2">Tap to read</p>
        </Card>
      </div>

      {/* Modal with PDF viewer */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 w-[90vw] max-w-3xl overflow-hidden rounded-3xl">
          <iframe
            src="/shards.pdf"
            className="w-full h-[80vh] rounded-3xl border-0"
          />
          <DialogClose className="absolute top-2 right-2 text-white/80 hover:text-white" />
        </DialogContent>
      </Dialog>
    </>
  );
} 