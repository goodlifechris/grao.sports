import { useToast } from "@/components/ui/use-toast";
import { PostsPage } from "@/lib/types";
import { useUploadThing } from "@/lib/uploadthing";
import { UpdateUserProfileValues } from "@/lib/validation";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { updateUserProfile } from "./actions";
export function useUpdateProfileMutation() {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { startUpload: startAvatarUpload } = useUploadThing("avatar");

  const mutation = useMutation({
    mutationFn: async ({
      values,
      avatar,
    }: {
      values: UpdateUserProfileValues;
      avatar?: File;
    }) => {
      let avatarUrl: string | undefined;

      // 1. FIRST upload the avatar (if provided)
      if (avatar) {
        try {
          console.log("Starting avatar upload...");
          const uploadResult = await startAvatarUpload([avatar]);
          console.log("Avatar upload result:", uploadResult);
          
          if (uploadResult && uploadResult[0]) {
            avatarUrl = uploadResult[0].url; // Adjust based on actual response structure
            console.log("New avatar URL:", avatarUrl);
            
            if (!avatarUrl) {
              throw new Error("Avatar upload failed - no URL returned");
            }
          }
        } catch (uploadError) {
          console.error("Avatar upload failed:", uploadError);
          throw new Error(`Avatar upload failed: ${uploadError}`);
        }
      }

      // 2. THEN update the user profile with the new avatar URL
      console.log("Updating user profile with values:", values, "avatarUrl:", avatarUrl);
      
      const updateData = {
        ...values,
        ...(avatarUrl && { avatarUrl }), // Only include avatarUrl if it exists
      };

      const updatedUser = await updateUserProfile(updateData);
      console.log("User profile updated successfully:", updatedUser);
      
      return { updatedUser, avatarUrl };
    },
    onSuccess: async ({ updatedUser, avatarUrl }) => {
      console.log("Mutation successful! Updated user:", updatedUser, "Avatar URL:", avatarUrl);

      // Update queries data
      const queryFilter: QueryFilters = {
        queryKey: ["post-feed"],
      };

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        queryFilter,
        (oldData) => {
          if (!oldData) return;

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              nextCursor: page.nextCursor,
              posts: page.posts.map((post) => {
                if (post.user.id === updatedUser.id) {
                  return {
                    ...post,
                    user: {
                      ...updatedUser,
                      avatarUrl: avatarUrl || updatedUser.avatarUrl,
                    },
                  };
                }
                return post;
              }),
            })),
          };
        },
      );

      // Also update the user query directly
      queryClient.setQueryData(['user'], updatedUser);

      router.refresh();

      toast({
        description: "Profile updated",
      });
    },
    onError(error) {
      console.error("Mutation error:", error);
      toast({
        variant: "destructive",
        description: "Failed to update profile. Please try again.",
      });
    },
  });

  return mutation;
}