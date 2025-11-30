import { type InputHTMLAttributes, type LabelHTMLAttributes } from 'react';

interface FormFieldProps {
  label: string;
  id: string;
  error?: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
}

export const FormField = ({ label, id, error, inputProps, labelProps }: FormFieldProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-2"
        {...labelProps}
      >
        {label}
      </label>
      <input
        id={id}
        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none transition-colors"
        {...inputProps}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

