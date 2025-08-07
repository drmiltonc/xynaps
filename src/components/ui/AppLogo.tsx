'use client';

import Image from "next/image";

interface AppLogoProps {
  className?: string;
  size?: 'small' | 'default' | 'large';
}

export default function AppLogo({ className, size = 'default' }: AppLogoProps) {
  const dimensions = {
    small: { width: 32, height: 32 },
    default: { width: 64, height: 64 },
    large: { width: 120, height: 120 }
  };

  const { width, height } = dimensions[size];

  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src="/xynaps_logo.png"
        alt="Xynaps - Medical AI Assistant"
        width={width}
        height={height}
        className="object-contain"
        priority
        onError={(e) => {
          // Fallback to text if image fails to load
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const textFallback = document.createElement('div');
          textFallback.className = 'font-bold text-blue-600 text-xl';
          textFallback.textContent = 'Xynaps';
          target.parentNode?.appendChild(textFallback);
        }}
      />
    </div>
  );
}
