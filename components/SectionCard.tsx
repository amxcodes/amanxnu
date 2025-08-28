import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface SectionCardProps {
  title: string;
  backgroundImage?: string; // Path to the background image
  icon?: React.ReactNode; // Optional icon prop
  children: React.ReactNode;
  className?: string;
}

const SectionCard: React.FC<SectionCardProps> = ({ title, backgroundImage, icon, children, className }) => {
  return (
    <div className={cn("relative w-full rounded-3xl overflow-hidden shadow-lg", className)}>
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt={`${title} background`}
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
      )}
      <div className="relative z-10 p-6 bg-black/50 text-white h-full flex flex-col justify-end">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          {title}
        </h2>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default SectionCard;
