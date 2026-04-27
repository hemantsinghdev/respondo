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
  Globe,
  Hash,
} from "@repo/ui/icons";
import { notify } from "@app/lib/notify";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  Button,
} from "@repo/ui/components";
import { Citybox } from "./_components/Citybox";
import NeedVerification from "./_components/NeedVerification";
import Stepper from "./_components/Stepper";
import { CreateOrgField } from "./_components/CreateOrgField";

type OrgFormValues = z.infer<typeof orgSchema>;

export default function CreateOrganization() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isSlugManual, setIsSlugManual] = useState(false);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [initialCheck, setInitialCheck] = useState(true);
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const form = useForm<OrgFormValues>({
    resolver: zodResolver(orgSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      website: "",
      address: "",
      city: "",
      country: "",
      countryCode: "",
      zipCode: "",
    },
  });

  // 1. Initial Identity Checks
  useEffect(() => {
    async function performIdentityCheck() {
      if (session && !session.user.emailVerified) {
        setNeedsVerification(true);
        setInitialCheck(false);
        return;
      }
      const { data: orgs } = await authClient.organization.list();
      if (orgs?.length) {
        notify.warning("Restricted Access", "One organization per entity.");
        router.push("/organization");
        return;
      }
      setInitialCheck(false);
    }
    performIdentityCheck();
  }, [session, router]);

  // 2. Automated Slug Generation
  const orgName = form.watch("name");
  useEffect(() => {
    if (!isSlugManual && step === 1 && orgName) {
      const generatedSlug = orgName
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
      form.setValue("slug", generatedSlug, { shouldValidate: true });
    }
  }, [orgName, isSlugManual, step, form]);

  // 3. Navigation Guards
  const nextStep = async () => {
    const isStep1Valid = await form.trigger(["name", "slug", "website"]);
    if (isStep1Valid) {
      setLoading(true);
      const { error } = await authClient.organization.checkSlug({
        slug: form.getValues("slug"),
      });
      if (error) {
        form.setError("slug", { message: "Slug already exists in the grid." });
        return;
      }
      setLoading(false);
      setStep(2);
    }
  };

  const onSubmit = async (data: OrgFormValues) => {
    setLoading(true);
    const { data: newOrg, error } = await authClient.organization.create({
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
      await authClient.organization.setActive({ organizationId: newOrg.id });
      window.location.href = "/organization";
    }
    setLoading(false);
  };

  if (initialCheck)
    return (
      <div className="flex h-[450px] items-center justify-center">
        <Loader2 className="animate-spin text-cyan-500" size={32} />
      </div>
    );

  if (needsVerification)
    return <NeedVerification email={session?.user.email} />;

  return (
    <div className="max-w-xl mx-auto mt-16 px-6">
      <Stepper step={step} />

      <div className="bg-[#0D0D0D] border border-white/5 rounded-3xl relative overflow-hidden min-h-[400px] flex flex-col shadow-2xl">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="p-8 flex-1 flex flex-col justify-between"
        >
          <FieldGroup className="space-y-6">
            {step === 1 ? (
              <div className="animate-in slide-in-from-right-4 duration-500 space-y-5">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-8">
                  <Building2 className="text-cyan-400" size={24} /> Basic
                  Identity
                </h2>

                <CreateOrgField
                  name="name"
                  label="Organization Name"
                  placeholder="Cyberdyne Systems"
                  control={form.control}
                />

                <CreateOrgField
                  name="slug"
                  label="Unique Slug"
                  placeholder="cyberdyne-systems"
                  control={form.control}
                  onChange={() => setIsSlugManual(true)}
                />

                <CreateOrgField
                  name="website"
                  label="Company Website"
                  placeholder="https://cyberdyne.com"
                  control={form.control}
                  icon={Globe}
                />

                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={loading}
                  className="w-full group flex items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 mt-8 font-bold text-white hover:bg-white/10 hover:border-cyan-500/50 transition-all"
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
                </Button>
              </div>
            ) : (
              <div className="animate-in slide-in-from-right-4 duration-500 space-y-5">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-2">
                  <MapPin className="text-purple-400" size={24} /> Operational
                  Base
                </h2>

                <CreateOrgField
                  name="address"
                  label="Street Address"
                  placeholder="Sector 7, Neon District"
                  control={form.control}
                />

                <div className="grid grid-cols-2 gap-3">
                  <Controller
                    name="city"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <div className="flex flex-col gap-1">
                        <FieldLabel className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 leading-none">
                          City
                        </FieldLabel>
                        <Citybox
                          value={field.value}
                          onChange={(city, code, country) => {
                            field.onChange(city);
                            form.setValue("countryCode", code);
                            form.setValue("country", country, {
                              shouldValidate: true,
                            });
                          }}
                          error={fieldState.error?.message}
                          placeholder="Select City"
                        />
                      </div>
                    )}
                  />

                  <CreateOrgField
                    name="country"
                    label="Country"
                    control={form.control}
                    readOnly
                  />
                </div>

                <CreateOrgField
                  name="zipCode"
                  label="ZIP / Postal Code"
                  placeholder="101010"
                  control={form.control}
                  icon={Hash}
                />

                <div className="flex gap-4 pt-6">
                  <Button
                    variant="ghost"
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 text-slate-500 hover:text-white transition-colors font-medium"
                  >
                    Back
                  </Button>
                  <Button
                    disabled={loading}
                    type="submit"
                    className="flex-[2] flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-600 py-3 font-bold text-white shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:scale-[1.02] transition-all"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "Deploy Organization"
                    )}
                  </Button>
                </div>
              </div>
            )}
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}
