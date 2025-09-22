import { useToast } from "@/components/ui/use-toast";
import { useUploadThing } from "@/lib/uploadthing";
import { useState, useCallback } from "react";

export interface Attachment {
  file: File;
  mediaId?: string;
  url?: string;
  isUploading: boolean;
  progress?: number;
}



export default function useMediaUpload() {

function normalizeUrl(url: string) {
  let normalized=url.replace(/https?:\/\/[^/]*ufs\.sh/, "https://utfs.io");
  return normalized
}
  const { toast } = useToast();
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>();

  const { startUpload } = useUploadThing("attachment", {
    onBeforeUploadBegin: (files) => {
      setIsUploading(true);
      const renamedFiles = files.map((file) => {
        const extension = file.name.split(".").pop();
        return new File(
          [file],
          `attachment_${crypto.randomUUID()}.${extension}`,
          {
            type: file.type,
          },
        );
      });

      setAttachments((prev) => [
        ...prev,
        ...renamedFiles.map((file) => ({
          file,
          isUploading: true,
          progress: 0,
        })),
      ]);

      return renamedFiles;
    },
    onUploadProgress: (progress) => {
      setUploadProgress(progress);
      setAttachments((prev) =>
        prev.map((a) =>
          a.isUploading ? { ...a, progress } : a
        )
      );
    },
    onClientUploadComplete: (res) => {
      setAttachments((prev) =>
        prev.map((a) => {
          const uploadResult = res.find((r) => r.name === a.file.name);
          if (!uploadResult) return a;

          return {
            ...a,
            mediaId: uploadResult.serverData?.mediaId,
            url: normalizeUrl(uploadResult.url), // ✅ always utfs.io
            isUploading: false,
            progress: 100,
          };
        })
      );
      setIsUploading(false);
    },
    onUploadError: (e) => {
      console.error("UploadThing error:", e);
      setAttachments((prev) => prev.filter((a) => !a.isUploading));
      setIsUploading(false);
      toast({
        variant: "destructive",
        description: e.toString() || "Upload failed",
      });
    },
  });

  const handleStartUpload = useCallback(
    async (files: File[]) => {
      if (isUploading) {
        toast({
          variant: "destructive",
          description: "Please wait for the current upload to finish.",
        });
        return;
      }

      if (attachments.length + files.length > 5) {
        toast({
          variant: "destructive",
          description: "You can only upload up to 5 attachments per post.",
        });
        return;
      }

      try {
        await startUpload(files);
      } catch (error) {
        console.error("Upload error:", error);
        toast({
          variant: "destructive",
          description: "Failed to start upload",
        });
      }
    },
    [isUploading, attachments.length, startUpload, toast],
  );

  const removeAttachment = useCallback((fileName: string) => {
    setAttachments((prev) => prev.filter((a) => a.file.name !== fileName));
  }, []);

  const reset = useCallback(() => {
    setAttachments([]);
    setIsUploading(false);
    setUploadProgress(undefined);
  }, []);

  return {
    startUpload: handleStartUpload,
    attachments,
    isUploading,
    uploadProgress,
    removeAttachment,
    reset,
  };
}
