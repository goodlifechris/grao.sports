"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import streamServerClient from "@/lib/stream";
import { getUserDataSelect } from "@/lib/types";
import {
  updateUserProfileSchema,
  UpdateUserProfileValues,
} from "@/lib/validation";

export async function updateUserProfile(
  values: UpdateUserProfileValues & { avatarUrl?: string }
) {
  const validatedValues = updateUserProfileSchema.parse(values);

  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthorized");

  // Prepare update data
  const updateData: any = {
    displayName: validatedValues.displayName,
    bio: validatedValues.bio,
  };

  // Only update avatarUrl if provided
  if (values.avatarUrl) {
    updateData.avatarUrl = values.avatarUrl;
  }

  // Update database
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: updateData,
    select: getUserDataSelect(user.id),
  });

  // Update Stream (with error handling)
  try {
    await streamServerClient.partialUpdateUser({
      id: user.id,
      set: {
        name: validatedValues.displayName,
        // Optional: update avatar in Stream too if you want
        // image: values.avatarUrl || updatedUser.avatarUrl,
      },
    });
  } catch (error) {
    console.error("Stream update failed:", error);
  }

  return updatedUser;
}