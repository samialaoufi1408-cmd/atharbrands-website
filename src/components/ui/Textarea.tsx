import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Field, inputClass } from "./Input";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, required, id, className, ...props }: TextareaProps) {
  return (
    <Field label={label} htmlFor={id} required={required} error={error}>
      <textarea
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        className={cn(
          inputClass,
          "min-h-[120px] resize-y",
          error && "border-[#b4534b]/60",
          className
        )}
        {...props}
      />
    </Field>
  );
}
