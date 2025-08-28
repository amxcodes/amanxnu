'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useIsMobile } from '@/hooks/use-mobile';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ExternalLink, X, ArrowLeft, Share2, Copy } from 'lucide-react';

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

const DesignCard: React.FC<Design & { onClick: () => void }> = ({ link, label, aspect, emoji, description, onClick }) => {
  const isMobile = useIsMobile();
  
  return (
    <motion.div
      onClick={onClick}
      className={`relative w-full ${
        aspect === 'video' ? 'aspect-video' : 'aspect-square'
      } bg-zinc-900/30 backdrop-blur-sm border border-zinc-700/50 rounded-xl overflow-hidden group cursor-pointer transition-all duration-300 hover:bg-zinc-800/50 hover:border-zinc-600/70 ${
        isMobile 
          ? 'active:scale-95 active:bg-zinc-800/60 touch-target min-h-[140px]' 
          : 'hover:scale-[1.02]'
      }`}
      whileHover={!isMobile ? { y: -5 } : {}}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Touch feedback overlay for mobile */}
      {isMobile && (
        <div className="absolute inset-0 bg-white/5 opacity-0 group-active:opacity-100 transition-opacity duration-150 pointer-events-none" />
      )}
      
      <div className={`absolute inset-0 flex flex-col items-center justify-center text-center ${
        isMobile ? 'p-4 safe-area-padding' : 'p-6'
      }`}>
        <div className={`${
          isMobile ? 'text-4xl sm:text-5xl mb-3' : 'text-6xl mb-4'
        } group-hover:scale-110 transition-transform duration-300 select-none`}>
          {emoji}
        </div>
        <h3 className={`text-white font-semibold ${
          isMobile ? 'text-base sm:text-lg mb-1' : 'text-lg mb-2'
        } group-hover:text-zinc-200 transition-colors px-2 line-clamp-2`}>
          {label}
        </h3>
        <p className={`text-zinc-400 ${
          isMobile ? 'text-xs sm:text-sm' : 'text-sm'
        } group-hover:text-zinc-300 transition-colors px-2 text-center line-clamp-2`}>
          {description}
        </p>
        
        {/* Action indicator */}
        <div className={`absolute ${
          isMobile ? 'bottom-3 right-3' : 'bottom-4 right-4'
        } text-zinc-500 group-hover:text-white transition-colors`}>
          <div className={`p-1 rounded-full ${
            isMobile ? 'bg-zinc-800/50' : ''
          }`}>
            <ExternalLink size={isMobile ? 16 : 20} />
          </div>
        </div>
        
        {/* Mobile tap hint */}
        {isMobile && (
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
            <div className="text-xs text-zinc-500 opacity-60">
              Tap for options
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const MobileBottomSheet: React.FC<{ design: Design | null; isOpen: boolean; onClose: () => void }> = ({ design, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  const handleCopyLink = async () => {
    if (design?.link) {
      try {
        await navigator.clipboard.writeText(design.link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy link:', err);
      }
    }
  };
  
  const handleShare = async () => {
    if (design && navigator.share) {
      try {
        await navigator.share({
          title: design.label,
          text: design.description,
          url: design.link,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      handleCopyLink();
    }
  };
  
  if (!design) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ 
              type: 'spring', 
              damping: 25, 
              stiffness: 300,
              duration: 0.3
            }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-900/95 backdrop-blur-xl border-t border-zinc-700/50 rounded-t-3xl shadow-2xl"
            style={{
              paddingBottom: 'max(env(safe-area-inset-bottom), 16px)',
            }}
          >
            {/* Drag Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 bg-zinc-600 rounded-full" />
            </div>
            
            {/* Content */}
            <div className="px-6 pb-6">
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="text-5xl">{design.emoji}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold text-white leading-tight mb-1">
                    {design.label}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {design.description}
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={onClose}
                  className="h-10 w-10 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full flex-shrink-0"
                >
                  <X size={20} />
                </Button>
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  asChild
                  size="lg"
                  className="w-full h-14 bg-white text-black hover:bg-gray-200 font-medium text-base rounded-2xl shadow-lg"
                >
                  <a href={design.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={20} className="mr-3" />
                    Open in Canva
                  </a>
                </Button>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline"
                    size="lg"
                    onClick={handleShare}
                    className="h-12 border-zinc-600 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-xl"
                  >
                    <Share2 size={18} className="mr-2" />
                    Share
                  </Button>
                  
                  <Button 
                    variant="outline"
                    size="lg"
                    onClick={handleCopyLink}
                    className="h-12 border-zinc-600 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-xl"
                    disabled={copied}
                  >
                    <Copy size={18} className="mr-2" />
                    {copied ? 'Copied!' : 'Copy Link'}
                  </Button>
                </div>
              </div>
              
              {/* Footer */}
              <p className="text-xs text-zinc-500 text-center mt-6">
                Tap outside or drag down to close
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const DesktopModal: React.FC<{ design: Design | null; isOpen: boolean; onClose: () => void }> = ({ design, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopyLink = async () => {
    if (design?.link) {
      try {
        await navigator.clipboard.writeText(design.link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy link:', err);
      }
    }
  };
  
  if (!design) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90vw] max-w-md glass-modal p-0 overflow-hidden">
        <div className="relative">
          {/* Header */}
          <DialogHeader className="p-6 pb-4 text-center">
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl">{design.emoji}</div>
              <DialogClose asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 text-zinc-400 hover:text-white rounded-full">
                  <X size={20} />
                </Button>
              </DialogClose>
            </div>
            <DialogTitle className="text-xl font-semibold text-white leading-tight mb-2">
              {design.label}
            </DialogTitle>
            <p className="text-sm text-zinc-400 leading-relaxed">
              {design.description}
            </p>
          </DialogHeader>
          
          {/* Content */}
          <div className="p-6 pt-0">
            <div className="space-y-4">
              <Button 
                asChild
                size="lg"
                className="w-full h-12 bg-white text-black hover:bg-gray-200 font-medium rounded-xl"
              >
                <a href={design.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={18} className="mr-3" />
                  Open in Canva
                </a>
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  onClick={handleCopyLink}
                  className="h-10 border-zinc-600 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-lg"
                  disabled={copied}
                >
                  <Copy size={16} className="mr-2" />
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={onClose}
                  className="h-10 border-zinc-600 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-lg"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const DesignsPage: React.FC = () => {
  const isMobile = useIsMobile();
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleDesignClick = (design: Design) => {
    setSelectedDesign(design);
    setIsModalOpen(true);
  };
  
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedDesign(null);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-zinc-900/20 via-black to-zinc-900/20" />
      
      <div className={`relative z-10 container mx-auto ${isMobile ? 'px-4 py-8' : 'px-4 py-12'}`}>
        {/* Header */}
        <div className={`text-center ${isMobile ? 'mb-8' : 'mb-12'}`}>
          <Link 
            href="/"
            className={`inline-flex items-center text-zinc-400 hover:text-white transition-colors ${isMobile ? 'mb-4 text-sm' : 'mb-6'}`}
          >
            <ArrowLeft size={isMobile ? 16 : 20} className="mr-2" />
            Back to Portfolio
          </Link>
          
          <motion.h1 
            className={`font-bold ${isMobile ? 'text-3xl sm:text-4xl mb-3' : 'text-4xl md:text-6xl mb-4'} bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Design Portfolio
          </motion.h1>
          
          <motion.p 
            className={`text-zinc-400 ${isMobile ? 'text-base px-4' : 'text-lg'} max-w-2xl mx-auto`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A collection of my creative designs and presentations
          </motion.p>
        </div>

        {/* Designs grid */}
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-1 md:grid-cols-2 gap-6'} max-w-4xl mx-auto`}>
          {designs.map((design, index) => (
            <motion.div
              key={design.link}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <DesignCard {...design} onClick={() => handleDesignClick(design)} />
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.div 
          className={`text-center ${isMobile ? 'mt-12' : 'mt-16'} text-zinc-500 ${isMobile ? 'text-xs' : 'text-sm'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p>{isMobile ? 'Tap on any design to view on Canva (opens in new tab)' : 'Click on any design to view on Canva (opens in new tab)'}</p>
        </motion.div>
      </div>
      
      {/* Design Modals */}
      {isMobile ? (
        <MobileBottomSheet 
          design={selectedDesign}
          isOpen={isModalOpen}
          onClose={handleModalClose}
        />
      ) : (
        <DesktopModal 
          design={selectedDesign}
          isOpen={isModalOpen}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default DesignsPage;