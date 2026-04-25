import { auth } from "@repo/auth/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { FloatingHeader } from "@app/components/FloatingHeader";
import NoOrganizationUI from "./_components/NoOrganizationUI";
import { ActivateOrg } from "./_components/ActivateOrg";

export default async function ActiveOrganizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  const organizations = await auth.api.listOrganizations({
    headers: await headers(),
  });
  const org = organizations?.[0];

  if (!org && session.session.activeOrganizationId) {
    return <ActivateOrg organizationId={null} />;
  }

  if (!session.session.activeOrganizationId) {
    if (org) {
      return <ActivateOrg organizationId={org.id} />;
    }

    return <NoOrganizationUI session={session} />;
  }

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
