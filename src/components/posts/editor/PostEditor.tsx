"use client";

import { useSession } from "@/app/(main)/SessionProvider";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/UserAvatar";
import { cn } from "@/lib/utils";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useDropzone } from "@uploadthing/react";
import { ImageIcon, Loader2, X } from "lucide-react";
import Image from "next/image";
import { ClipboardEvent, useRef, useEffect, useState } from "react";
import { useSubmitPostMutation } from "./mutations";
import "./styles.css";
import useMediaUpload, { Attachment } from "./useMediaUpload";

export default function PostEditor() {
  const { user } = useSession();

  const mutation = useSubmitPostMutation();

  const {
    startUpload,
    attachments,
    isUploading,
    uploadProgress,
    removeAttachment,
    reset: resetMediaUploads,
  } = useMediaUpload();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: startUpload,
  });

  const { onClick, ...rootProps } = getRootProps();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
      Placeholder.configure({
        placeholder: "What's happening?",
      }),
    ],
  });

  const input =
    editor?.getText({
      blockSeparator: "\n",
    }) || "";

  function onSubmit() {
    mutation.mutate(
      {
        content: input,
        mediaIds: attachments.map((a) => a.mediaId).filter(Boolean) as string[],
      },
      {
        onSuccess: () => {
          editor?.commands.clearContent();
          resetMediaUploads();
        },
      },
    );
  }

  // Accept any clipboard event (editor/paste may use a different element type)
  function onPaste(e: ClipboardEvent<any>) {
    const files = Array.from(e.clipboardData?.items || [])
      .filter((item) => item.kind === "file")
      .map((item) => item.getAsFile())
      .filter(Boolean) as File[];
    if (files.length) startUpload(files);
  }

  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex gap-5">
        <UserAvatar avatarUrl={user.avatarUrl} className="hidden sm:inline" />
        <div {...rootProps} className="w-full">
          <EditorContent
            editor={editor}
            className={cn(
              "max-h-[20rem] w-full overflow-y-auto rounded-2xl bg-background px-5 py-3",
              isDragActive && "outline-dashed",
            )}
            onPaste={onPaste}
          />
          <input {...getInputProps()} />
        </div>
      </div>

      {!!attachments.length && (
        <AttachmentPreviews
          attachments={attachments}
          removeAttachment={removeAttachment}
        />
      )}

      <div className="flex items-center justify-end gap-3">
        {isUploading && (
          <>
            <span className="text-sm">{uploadProgressDisplay(uploadProgress)}%</span>
            <Loader2 className="size-5 animate-spin text-primary" />
          </>
        )}

        <AddAttachmentsButton
          onFilesSelected={startUpload}
          disabled={isUploading || attachments.length >= 5}
        />

        <LoadingButton
          onClick={onSubmit}
          loading={mutation.isPending}
          disabled={!input.trim() || isUploading}
          className="min-w-20"
        >
          Post
        </LoadingButton>
      </div>
    </div>
  );
}

/* ---------- AddAttachmentsButton ---------- */

interface AddAttachmentsButtonProps {
  onFilesSelected: (files: File[]) => void;
  disabled: boolean;
}

function AddAttachmentsButton({
  onFilesSelected,
  disabled,
}: AddAttachmentsButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-primary hover:text-primary"
        disabled={disabled}
        onClick={() => fileInputRef.current?.click()}
      >
        <ImageIcon size={20} />
      </Button>
      <input
        type="file"
        accept="image/*, video/*"
        multiple
        ref={fileInputRef}
        className="sr-only hidden"
        onChange={(e) => {
          const files = Array.from(e.target.files || []);
          if (files.length) {
            onFilesSelected(files);
            // reset input so re-selecting same file triggers change
            e.currentTarget.value = "";
          }
        }}
      />
    </>
  );
}

/* ---------- AttachmentPreviews & AttachmentPreview ---------- */

interface AttachmentPreviewsProps {
  attachments: Attachment[];
  removeAttachment: (fileName: string) => void;
}

function AttachmentPreviews({
  attachments,
  removeAttachment,
}: AttachmentPreviewsProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        attachments.length > 1 && "sm:grid sm:grid-cols-2",
      )}
    >
      {attachments.map((attachment) => (
        <AttachmentPreview
          key={attachment.file.name}
          attachment={attachment}
          onRemoveClick={() => removeAttachment(attachment.file.name)}
        />
      ))}
    </div>
  );
}

interface AttachmentPreviewProps {
  attachment: Attachment;
  onRemoveClick: () => void;
}

function AttachmentPreview({
  attachment,
  onRemoveClick,
}: AttachmentPreviewProps) {
  const { file, url, isUploading, progress } = attachment;

  // Create a blob URL while uploading or when there's no uploaded url yet.
  const [localBlobUrl, setLocalBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    // If there's already an uploaded url, we don't need a blob preview.
    if (url) {
      // revoke any leftover blob url
      if (localBlobUrl) {
        URL.revokeObjectURL(localBlobUrl);
        setLocalBlobUrl(null);
      }
      return;
    }

    // create blob preview
    const obj = URL.createObjectURL(file);
    setLocalBlobUrl(obj);

    return () => {
      URL.revokeObjectURL(obj);
      setLocalBlobUrl(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, url]);

  // choose src: prefer the real uploaded url (normalized by your hook),
  // otherwise use the blob preview.
  const src = url ?? localBlobUrl ?? "";

  const percent = normalizeProgress(progress);

  return (
    <div
      className={cn("relative mx-auto size-fit", isUploading && "opacity-50")}
    >
      {file.type.startsWith("image") ? (
        // Use unoptimized to avoid next/image loader issues for external domains/blobs
        <Image
          src={src}
          alt="Attachment preview"
          width={500}
          height={500}
          unoptimized
          className="size-fit max-h-[30rem] rounded-2xl"
        />
      ) : (
        <video controls className="size-fit max-h-[30rem] rounded-2xl">
          {/* video tag supports both blob and remote URLs */}
          <source src={src} type={file.type} />
        </video>
      )}

      {/* progress overlay while uploading */}
      {isUploading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="bg-black/40 rounded-full px-3 py-1 text-sm text-white">
            {percent ?? 0}%
          </div>

          {/* small progress bar at bottom */}
          <div className="absolute left-0 right-0 bottom-0 h-1 bg-background/40">
            <div
              style={{ width: `${percent ?? 0}%` }}
              className="h-full bg-primary transition-all"
            />
          </div>
        </div>
      )}

      {!isUploading && (
        <button
          onClick={onRemoveClick}
          className="absolute right-3 top-3 rounded-full bg-foreground p-1.5 text-background transition-colors hover:bg-foreground/60"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
}

/* ---------- Helpers ---------- */

function normalizeProgress(p?: number) {
  if (p == null) return undefined;
  // If uploader sends 0..1, convert to 0..100
  if (p >= 0 && p <= 1) return Math.round(p * 100);
  return Math.round(p);
}

function uploadProgressDisplay(p?: number) {
  return normalizeProgress(p) ?? 0;
}
