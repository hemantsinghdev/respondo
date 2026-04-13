"use server";

import { prisma } from "@repo/db";

export async function checkSlugExists(slug: string) {
  const existing = await prisma.organization.findUnique({
    where: { slug },
    select: { id: true },
  });
  return !!existing;
}
