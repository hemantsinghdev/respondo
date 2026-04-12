import ChangePasswordSection from "./_components/ChangePasswordSection";
import DeleteAccountSection from "./_components/DeleteAccountSection";
import SessionManagementSection from "./_components/SessionManagementSection";

export default function AccountPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* --- Section 1: Password Management --- */}
      <ChangePasswordSection />

      {/* --- Section 2: Session Management --- */}
      <SessionManagementSection />

      {/* --- Section 3: Danger Zone --- */}
      <DeleteAccountSection />
    </div>
  );
}
