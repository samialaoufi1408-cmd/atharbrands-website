import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Field, inputClass } from "./Input";
import { Icon } from "./Icon";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  placeholder?: string;
  options: readonly string[];
}

export function Select({
  label,
  error,
  required,
  id,
  className,
  placeholder,
  options,
  ...props
}: SelectProps) {
  return (
    <Field label={label} htmlFor={id} required={required} error={error}>
      <div className="relative">
        <select
          id={id}
          required={required}
          aria-invalid={error ? true : undefined}
          className={cn(
            inputClass,
            "appearance-none pl-10",
            error && "border-[#d6a39c]/60",
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {/* chevron sits on the left in RTL */}
        <Icon
          name="chevron-down"
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ivory/40"
        />
      </div>
    </Field>
  );
}
