import { FieldLabel, Input } from "@repo/ui/components";
import { cn } from "@repo/ui/lib/utils";
import { Controller } from "react-hook-form";

interface CreateOrgFieldProps {
  name: string;
  control: any;
  label: string;
  placeholder?: string;
  type?: string;
  icon?: React.ElementType;
  readOnly?: boolean;
  onChange?: (e: any) => void; // Support for custom logic like Slug generation
  className?: string;
}

export const CreateOrgField = ({
  name,
  control,
  label,
  placeholder,
  type = "text",
  icon: Icon,
  readOnly,
  onChange,
  className,
}: CreateOrgFieldProps) => {
  return (
    <Controller
      name={name}
      key={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className={cn("flex flex-col gap-1.5", className)}>
          <FieldLabel className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 leading-none">
            {label}
          </FieldLabel>
          <div className="relative">
            {Icon && (
              <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-600" />
            )}
            <Input
              {...field}
              key={`input-${name}`}
              data-invalid={fieldState.invalid}
              spellCheck={false}
              type={type}
              readOnly={readOnly}
              placeholder={placeholder}
              onChange={(e) => {
                field.onChange(e);
                if (onChange) onChange(e);
              }}
              className={cn(
                "bg-black/20 border-white/5 focus:border-cyan-500/40 h-10 text-xs transition-all text-white placeholder:text-slate-800",
                Icon && "pl-10",
                readOnly && "opacity-50 cursor-not-allowed",
              )}
            />
          </div>
          {fieldState.error && (
            <span className="text-[10px] text-red-400/80 ml-1 leading-tight uppercase tracking-tighter animate-in fade-in slide-in-from-top-1">
              {fieldState.error.message}
            </span>
          )}
        </div>
      )}
    />
  );
};
