import { auth } from "@repo/auth/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { FloatingHeader } from "@app/components/FloatingHeader";
import NoOrganizationUI from "./_components/NoOrganizationUI";

export default async function ActiveOrganizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  if (!session.session.activeOrganizationId) {
    const organizations = await auth.api.listOrganizations({
      headers: await headers(),
    });
    const org = organizations?.[0];

    if (org) {
      await auth.api.setActiveOrganization({
        body: { organizationId: org.id },
        headers: await headers(),
      });
      // Redirect to the same path to ensure headers/cookies are re-read by the server
      redirect("/organization");
    }

    return <NoOrganizationUI session={session} />;
  }

  const organizations = await auth.api.listOrganizations({
    headers: await headers(),
  });

  const org = organizations?.[0];

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col">
      <FloatingHeader
        type="organization"
        title="Account Settings"
        topOffset="top-6"
        maxWidth="max-w-5xl"
      />

      <div className="mx-auto w-full max-w-4xl pt-12">{children}</div>
    </div>
  );
}
