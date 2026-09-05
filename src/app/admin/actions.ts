"use server";

import { revalidatePath } from "next/cache";
import { approveSignup, rejectSignup } from "@/lib/signup";
import { approveClaim, rejectClaim } from "@/lib/claims";

function idFromFormData(formData: FormData): number {
  const id = Number(formData.get("id"));
  if (!Number.isFinite(id)) throw new Error("Invalid id");
  return id;
}

export async function approveSignupAction(formData: FormData) {
  approveSignup(idFromFormData(formData));
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function rejectSignupAction(formData: FormData) {
  rejectSignup(idFromFormData(formData));
  revalidatePath("/admin");
}

export async function approveClaimAction(formData: FormData) {
  approveClaim(idFromFormData(formData));
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function rejectClaimAction(formData: FormData) {
  rejectClaim(idFromFormData(formData));
  revalidatePath("/admin");
}
