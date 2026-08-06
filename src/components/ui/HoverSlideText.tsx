import { cn } from '@/lib/utils';

interface HoverSlideTextProps {
  text: string;
  className?: string;
  textClassName?: string;
}

export function HoverSlideText({ text, className, textClassName }: HoverSlideTextProps) {
  return (
    <div className={cn("relative overflow-hidden flex items-center h-[1.2em]", className)}>
      {/* Invisible text to give the container intrinsic width */}
      <span className="opacity-0 invisible pointer-events-none whitespace-nowrap">{text}</span>
      
      {/* Default text - moves UP on hover */}
      <span className={cn("absolute inset-0 flex items-center transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:-translate-y-[110%]", textClassName)}>
        {text}
      </span>
      {/* Hover text - moves IN FROM BOTTOM on hover */}
      <span className={cn("absolute inset-0 flex items-center translate-y-[110%] transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-y-0", textClassName)}>
        {text}
      </span>
    </div>
  );
}
