import * as z from "zod";

export const orgSchema = z.object({
  name: z.string().min(2, "Organization name is required"),
  slug: z
    .string()
    .min(2, "Slug is required")
    .regex(
      /^[a-z0-9-]+$/,
      "Slugs can only contain lowercase letters, numbers, and hyphens",
    ),
  website: z
    .url("Please enter a valid URL (e.g., https://acme.com)")
    .or(z.literal("")),
  address: z.string().min(5, "Full street address is required"),
  city: z.string().min(1, "Please select a city"),
  zipCode: z
    .string()
    .regex(
      /^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]$/i,
      "Invalid ZIP/Postal code format",
    ),
  country: z.string().min(1, "Please select a country"),
  countryCode: z.string().min(2).max(2), // ISO code for logic
});

export const inviteSchema = z.object({
  email: z.email("Please enter a valid mission-critical email."),
  role: z.string().min(1, "Access level selection is required."),
});
