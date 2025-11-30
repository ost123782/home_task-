interface LoadingSpinnerProps {
  message?: string;
  className?: string;
}

export const LoadingSpinner = ({ message = 'Loading...', className = '' }: LoadingSpinnerProps) => {
  return (
    <div className={`flex items-center justify-center min-h-[60vh] ${className}`}>
      <div className="text-white text-xl">{message}</div>
    </div>
  );
};

