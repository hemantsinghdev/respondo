"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { orgSchema } from "@app/lib/validations/organization";
import { authClient } from "@repo/auth/client";
import { useRouter } from "next/navigation";
import {
  Building2,
  MapPin,
  ArrowRight,
  Loader2,
  MailCheck,
} from "@repo/ui/icons";
import { notify } from "@app/lib/notify";
import { Combobox } from "./_components/Combobox";
import { CreateOrgInput } from "./_components/createOrgInput";
import { cn } from "@repo/ui/lib/utils";

type OrgFormValues = z.infer<typeof orgSchema>;

export default function CreateOrganization() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialCheck, setInitialCheck] = useState(true);
  const [isSlugManual, setIsSlugManual] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [needsVerification, setNeedsVerification] = useState(false);
  const { data: session } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    async function performIdentityCheck() {
      // Check Email Verification
      if (!session?.user.emailVerified) {
        setNeedsVerification(true);
        setInitialCheck(false);
        return;
      }

      // Check Existing Organization
      const { data: orgs } = await authClient.organization.list();
      if (orgs && orgs.length > 0) {
        notify.warning(
          "Restricted Access",
          "You can only be part of one organization at a time.",
        );
        router.push("/organization");
        return;
      }

      setInitialCheck(false);
    }

    performIdentityCheck();
  }, [session?.user.emailVerified, router]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    trigger,
    setError,
    formState: { errors },
  } = useForm<OrgFormValues>({
    resolver: zodResolver(orgSchema),
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: {
      name: "",
      slug: "",
      website: "",
      address: "",
      country: "",
      city: "",
      countryCode: "",
      zipCode: "",
    },
  });

  const orgName = watch("name");
  const currentSlug = watch("slug");

  //Auto Slug Name
  useEffect(() => {
    if (!isSlugManual && step === 1) {
      const generatedSlug = orgName
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
      setValue("slug", generatedSlug);
    }
  }, [orgName, isSlugManual, setValue, step]);

  const handleSendVerification = async () => {
    setIsSending(true);
    const { error } = await authClient.sendVerificationEmail({
      email: session?.user.email || "",
      callbackURL: "/profile?email-verified=true",
    });

    if (error) {
      notify.error("Failed to send verification email.");
    } else {
      notify.success(
        "Verification link sent!",
        "Check your inbox to authorize your identity.",
        10000,
      );
    }
    setIsSending(false);
  };

  const nextStep = async () => {
    const isStep1Valid = await trigger(["name", "slug", "website"]);

    if (isStep1Valid) {
      setLoading(true);
      try {
        const { error } = await authClient.organization.checkSlug({
          slug: currentSlug,
        });
        if (error) {
          setError("slug", {
            type: "manual",
            message: "This slug is already taken by another entity.",
          });
          return;
        }
        setStep(2);
      } catch (err) {
        notify.error("Database connection error. Try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const onSubmit = async (data: OrgFormValues) => {
    setLoading(true);
    const { data: newOrgData, error } = await authClient.organization.create({
      name: data.name,
      slug: data.slug,
      metadata: { ...data },
    });

    if (error) {
      if (error.status === 403) {
        notify.error("User is not allowed to create organization");
      } else {
        notify.error(error.message || "Failed to create organization");
      }
    } else {
      notify.success("Identity established. Welcome to the grid.");
      await authClient.organization.setActive({
        organizationId: newOrgData.id,
      });
      router.refresh();
      router.push("/organization");
    }
    setLoading(false);
  };

  if (initialCheck) {
    return (
      <div className="flex h-[450px] items-center justify-center">
        <Loader2 className="animate-spin text-cyan-500" size={32} />
      </div>
    );
  }

  if (needsVerification) {
    return (
      <div className="max-w-xl mx-auto py-1 px-6">
        <div className="bg-[#0D0D0D] border border-cyan-500/20 rounded-3xl p-8 text-center space-y-6 shadow-[0_0_30px_rgba(6,182,212,0.1)]">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-2">
            <MailCheck className="text-cyan-400" size={40} />
          </div>
          <h2 className="text-3xl font-bold text-white">Identity Unverified</h2>
          <p className="text-slate-400 max-w-sm mx-auto">
            Access to the organization grid requires a verified email address.
            Please confirm your transmission.
          </p>
          <button
            onClick={handleSendVerification}
            disabled={isSending}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-4 font-bold text-white hover:scale-[1.02] transition-all disabled:opacity-50"
          >
            {isSending ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Resend Verification Link"
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-16 px-6">
      {/* Stepper Header with Neon Glow */}
      <div className="flex items-center gap-4 mb-3">
        <div
          className={cn(
            "h-1 flex-1 rounded-full transition-all duration-500",
            step >= 1
              ? "bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.6)]"
              : "bg-white/10",
          )}
        />
        <div
          className={cn(
            "h-1 flex-1 rounded-full transition-all duration-500",
            step >= 2
              ? "bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.6)]"
              : "bg-white/10",
          )}
        />
      </div>

      <div className="bg-[#0D0D0D] border border-white/5 rounded-3xl relative overflow-hidden min-h-[450px] flex flex-col shadow-2xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-8 flex-1 flex flex-col justify-between"
        >
          {step === 1 ? (
            <div
              key="step-1"
              className="animate-in slide-in-from-right-4 duration-500 space-y-5"
            >
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Building2 className="text-cyan-400" size={24} /> Basic Identity
              </h2>

              <div className="space-y-4">
                <CreateOrgInput
                  key="input-name"
                  id="org-name"
                  label="Organization Name"
                  {...register("name")}
                  autoComplete="off"
                  error={errors.name?.message}
                  placeholder="Cyberdyne Systems"
                />

                <CreateOrgInput
                  key="input-slug"
                  id="org-slug"
                  label="Organization Slug"
                  {...register("slug", {
                    onChange: () => setIsSlugManual(true), // Merge the onChange correctly
                  })}
                  autoComplete="off"
                  error={errors.slug?.message}
                  placeholder="cyberdyne-systems"
                />

                <CreateOrgInput
                  key="input-url"
                  id="org-website"
                  label="Company Website"
                  {...register("website")}
                  error={errors.website?.message}
                  autoComplete="url"
                  placeholder="https://cyberdyne.com"
                />
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={loading}
                  className="w-full group flex items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 py-4 font-bold text-white hover:bg-white/10 hover:border-cyan-500/50 transition-all"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>
                      Access Location Settings{" "}
                      <ArrowRight
                        className="group-hover:translate-x-1 transition-transform"
                        size={18}
                      />
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div
              key="step-2"
              className="animate-in slide-in-from-right-4 duration-500 space-y-5"
            >
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <MapPin className="text-purple-400" size={24} /> Operational
                Base
              </h2>

              <div className="space-y-4">
                <CreateOrgInput
                  key="input-address"
                  id="org-address"
                  label="Street Address"
                  {...register("address")}
                  autoComplete="address-line1"
                  error={errors.address?.message}
                  placeholder="Sector 7, Neon District"
                />

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      City
                    </label>
                    <Controller
                      control={control}
                      name="city"
                      render={({ field }) => (
                        <Combobox
                          value={field.value}
                          placeholder="Search City..."
                          error={errors.city?.message}
                          onChange={(cityName, code, countryFullName) => {
                            field.onChange(cityName); // Sets city name in form
                            setValue("countryCode", code); // Sets ISO code
                            setValue("country", countryFullName); // Sets "India"
                          }}
                        />
                      )}
                    />
                  </div>

                  <CreateOrgInput
                    key="input-country"
                    id="org-country"
                    label="Country (Detected)"
                    {...register("country")}
                    readOnly
                    className="opacity-60 cursor-not-allowed bg-white/5"
                    placeholder="Auto-detected"
                  />
                </div>

                <CreateOrgInput
                  key="input-postal-code"
                  id="org-postal-code"
                  label="ZIP / Postal Code"
                  {...register("zipCode" as any)}
                  autoComplete="postal-code"
                  error={(errors as any).zipCode?.message}
                  placeholder="101010"
                />
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 text-slate-500 hover:text-white transition-colors font-medium"
                >
                  Back
                </button>
                <button
                  disabled={loading}
                  type="submit"
                  className="flex-[2] flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-600 py-3 font-bold text-white shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:scale-[1.02] transition-all"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Deploy Organization"
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
