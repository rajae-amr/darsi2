import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * مكون البطاقة وفقًا للهوية البصرية لمنصة TeachSpace
 */
export function Card({ children, className = '', hover = true, onClick }: CardProps) {
  return (
    <div 
      onClick={onClick}
      className={`
        card
        ${onClick ? 'cursor-pointer' : ''}
        ${hover ? 'card-hover' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div 
      className={`
        card-header
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export function CardBody({ children, className = '' }: CardBodyProps) {
  return (
    <div 
      className={`
        card-body
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div 
      className={`
        card-footer
        ${className}
      `}
    >
      {children}
    </div>
  );
}

/**
 * مكون محتوى البطاقة (متوافق مع shadcn/ui)
 */
export function CardContent({ children, className = '' }: CardContentProps) {
  return (
    <div 
      className={`
        card-body
        ${className}
      `}
    >
      {children}
    </div>
  );
}

/**
 * مكون عنوان البطاقة (متوافق مع shadcn/ui)
 */
export function CardTitle({ children, className = '' }: CardTitleProps) {
  return (
    <h3 
      className={`
        card-title
        ${className}
      `}
    >
      {children}
    </h3>
  );
}

/**
 * مكون وصف البطاقة (متوافق مع shadcn/ui)
 */
export function CardDescription({ children, className = '' }: CardDescriptionProps) {
  return (
    <p 
      className={`
        card-description
        ${className}
      `}
    >
      {children}
    </p>
  );
}

export default Card;
