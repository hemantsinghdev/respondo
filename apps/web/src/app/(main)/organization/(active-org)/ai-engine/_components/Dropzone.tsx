import { UploadStatus } from "../_hooks/useFaqUpload";
import { UploadCloud, FileText, X } from "@repo/ui/icons";

interface DropzoneProps {
  files: File[];
  status: UploadStatus;
  onFilesSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: (index: number) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export const Dropzone = ({
  files,
  status,
  onFilesSelect,
  onRemoveFile,
  inputRef,
}: DropzoneProps) => (
  <div className="space-y-4">
    <div
      onClick={() => status === "idle" && inputRef.current?.click()}
      className={`relative group cursor-pointer flex flex-col items-center justify-center py-8 px-6 border-2 border-dashed rounded-xl transition-all duration-200 
        ${files.length > 0 ? "border-purple-500/50 bg-purple-500/5" : "border-white/10 hover:border-purple-500/30 hover:bg-white/[0.02]"}
        ${status !== "idle" ? "pointer-events-none opacity-50" : ""}`}
    >
      <input
        type="file"
        ref={inputRef}
        onChange={onFilesSelect}
        accept=".pdf"
        multiple
        className="hidden"
      />

      <div className="flex flex-col items-center space-y-3 text-center">
        <div className="p-3 rounded-full bg-white/5 group-hover:bg-purple-500/10 transition-colors">
          <UploadCloud className="w-6 h-6 text-slate-400 group-hover:text-purple-400" />
        </div>
        <div>
          <p className="text-white text-sm font-medium">
            {files.length > 0
              ? "Add more files"
              : "Click to select or drop PDFs"}
          </p>
          <p className="text-slate-500 text-xs mt-1">
            Up to 4 files, maximum 4MB each
          </p>
        </div>
      </div>
    </div>

    {/* File List for Multiple Uploads */}
    {files.length > 0 && (
      <div className="space-y-2 max-h-[160px] overflow-y-scroll pr-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {files.map((file, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/[0.03]"
          >
            <div className="flex items-center space-x-3 overflow-hidden">
              <FileText className="w-5 h-5 text-fuchsia-500 flex-shrink-0" />
              <div className="overflow-hidden">
                <p className="text-white font-medium text-xs truncate max-w-[240px]">
                  {file.name}
                </p>
                <p className="text-slate-500 text-[10px]">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            {status === "idle" && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveFile(idx);
                }}
                className="p-1 hover:bg-white/10 rounded text-slate-400 hover:text-red-400 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    )}
  </div>
);
