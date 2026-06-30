import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Input({
  label,
  error,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        {...props}
        className={`
          w-full
          rounded-lg
          border
          border-gray-300
          px-3
          py-2
          outline-none
          transition
          focus:border-indigo-500
          focus:ring-2
          focus:ring-indigo-200
          ${className}
        `}
      />

      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}