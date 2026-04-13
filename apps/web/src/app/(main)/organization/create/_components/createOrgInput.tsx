interface CreateOrgInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

export const CreateOrgInput = ({
  label,
  error,
  className,
  ...props
}: CreateOrgInputProps) => (
  <div className="space-y-1 group">
    <label
      className="text-[10px] font-bold text-slate-500 group-focus-within:text-cyan-400 uppercase tracking-widest transition-colors"
      htmlFor={props.id}
    >
      {label}
    </label>
    <input
      {...props}
      className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all placeholder:text-slate-800"
    />
    {error && (
      <p className="text-[10px] text-red-500 font-medium mt-1 uppercase tracking-tighter">
        {error}
      </p>
    )}
  </div>
);
