"use server";

import { revalidatePath } from "next/cache";
import { approveSignup, rejectSignup } from "@/lib/signup";
import { approveClaim, rejectClaim } from "@/lib/claims";
import {
  approveGroomerEdit,
  rejectGroomerEdit,
  generateEditToken,
  revokeEditToken,
  toggleFeatured,
  toggleClaimed,
  deleteGroomer,
} from "@/lib/groomerEdits";

function idFromFormData(formData: FormData): number {
  const id = Number(formData.get("id"));
  if (!Number.isFinite(id)) throw new Error("Invalid id");
  return id;
}

export async function approveSignupAction(formData: FormData) {
  await approveSignup(idFromFormData(formData));
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function rejectSignupAction(formData: FormData) {
  await rejectSignup(idFromFormData(formData));
  revalidatePath("/admin");
}

export async function approveClaimAction(formData: FormData) {
  await approveClaim(idFromFormData(formData));
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function rejectClaimAction(formData: FormData) {
  await rejectClaim(idFromFormData(formData));
  revalidatePath("/admin");
}

export async function approveGroomerEditAction(formData: FormData) {
  await approveGroomerEdit(idFromFormData(formData));
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function rejectGroomerEditAction(formData: FormData) {
  await rejectGroomerEdit(idFromFormData(formData));
  revalidatePath("/admin");
}

export async function grantEditAccessAction(formData: FormData) {
  await generateEditToken(idFromFormData(formData));
  revalidatePath("/admin");
}

export async function revokeEditAccessAction(formData: FormData) {
  await revokeEditToken(idFromFormData(formData));
  revalidatePath("/admin");
}

export async function toggleFeaturedAction(formData: FormData) {
  await toggleFeatured(idFromFormData(formData));
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function toggleClaimedAction(formData: FormData) {
  await toggleClaimed(idFromFormData(formData));
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function deleteGroomerAction(formData: FormData) {
  await deleteGroomer(idFromFormData(formData));
  revalidatePath("/admin");
  revalidatePath("/");
}
