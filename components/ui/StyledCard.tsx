"use client";

import React from 'react';
import Image from 'next/image';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
import { Button } from './button'; // Assuming button component exists

interface StyledCardTag {
  icon?: React.ReactNode;
  text: string;
}

interface StyledCardAction {
  text: string;
  onClick?: () => void;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  href?: string;
  target?: string;
  rel?: string;
}

interface StyledCardProps {
  title: string;
  description?: string;
  imageUrl?: string;
  tags?: StyledCardTag[];
  actions?: StyledCardAction[];
  children?: React.ReactNode;
  className?: string;
  imageClassName?: string;
  contentClassName?: string;
  imageAsBackground?: boolean; // New prop to control image behavior
}

const StyledCard: React.FC<StyledCardProps> = ({
  title,
  description,
  imageUrl,
  tags,
  actions,
  children,
  className,
  imageClassName,
  contentClassName,
  imageAsBackground = false, // Default to image as a separate block at the top
}) => {
  return (
    <div
      className={cn(
        "bg-neutral-900/70 backdrop-blur-md border border-neutral-700/50 rounded-3xl shadow-xl overflow-hidden flex flex-col group",
        "transition-all duration-300 ease-in-out hover:shadow-cyan-400/20 hover:border-neutral-600",
        className
      )}
    >
      {imageUrl && (
        <div className={cn(
          "relative w-full overflow-hidden",
          imageAsBackground ? "absolute inset-0 z-0" : "aspect-[16/8]", // Adjust aspect ratio for top image
          imageClassName
        )}>
          <Image
            src={imageUrl}
            alt={title || "Card background"}
            layout="fill"
            objectFit="cover"
            className={cn(
              "transition-transform duration-500 ease-in-out",
              !imageAsBackground && "group-hover:scale-105"
            )}
          />
          {imageAsBackground && <div className="absolute inset-0 bg-black/50 z-10"></div>} {/* Overlay for background image */} 
          {tags && tags.length > 0 && (
            <div className={cn(
              "absolute top-4 left-4 flex flex-wrap gap-2",
              imageAsBackground ? "z-20" : "z-10" // Ensure tags are above overlay if image is background
            )}>
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/20 shadow-md"
                >
                  {tag.icon}
                  {tag.text}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
      <div className={cn(
        "p-6 flex flex-col flex-grow",
        imageAsBackground ? "relative z-20" : "", // Ensure content is above background image overlay
        contentClassName
      )}>
        {!imageUrl && tags && tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-neutral-800/80 backdrop-blur-sm text-neutral-200 text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-neutral-700"
                >
                  {tag.icon}
                  {tag.text}
                </span>
              ))}
            </div>
          )
        }
        <h3 className={cn(
          "text-2xl font-semibold mb-2",
          imageAsBackground ? "text-white" : "text-neutral-100"
        )}>{title}</h3>
        {description && (
          <p className={cn(
            "text-sm mb-4 leading-relaxed flex-grow",
            imageAsBackground ? "text-neutral-300" : "text-neutral-400"
          )}>{description}</p>
        )}
        {children && <div className="mb-4 flex-grow">{children}</div>}
        {actions && actions.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-3 pt-4 border-t border-neutral-700/60">
            {actions.map((action, index) => (
              <Button
                key={index}
                onClick={action.onClick}
                variant={action.variant || (index === 0 ? 'default' : 'outline')}
                asChild={!!action.href} // Use asChild if href is present
                className={cn(
                  "rounded-full px-5 py-2.5 text-xs sm:text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-105",
                  action.variant === 'default' || (index === 0 && !action.variant)
                    ? "bg-white text-black hover:bg-neutral-200 shadow-lg hover:shadow-neutral-300/50"
                    : "border-neutral-600 text-neutral-300 hover:bg-neutral-800 hover:border-neutral-500 hover:text-white bg-neutral-800/50 hover:shadow-lg hover:shadow-neutral-700/50"
                )}
              >
                {action.href ? (
                  <a href={action.href} target={action.target || "_blank"} rel={action.rel || "noopener noreferrer"}>
                    {action.text}
                  </a>
                ) : (
                  action.text
                )}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StyledCard;