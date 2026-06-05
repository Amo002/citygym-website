"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { login, logout, getSession, changePassword } from "@/lib/auth";
import { saveContent, deleteSubmission } from "@/lib/content";
import type { RawSiteContent } from "@/lib/types";

export async function loginAction(_prev: unknown, formData: FormData) {
  const username = String(formData.get("username") || "");
  const password = String(formData.get("password") || "");
  const ok = await login(username, password);
  if (!ok) return { error: "Invalid username or password" };
  redirect("/admin");
}

export async function logoutAction() {
  await logout();
  redirect("/admin/login");
}

export async function saveContentAction(content: RawSiteContent) {
  const session = await getSession();
  if (!session) return { error: "Unauthorized" };
  saveContent(content);
  revalidatePath("/");
  return { ok: true };
}

export async function deleteSubmissionAction(id: number) {
  const session = await getSession();
  if (!session) return { error: "Unauthorized" };
  deleteSubmission(id);
  revalidatePath("/admin");
  return { ok: true };
}

export async function changePasswordAction(newPassword: string) {
  const session = await getSession();
  if (!session) return { error: "Unauthorized" };
  if (newPassword.length < 4) return { error: "Password too short" };
  changePassword(session.uid, newPassword);
  return { ok: true };
}
