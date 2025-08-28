'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useIsMobile } from '@/hooks/use-mobile';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ExternalLink, X, Palette } from 'lucide-react';

interface Design {
  link: string;
  label: string;
  aspect: 'video' | 'square';
  emoji: string;
  description: string;
}

const designs: Design[] = [
  {
    link: 'https://www.canva.com/design/DAGb4roq68A/sCoDp_DIF5VlIUt5d-cQ0A/view',
    label: 'LOOMLORE. by Aman Anu',
    aspect: 'video',
    emoji: '🎨',
    description: 'Creative presentation design'
  },
  {
    link: 'https://www.canva.com/design/DAGbhlwhmKE/4rnpfBMddIJ51wSq9TcvdA/view',
    label: 'Seminar Presentation by Aman Anu',
    aspect: 'video',
    emoji: '📊',
    description: 'Professional seminar slides'
  },
  {
    link: 'https://www.canva.com/design/DAGqI3cX9CM/AMxDyHflIU1KNJ3g27mL2g/view',
    label: 'Custom Designs by Aman Anu',
    aspect: 'video',
    emoji: '✨',
    description: 'Custom creative designs'
  },
  {
    link: 'https://www.canva.com/design/DAGenGEJ8Y0/rbHK2wMy6tm6JgnodNHuVA/view',
    label: 'Copy of AROHA 25 (1080×1350) by Bipin Damodaran',
    aspect: 'square',
    emoji: '🎯',
    description: 'Event poster design'
  },
];

const DesignsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const isMobile = useIsMobile();
  
  if (isMobile) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="w-[95vw] max-w-sm mx-4 glass-modal p-0 overflow-hidden max-h-[85vh]">
          <div className="relative">
            {/* Header */}
            <DialogHeader className="p-4 pb-3 text-center border-b border-zinc-700/50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Palette className="text-white" size={20} />
                  <span className="text-sm text-zinc-400">Design Portfolio</span>
                </div>
                <DialogClose asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white rounded-full">
                    <X size={16} />
                  </Button>
                </DialogClose>
              </div>
              <DialogTitle className="text-lg font-semibold text-white leading-tight">
                My Canva Designs
              </DialogTitle>
              <p className="text-xs text-zinc-400 mt-1">
                {designs.length} creative projects
              </p>
            </DialogHeader>
            
            {/* Content */}
            <div className="p-4 space-y-3 max-h-[50vh] overflow-y-auto custom-scrollbar">
              {designs.map((design, index) => (
                <motion.a
                  key={design.link}
                  href={design.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-zinc-800/30 hover:bg-zinc-700/50 rounded-lg border border-zinc-700/30 hover:border-zinc-600/50 transition-all duration-200 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-2xl">{design.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-white text-sm group-hover:text-zinc-200 transition-colors line-clamp-1">
                      {design.label}
                    </h4>
                    <p className="text-xs text-zinc-400 group-hover:text-zinc-300 transition-colors line-clamp-1">
                      {design.description}
                    </p>
                  </div>
                  <ExternalLink size={16} className="text-zinc-500 group-hover:text-white transition-colors" />
                </motion.a>
              ))}
            </div>
            
            {/* Footer */}
            <div className="p-4 pt-2 border-t border-zinc-700/30">
              <p className="text-xs text-zinc-500 text-center">
                Tap any design to open in Canva (opens in new tab)
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  
  // Desktop version
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90vw] max-w-2xl glass-modal p-0 overflow-hidden max-h-[80vh]">
        <div className="relative">
          {/* Header */}
          <DialogHeader className="p-6 pb-4 text-center border-b border-zinc-700/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Palette className="text-white" size={24} />
                <span className="text-zinc-400">Design Portfolio</span>
              </div>
              <DialogClose asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 text-zinc-400 hover:text-white rounded-full">
                  <X size={20} />
                </Button>
              </DialogClose>
            </div>
            <DialogTitle className="text-2xl font-semibold text-white leading-tight mb-2">
              My Canva Designs
            </DialogTitle>
            <p className="text-sm text-zinc-400">
              A collection of {designs.length} creative projects and presentations
            </p>
          </DialogHeader>
          
          {/* Content */}
          <div className="p-6 space-y-4 max-h-[50vh] overflow-y-auto custom-scrollbar">
            <div className="grid gap-4">
              {designs.map((design, index) => (
                <motion.a
                  key={design.link}
                  href={design.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-zinc-800/30 hover:bg-zinc-700/50 rounded-xl border border-zinc-700/30 hover:border-zinc-600/50 transition-all duration-200 group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-3xl">{design.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-white text-base group-hover:text-zinc-200 transition-colors mb-1">
                      {design.label}
                    </h4>
                    <p className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">
                      {design.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`inline-block w-2 h-2 rounded-full ${
                        design.aspect === 'video' ? 'bg-blue-400' : 'bg-green-400'
                      }`} />
                      <span className="text-xs text-zinc-500 capitalize">
                        {design.aspect === 'video' ? 'Presentation' : 'Square Format'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-500 group-hover:text-white transition-colors">
                    <span className="text-sm font-medium">Open</span>
                    <ExternalLink size={18} />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Footer */}
          <div className="p-6 pt-4 border-t border-zinc-700/30">
            <div className="flex items-center justify-between">
              <p className="text-sm text-zinc-500">
                Click any design to open in Canva (opens in new tab)
              </p>
              <Button 
                variant="outline" 
                onClick={onClose}
                className="border-zinc-600 text-zinc-300 hover:bg-zinc-800 hover:text-white"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
const DesignPreview: React.FC = () => {
  const designCount = 4;
  const isMobile = useIsMobile();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <>
      <motion.div
        onClick={() => setIsModalOpen(true)}
        className={`relative w-full aspect-video bg-gradient-to-br from-zinc-900/30 to-zinc-800/30 backdrop-blur-sm border border-zinc-700/50 rounded-xl overflow-hidden group cursor-pointer ${isMobile ? 'mt-4 touch-target active:scale-95 mobile-optimized' : 'mt-6'}`}
        whileHover={!isMobile ? { scale: 1.02, y: -5 } : {}}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.3 }}
      >
        <div className={`absolute inset-0 flex flex-col items-center justify-center text-center ${isMobile ? 'p-4 safe-area-padding' : 'p-8'}`}>
          {/* Grid of emoji icons */}
          <div className={`grid grid-cols-2 ${isMobile ? 'gap-2 mb-4' : 'gap-4 mb-6'}`}>
            <div className={`${isMobile ? 'text-2xl' : 'text-3xl'} group-hover:scale-110 transition-transform duration-300 prevent-select`}>🎨</div>
            <div className={`${isMobile ? 'text-2xl' : 'text-3xl'} group-hover:scale-110 transition-transform duration-300 prevent-select`} style={{ transitionDelay: '50ms' }}>📊</div>
            <div className={`${isMobile ? 'text-2xl' : 'text-3xl'} group-hover:scale-110 transition-transform duration-300 prevent-select`} style={{ transitionDelay: '100ms' }}>✨</div>
            <div className={`${isMobile ? 'text-2xl' : 'text-3xl'} group-hover:scale-110 transition-transform duration-300 prevent-select`} style={{ transitionDelay: '150ms' }}>🎯</div>
          </div>
          
          <h3 className={`text-white font-semibold ${isMobile ? 'text-lg mb-1' : 'text-xl mb-2'} group-hover:text-zinc-200 transition-colors`}>
            View My Designs
          </h3>
          <p className={`text-zinc-400 ${isMobile ? 'text-xs mb-3' : 'text-sm mb-4'} group-hover:text-zinc-300 transition-colors px-2`}>
            {designCount} Canva Projects & Presentations
          </p>
          
          <div className={`flex items-center text-zinc-500 group-hover:text-white transition-colors ${isMobile ? 'text-xs' : ''}`}>
            <span className={`${isMobile ? 'text-xs mr-1' : 'text-sm mr-2'}`}>{isMobile ? 'Tap to view all' : 'Click to view all'}</span>
            <Palette size={isMobile ? 14 : 16} />
          </div>
        </div>
        
        {/* Subtle animated background */}
        <div className="absolute inset-0 opacity-20">
          <motion.div
            className={`absolute ${isMobile ? 'top-2 left-2 w-6 h-6' : 'top-4 left-4 w-8 h-8'} bg-blue-500/20 rounded-full blur-sm`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className={`absolute ${isMobile ? 'bottom-2 right-2 w-4 h-4' : 'bottom-4 right-4 w-6 h-6'} bg-purple-500/20 rounded-full blur-sm`}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>
      </motion.div>
      
      <DesignsModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

const CanvaSection: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div id="designs" className={isMobile ? 'mt-12' : 'mt-16'}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className={`font-bold ${isMobile ? 'text-2xl mb-4' : 'text-3xl mb-6'} text-white`}>Design Portfolio</h2>
        <p className={`text-zinc-400 ${isMobile ? 'text-sm mb-4' : 'mb-6'} max-w-2xl`}>
          Explore my collection of creative designs, presentations, and visual content. 
          Fast loading, clean interface, no lag.
        </p>
        <DesignPreview />
      </motion.div>
    </div>
  );
};

export default CanvaSection; 