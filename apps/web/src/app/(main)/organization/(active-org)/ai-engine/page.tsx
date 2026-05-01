import { FAQUploader } from "./_components/FAQUploader";

export default function AIEnginePage() {
  return (
    <div className="w-full space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          AI Co-Pilot Settings
        </h2>
        <p className="text-slate-400 mt-1">
          Configure knowledge base sources for your automated responses.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FAQUploader />

        {/* Placeholder for future AI settings (e.g. Tone, SLA strictness) */}
        <div className="p-6 border border-white/5 rounded-xl bg-white/[0.01] flex items-center justify-center">
          <p className="text-sm text-slate-500">
            More engine configurations coming soon...
          </p>
        </div>
      </div>
    </div>
  );
}
