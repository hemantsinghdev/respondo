"use server";

import { prisma } from "@repo/db";

export async function findMembership(userId?: string) {
  const existing = await prisma.member.findUnique({
    where: { userId },
  });
  return existing;
}
