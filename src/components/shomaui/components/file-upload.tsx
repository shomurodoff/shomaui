import { Upload, X } from "lucide-react";
import { concat, filter, findIndex, get, map, omit, round } from "lodash";
import {
  useRef,
  useState,
  type DragEvent,
  type InputHTMLAttributes,
} from "react";

import { cn } from "#/lib/utils";

export type FileUploadProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  onFilesChange?: (files: File[]) => void;
  className?: string;
};

export function FileUpload({
  onFilesChange,
  className,
  ...props
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const updateFiles = (nextFiles: File[]) => {
    setFiles(nextFiles);
    onFilesChange?.(nextFiles);
  };

  const addFiles = (incoming: FileList | null) => {
    const nextFiles = filter(
      concat(
        files,
        map(incoming, (file) => file),
      ),
      (file, index, collection) =>
        index ===
        findIndex(
          collection,
          (candidate) =>
            candidate.name === file.name && candidate.size === file.size,
        ),
    );
    updateFiles(nextFiles);
  };

  const handleDrop = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsDragging(false);
    addFiles(event.dataTransfer.files);
  };

  return (
    <div className={cn("grid gap-3", className)}>
      <input
        ref={inputRef}
        {...omit(props, ["className"])}
        type="file"
        className="sr-only"
        onChange={(event) => addFiles(event.target.files)}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "grid min-h-28 place-items-center rounded-xl border border-dashed bg-muted/20 p-4 text-center transition-colors",
          isDragging && "border-primary bg-primary/5",
        )}
      >
        <span className="grid gap-1 justify-items-center">
          <Upload className="size-5 text-primary" aria-hidden="true" />
          <span className="text-sm font-medium">Drop files or browse</span>
          <span className="text-xs text-muted-foreground">PNG, JPG or PDF</span>
        </span>
      </button>
      {files.length ? (
        <ul className="grid gap-1.5" aria-label="Selected files">
          {map(files, (file, index) => (
            <li
              key={`${file.name}-${file.size}`}
              className="flex items-center gap-2 rounded-lg border px-2.5 py-2 text-xs"
            >
              <span className="min-w-0 flex-1 truncate">{file.name}</span>
              <span className="text-muted-foreground">
                {round(file.size / 1024)} KB
              </span>
              <button
                type="button"
                className="rounded p-1 hover:bg-muted"
                onClick={() =>
                  updateFiles(
                    filter(files, (_, fileIndex) => fileIndex !== index),
                  )
                }
                aria-label={`Remove ${get(file, "name", "file")}`}
              >
                <X className="size-3.5" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default FileUpload;
