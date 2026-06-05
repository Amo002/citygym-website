import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getRawContent, getSubmissions } from "@/lib/content";
import { AdminDashboard } from "@/components/admin/dashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const content = getRawContent();
  const submissions = getSubmissions();

  return <AdminDashboard initialContent={content} submissions={submissions} username={session.username} />;
}
