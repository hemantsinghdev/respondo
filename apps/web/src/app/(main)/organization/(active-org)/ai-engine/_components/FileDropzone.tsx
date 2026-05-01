import { UploadStatus } from "@app/app/(main)/organization/(active-org)/ai-engine/_hooks/useFaqUpload";
import { UploadCloud, FileText } from "@repo/ui/icons";

interface DropzoneProps {
  file: File | null;
  status: UploadStatus;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export const FileDropzone = ({
  file,
  status,
  onFileSelect,
  inputRef,
}: DropzoneProps) => (
  <div
    onClick={() => status === "idle" && inputRef.current?.click()}
    className={`relative group cursor-pointer flex flex-col items-center justify-center py-10 px-6 border-2 border-dashed rounded-xl transition-all duration-200 
      ${file ? "border-purple-500/50 bg-purple-500/5" : "border-white/10 hover:border-purple-500/30 hover:bg-white/[0.02]"}
      ${status !== "idle" ? "pointer-events-none opacity-50" : ""}`}
  >
    <input
      type="file"
      ref={inputRef}
      onChange={onFileSelect}
      accept=".pdf"
      className="hidden"
    />
    {file ? (
      <div className="flex flex-col items-center space-y-2">
        <FileText className="w-10 h-10 text-fuchsia-500 mb-2" />
        <p className="text-white font-medium text-sm">{file.name}</p>
        <p className="text-slate-500 text-xs">
          {(file.size / 1024 / 1024).toFixed(2)} MB
        </p>
      </div>
    ) : (
      <div className="flex flex-col items-center space-y-3 text-center">
        <div className="p-3 rounded-full bg-white/5 group-hover:bg-purple-500/10 transition-colors">
          <UploadCloud className="w-6 h-6 text-slate-400 group-hover:text-purple-400" />
        </div>
        <div>
          <p className="text-white text-sm font-medium">Click to select PDF</p>
          <p className="text-slate-500 text-xs mt-1">Max file size: 4MB</p>
        </div>
      </div>
    )}
  </div>
);
