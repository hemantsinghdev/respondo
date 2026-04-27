import { Field, FieldError, FieldLabel, Input } from "@repo/ui/components";
import { cn } from "@repo/ui/lib/utils";
import React from "react";
import { Controller } from "react-hook-form";

interface AuthFieldProps {
  name: string;
  control: any;
  label: string;
  placeholder?: string;
  type?: string;
  icon?: React.ElementType;
  className?: string;
}

export default function AuthField({
  name,
  control,
  label,
  placeholder,
  type = "text",
  icon: Icon,
  className,
}: AuthFieldProps) {
  return (
    <Controller
      name={name}
      key={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <div className={cn("flex flex-col gap-1", className)}>
            <FieldLabel className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
              {label}
            </FieldLabel>
            <div className="relative">
              {Icon && (
                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-600" />
              )}
              <Input
                key={`input-${name}`}
                {...field}
                type={type}
                spellCheck={false}
                data-invalid={fieldState.invalid}
                placeholder={placeholder}
                className={cn(
                  "bg-black/20 border-white/5 focus:border-cyan-500/40 h-9 text-xs transition-all text-white placeholder:text-slate-800",
                  Icon && "pl-9",
                  fieldState.invalid &&
                    "border-red-500/50 focus:border-red-500",
                )}
              />
            </div>
            <FieldError
              errors={[fieldState.error]}
              className="text-[10px] text-red-400/80 ml-1 leading-tight animate-in fade-in slide-in-from-top-1"
            />
          </div>
        </Field>
      )}
    />
  );
}
