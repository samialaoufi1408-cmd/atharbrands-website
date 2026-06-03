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
        <label htmlFor={htmlFor} className="text-sm font-medium text-ivory/70">
          {label}
          {required && <span className="text-gold"> *</span>}
        </label>
      )}
      {children}
      {error && (
        <span className="text-xs text-[#d6a39c]" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

export const inputClass =
  "w-full rounded-xl border border-ivory/15 bg-ivory/[0.04] px-4 py-3 text-ivory outline-none transition-colors placeholder:text-ivory/35 focus:border-gold focus:bg-ivory/[0.06]";

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
        className={cn(inputClass, error && "border-[#d6a39c]/60", className)}
        {...props}
      />
    </Field>
  );
}
