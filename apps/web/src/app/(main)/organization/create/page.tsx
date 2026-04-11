"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { authClient } from "@repo/auth/client";
import { useRouter } from "next/navigation";
import { Building2, Globe, MapPin, ArrowRight, Loader2 } from "@repo/ui/icons";
import { notify } from "@app/lib/notify";

const orgSchema = z.object({
  name: z.string().min(2, "Name required"),
  website: z.string().url("Invalid URL").or(z.literal("")),
  address: z.string().min(5, "Address required"),
  city: z.string().min(2, "City required"),
  zipCode: z.string().min(3, "Zip required"),
  country: z.string().min(2, "Country required"),
});

type OrgFormValues = z.infer<typeof orgSchema>;

export default function CreateOrganization() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<OrgFormValues>({
    resolver: zodResolver(orgSchema),
  });

  const nextStep = async () => {
    const fields = step === 1 ? ["name", "website"] : [];
    const isValid = await trigger(fields as any);
    if (isValid) setStep(2);
  };

  const onSubmit = async (data: OrgFormValues) => {
    setLoading(true);
    const { error } = await authClient.organization.create({
      name: data.name,
      slug: data.name.toLowerCase().replace(/\s+/g, "-"),
      metadata: { ...data },
    });

    if (error) {
      notify.error(error.message || "Failed to create organization");
    } else {
      notify.success("Organization created successfully!");
      router.push("/dashboard");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-6">
      {/* Stepper Header */}
      <div className="flex items-center gap-4 mb-12">
        <div
          className={`h-1 flex-1 rounded-full ${step >= 1 ? "bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" : "bg-white/10"}`}
        />
        <div
          className={`h-1 flex-1 rounded-full ${step >= 2 ? "bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" : "bg-white/10"}`}
        />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 bg-[#0D0D0D] border border-white/5 p-8 rounded-3xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-500 to-blue-600" />

        {step === 1 ? (
          <div className="animate-in slide-in-from-right-4 duration-500 space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Building2 className="text-cyan-400" /> Basic Information
            </h2>
            <div className="space-y-4">
              <Input
                label="Organization Name"
                {...register("name")}
                error={errors.name?.message}
                placeholder="Acme Corp"
              />
              <Input
                label="Website"
                {...register("website")}
                error={errors.website?.message}
                placeholder="https://acme.com"
              />
            </div>
            <button
              type="button"
              onClick={nextStep}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 py-3 font-bold text-white hover:bg-white/10 transition-all"
            >
              Continue to Location <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="animate-in slide-in-from-right-4 duration-500 space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <MapPin className="text-purple-400" /> Location Details
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Input
                  label="Street Address"
                  {...register("address")}
                  error={errors.address?.message}
                  placeholder="123 Neon St"
                />
              </div>
              <Input
                label="City"
                {...register("city")}
                error={errors.city?.message}
              />
              <Input
                label="Zip Code"
                {...register("zipCode")}
                error={errors.zipCode?.message}
              />
              <div className="col-span-2">
                <Input
                  label="Country"
                  {...register("country")}
                  error={errors.country?.message}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 py-3 text-slate-400 font-medium"
              >
                Back
              </button>
              <button
                disabled={loading}
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-bold text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]"
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Complete Setup"
                )}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

// Reusable Styled Input
const Input = ({ label, error, ...props }: any) => (
  <div className="space-y-1">
    <label className="text-xs font-semibold text-slate-400 uppercase tracking-tighter">
      {label}
    </label>
    <input
      {...props}
      className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-colors placeholder:text-slate-700"
    />
    {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
  </div>
);
