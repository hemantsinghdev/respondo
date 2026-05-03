import { Trash2, ChevronDown, ChevronUp, Hash, FileText } from "@repo/ui/icons";
import {
  Button,
  TableCell,
  TableRow,
  Badge,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components";
import { motion, AnimatePresence } from "@repo/ui/animation";
import { notify } from "@app/lib/notify";

export function KnowledgeRow({
  chunk,
  isExpanded,
  onToggle,
  onDelete,
  deleteAllowed,
}: any) {
  const previewVector = chunk.embeddingString
    ? `${chunk.embeddingString.substring(0, 30)}...`
    : "[No Vector Data]";

  const copyToClipboard = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    notify.success("Vector copied to clipboard");
  };

  return (
    <>
      <TableRow
        className="border-white/5 hover:bg-white/[0.02] cursor-pointer transition-colors group"
        onClick={onToggle}
      >
        <TableCell>
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/5 group-hover:bg-cyan-500/10 transition-colors">
            {isExpanded ? (
              <ChevronUp className="w-3.5 h-3.5 text-cyan-400" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            )}
          </div>
        </TableCell>
        <TableCell>
          <div className="flex flex-col">
            <span className="text-white font-medium text-sm line-clamp-1">
              {chunk.title}
            </span>
            <span className="text-slate-500 text-[11px] flex items-center gap-1">
              <FileText className="w-3 h-3" /> {chunk.fileName}
            </span>
          </div>
        </TableCell>
        <TableCell>
          <div className="flex flex-wrap gap-1">
            {chunk.keywords?.slice(0, 2).map((k: string) => (
              <Badge
                key={k}
                variant="secondary"
                className="bg-white/5 text-[10px] text-slate-400 border-none font-normal"
              >
                {k}
              </Badge>
            ))}
          </div>
        </TableCell>
        <TableCell>
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="flex items-center gap-2 max-w-[180px] cursor-help"
                  onClick={(e) => e.stopPropagation()}
                >
                  <code className="text-[10px] text-cyan-500/70 bg-cyan-500/5 px-2 py-1 rounded border border-cyan-500/10 truncate font-mono">
                    {previewVector}
                  </code>
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="max-w-md p-0 bg-[#141414] border-white/10 shadow-2xl"
              >
                <div className="p-3 space-y-2">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                      Raw Embedding Vector
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 px-2 text-[10px] text-cyan-400 hover:bg-cyan-400/10"
                      onClick={(e) => copyToClipboard(e, chunk.embeddingString)}
                    >
                      Copy All
                    </Button>
                  </div>
                  <div className="text-[10px] font-mono text-slate-300 leading-relaxed break-all max-h-[200px] overflow-y-auto custom-scrollbar">
                    {chunk.embeddingString}
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </TableCell>
        <TableCell className="text-right">
          {deleteAllowed && (
            <Button
              onClick={onDelete}
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </TableCell>
      </TableRow>

      {/* Expanded Content Area */}
      <AnimatePresence>
        {isExpanded && (
          <TableRow className="border-white/5 bg-white/[0.01] hover:bg-white/[0.01]">
            <TableCell colSpan={5} className="p-0">
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-3">
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                      <Hash className="w-3 h-3" /> Raw Content
                    </h4>
                    <div className="text-sm text-slate-300 leading-relaxed bg-black/40 p-4 rounded-lg border border-white/5">
                      {chunk.content}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        Suggested Questions
                      </h4>
                      <div className="space-y-2">
                        {chunk.suggestedQuestions.map(
                          (q: string, i: number) => (
                            <div
                              key={i}
                              className="text-xs text-cyan-400 bg-cyan-500/5 p-2 rounded border border-cyan-500/10"
                            >
                              "{q}"
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        Metadata
                      </h4>
                      <div className="text-[11px] text-slate-500 space-y-1">
                        <p>Chunk ID: {chunk.id}</p>
                        <p>File Link: {chunk.fileId}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TableCell>
          </TableRow>
        )}
      </AnimatePresence>
    </>
  );
}
