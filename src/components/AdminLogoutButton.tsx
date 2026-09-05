"use client";

import { useRouter } from "next/navigation";

export default function AdminLogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-full border border-[var(--color-border)] px-4 py-1.5 text-sm font-medium text-foreground hover:border-brand hover:text-brand"
    >
      Log Out
    </button>
  );
}
