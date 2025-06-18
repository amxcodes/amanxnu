import React, { useRef, useState, useEffect } from 'react';

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

const LazyEmbed: React.FC<Design> = ({ src, link, label, aspect }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '200px' }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative w-full ${
        aspect === 'video' ? 'aspect-video' : 'aspect-square'
      } shadow-lg rounded-xl overflow-hidden mt-10 max-h-[60vh]`}
    >
      {visible ? (
        <iframe
          loading="lazy"
          className="absolute inset-0 w-full h-full border-0"
          src={src}
          allow="fullscreen"
          allowFullScreen
        />
      ) : (
        <div className="absolute inset-0 bg-zinc-800/30 flex items-center justify-center text-white text-sm">
          Loading…
        </div>
      )}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-xs text-white backdrop-blur-sm"
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