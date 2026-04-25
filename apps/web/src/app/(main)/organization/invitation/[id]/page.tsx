import { auth } from "@repo/auth/server";
import { authClient } from "@repo/auth/client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { InvitationClient } from "./_components/InvitationClient";

export default async function InvitationPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  try {
    const invitation = await auth.api.getInvitation({
      query: { id },
      headers: await headers(),
    });
    if (!invitation || invitation.status !== "pending") {
      redirect("/organization");
    }
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <InvitationClient invitation={invitation} />
      </div>
    );
  } catch (error) {
    console.error("\n\nError Occured while Fetching Invitation : ", error);
    return redirect("/organization");
  }
}
