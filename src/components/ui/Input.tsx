import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Shared field shell: label + control + inline error. */
export function Field({
  label,
  htmlFor,
  required,
  error,
  children,
  className,
}: {
  label?: string;
  htmlFor?: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label htmlFor={htmlFor} className="text-midnight/80 text-sm font-medium">
          {label}
          {required && <span className="text-gold"> *</span>}
        </label>
      )}
      {children}
      {error && (
        <span className="text-xs text-[#b4534b]" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

export const inputClass =
  "w-full rounded-xl border border-midnight/15 bg-white/70 px-4 py-3 text-midnight outline-none transition-colors placeholder:text-midnight/40 focus:border-gold focus:bg-white";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
}

export function Input({ label, error, required, id, className, ...props }: InputProps) {
  return (
    <Field label={label} htmlFor={id} required={required} error={error}>
      <input
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        className={cn(inputClass, error && "border-[#b4534b]/60", className)}
        {...props}
      />
    </Field>
  );
}
