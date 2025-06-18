import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Design {
  src: string;
  link: string;
  label: string;
  aspect: 'video' | 'square';
}

const designs: Design[] = [
  {
    src: 'https://www.canva.com/design/DAGb4roq68A/sCoDp_DIF5VlIUt5d-cQ0A/view?embed',
    link:
      'https://www.canva.com/design/DAGb4roq68A/sCoDp_DIF5VlIUt5d-cQ0A/view?utm_content=DAGb4roq68A&utm_campaign=designshare&utm_medium=embeds&utm_source=link',
    label: 'LOOMLORE. by Aman Anu',
    aspect: 'video',
  },
  {
    src: 'https://www.canva.com/design/DAGbhlwhmKE/4rnpfBMddIJ51wSq9TcvdA/view?embed',
    link:
      'https://www.canva.com/design/DAGbhlwhmKE/4rnpfBMddIJ51wSq9TcvdA/view?utm_content=DAGbhlwhmKE&utm_campaign=designshare&utm_medium=embeds&utm_source=link',
    label: 'Seminar Presentation by Aman Anu',
    aspect: 'video',
  },
  {
    src: 'https://www.canva.com/design/DAGqI3cX9CM/AMxDyHflIU1KNJ3g27mL2g/view?embed',
    link:
      'https://www.canva.com/design/DAGqI3cX9CM/AMxDyHflIU1KNJ3g27mL2g/view?utm_content=DAGqI3cX9CM&utm_campaign=designshare&utm_medium=embeds&utm_source=link',
    label: 'Custom Designs by Aman Anu',
    aspect: 'video',
  },
  {
    src: 'https://www.canva.com/design/DAGenGEJ8Y0/rbHK2wMy6tm6JgnodNHuVA/view?embed',
    link:
      'https://www.canva.com/design/DAGenGEJ8Y0/rbHK2wMy6tm6JgnodNHuVA/view?utm_content=DAGenGEJ8Y0&utm_campaign=designshare&utm_medium=embeds&utm_source=link',
    label: 'Copy of AROHA 25 (1080×1350) by Bipin Damodaran',
    aspect: 'square',
  },
];

const AnimatedBackground: React.FC<{ isPaused: boolean }> = ({ isPaused }) => {
  const shapes = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 20 + Math.random() * 60,
    color: `hsla(${Math.random() * 360}, 70%, 50%, 0.1)`,
    duration: 15 + Math.random() * 20,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {shapes.map(shape => (
        <motion.div
          key={shape.id}
          className="absolute rounded-full"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: `${shape.size}vmin`,
            height: `${shape.size}vmin`,
            backgroundColor: shape.color,
            filter: 'blur(60px)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [`${shape.x}%`, `${shape.x + (Math.random() - 0.5) * 20}%`, `${shape.x}%`],
            y: [`${shape.y}%`, `${shape.y + (Math.random() - 0.5) * 20}%`, `${shape.y}%`],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
            delay: shape.delay,
            paused: isPaused,
          }}
        />
      ))}
    </div>
  );
};

const LazyEmbed: React.FC<Design> = ({ src, link, label, aspect }) => {
  const [loaded, setLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative w-full ${
        aspect === 'video' ? 'aspect-video' : 'aspect-square'
      } shadow-lg rounded-xl overflow-hidden mt-10 max-h-[60vh]`}
      onClick={() => setLoaded(true)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {loaded ? (
          <motion.iframe
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            loading="lazy"
            className="absolute inset-0 w-full h-full border-0"
            src={src}
            allow="fullscreen"
            allowFullScreen
          />
        ) : (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-zinc-900/50 flex flex-col items-center justify-center text-white cursor-pointer select-none group"
          >
            <AnimatedBackground isPaused={isHovered} />
            <div className="absolute inset-0 bg-black/30" />
            <div className="relative z-10 flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 border border-white/20 group-hover:bg-white/20 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              </div>
              <p className="animate-pulse-text text-sm">Click to View Design</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-xs text-white backdrop-blur-sm z-20"
      >
        {label}
      </a>
    </div>
  );
};

const CanvaSection: React.FC = () => {
  return (
    <div id="designs" className="mt-16">
      <h2 className="text-3xl font-bold mb-6 text-white">Canva Designs</h2>
      {designs.map((d) => (
        <LazyEmbed key={d.src} {...d} />
      ))}
    </div>
  );
};

export default CanvaSection; 