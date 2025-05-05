import React from 'react';

type NavLinkProps = {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export function NavLink({ to, children, className = '', onClick }: NavLinkProps) {
  // In a real app, we would use React Router's NavLink
  const isActive = window.location.pathname === to;
  
  return (
    <a 
      href={to} 
      onClick={(e) => {
        e.preventDefault();
        if (onClick) onClick();
        // In a real app with React Router, we would use navigation
        // Instead of updating window.location
        window.location.pathname = to;
      }}
      className={`${className} font-medium hover:text-blue-600 transition-colors ${isActive ? 'text-blue-600' : ''}`}
    >
      {children}
    </a>
  );
}