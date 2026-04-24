"use server";
import { SignJWT } from "jose";

export async function getGoodbyeLink(name: string, createdAt: string) {
  const secret = new TextEncoder().encode(process.env.BETTER_AUTH_SECRET);

  const token = await new SignJWT({
    name,
    createdAt,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret);

  return `/goodbye?token=${token}`;
}
