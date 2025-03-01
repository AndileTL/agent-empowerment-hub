
import * as React from "react";
import { cn } from "@/lib/utils";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
}

export function Tooltip({ content, children }: TooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const [position, setPosition] = React.useState({ top: 0, left: 0 });
  const childRef = React.useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (childRef.current) {
      const rect = childRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top - 10,
        left: rect.left + rect.width / 2,
      });
    }
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <div className="relative inline-block">
      <div
        ref={childRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="cursor-help"
      >
        {children}
      </div>
      {isVisible && (
        <div
          className={cn(
            "absolute z-50 p-2 bg-black text-white text-xs rounded shadow-lg transition-opacity",
            "transform -translate-x-1/2 -translate-y-full mb-2"
          )}
          style={{
            top: position.top - 30,
            left: position.left,
            maxWidth: "200px",
            opacity: isVisible ? 1 : 0,
          }}
        >
          {content}
          <div
            className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black"
            style={{ width: 0, height: 0 }}
          />
        </div>
      )}
    </div>
  );
}
