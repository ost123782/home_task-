import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`bg-white rounded-2xl shadow-2xl p-8 ${className}`}>
      {children}
    </div>
  );
};

