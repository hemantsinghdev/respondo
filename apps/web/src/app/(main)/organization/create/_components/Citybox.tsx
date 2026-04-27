import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components";
import { Check, ChevronsUpDown, Loader2 } from "@repo/ui/icons";
import { cn } from "@repo/ui/lib/utils";
import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";

interface CityboxProps {
  value: string;
  onChange: (city: string, countryCode: string, countryName: string) => void;
  placeholder: string;
  error?: string;
}

export const Citybox = ({
  value,
  onChange,
  placeholder,
  error,
}: CityboxProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState<
    { name: string; countryCode: string; countryName: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  // Search API Call
  const fetchCities = async (query: string) => {
    if (query.length < 2) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/organization/create/cities?q=${query}`);
      const data = await res.json();
      setOptions(data);
    } catch (err) {
      console.error("Fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  // Debounce prevents hitting the API on every single keystroke
  const debouncedFetch = useCallback(debounce(fetchCities, 300), []);

  useEffect(() => {
    if (search) debouncedFetch(search);
  }, [search, debouncedFetch]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="w-full flex items-center justify-between bg-black/20 border-white/5 rounded-xl px-4 py-[10px] text-white">
          <span className="truncate">{value || placeholder}</span>
          {loading ? (
            <Loader2 className="animate-spin opacity-50" size={14} />
          ) : (
            <ChevronsUpDown className="opacity-50" size={14} />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 bg-[#0D0D0D] border-white/10">
        <Command className="bg-transparent" shouldFilter={false}>
          {" "}
          {/* shouldFilter={false} is CRITICAL here */}
          <CommandInput
            id="org-city"
            placeholder="Type city name..."
            value={search}
            onValueChange={setSearch} // Updates local search state
            className="text-white h-10"
          />
          <CommandList className="max-h-[220px] overflow-y-auto custom-scrollbar">
            {loading && (
              <div className="p-4 text-xs text-slate-500 animate-pulse">
                Searching the grid...
              </div>
            )}
            <CommandEmpty>
              {search.length < 2
                ? "Type at least 2 chars..."
                : "No city found."}
            </CommandEmpty>
            <CommandGroup>
              {options.map((opt, index) => (
                <CommandItem
                  key={`${opt.name}-${opt.countryCode}`}
                  value={opt.name}
                  onSelect={() => {
                    onChange(opt.name, opt.countryCode, opt.countryName);
                    setOpen(false);
                  }}
                  className="text-slate-300 aria-selected:bg-cyan-500/10 aria-selected:text-cyan-400 cursor-pointer flex justify-between"
                >
                  <div className="flex items-center">
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === opt.name ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {opt.name}
                  </div>
                  <span className="text-[10px] font-mono opacity-50">
                    {opt.countryCode}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
      {error && (
        <span className="text-[10px] text-red-400/80 ml-1 leading-tight uppercase tracking-tighter animate-in fade-in slide-in-from-top-1">
          {error}
        </span>
      )}
    </Popover>
  );
};
