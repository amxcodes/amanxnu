"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface Props {
  images: string[];
  index: number;
  title: string;
  onClose: () => void;
  setIndex: (n: number) => void;
}

const FullscreenViewer: React.FC<Props> = ({ images, index, title, onClose, setIndex }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
        <motion.div
          initial={{ scale: 0.8, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative max-w-[95vw] max-h-[95vh] rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.3)]"
          onClick={(e) => e.stopPropagation()}
          style={{ perspective: '1500px', transformStyle: 'preserve-3d' }}
        >
          <motion.img
            src={images[index]}
            alt={`${title} - Fullscreen View`}
            className="w-full h-full object-contain bg-black/20 backdrop-blur-xl"
            initial={{ rotateX: 15, rotateY: -15, scale: 0.95 }}
            animate={{ rotateX: 0, rotateY: 0, scale: 1 }}
            exit={{ rotateX: 15, rotateY: -15, scale: 0.95 }}
            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
            style={{ transformStyle: 'preserve-3d' }}
          />
          <motion.button
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/20 backdrop-blur-xl text-white/90 hover:bg-white/20 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
export default FullscreenViewer; 