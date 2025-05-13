
import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ 
  onClick, 
  disabled = false, 
  className, 
  children 
}) => {
  return (
    <Button 
      onClick={onClick} 
      disabled={disabled}
      className={cn("w-full justify-start mb-2", className)}
      variant="outline"
    >
      {children}
    </Button>
  );
};

export default SidebarButton;
