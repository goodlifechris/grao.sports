import { useToast } from "@/components/ui/use-toast";
import { useUploadThing } from "@/lib/uploadthing";
import { useState, useCallback } from "react";

export interface Attachment {
  file: File;
  mediaId?: string;
  isUploading: boolean;
  progress?: number;
}

export default function useMediaUpload() {
  const { toast } = useToast();
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isUploading, setIsUploading] = useState(false);

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

      // Add new attachments with uploading state
      setAttachments((prev) => [
        ...prev,
        ...renamedFiles.map((file) => ({ 
          file, 
          isUploading: true, 
          progress: 0 
        })),
      ]);

      return renamedFiles;
    },
    onUploadProgress: (progress) => {
      // Update progress for all currently uploading files
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
            mediaId: uploadResult.serverData.mediaId,
            isUploading: false,
            progress: 100,
          };
        })
      );
      setIsUploading(false);
    },
    onUploadError: (e) => {
      // Remove only the failed uploads (those still uploading)
      setAttachments((prev) => prev.filter((a) => !a.isUploading));
      setIsUploading(false);
      toast({
        variant: "destructive",
        description: e.message || "Upload failed",
      });
    },
  });

  const handleStartUpload = useCallback(async (files: File[]) => {
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
  }, [isUploading, attachments.length, startUpload, toast]);

  const removeAttachment = useCallback((fileName: string) => {
    setAttachments((prev) => prev.filter((a) => a.file.name !== fileName));
  }, []);

  const reset = useCallback(() => {
    setAttachments([]);
    setIsUploading(false);
  }, []);

  return {
    startUpload: handleStartUpload,
    attachments,
    isUploading,
    removeAttachment,
    reset,
  };
}