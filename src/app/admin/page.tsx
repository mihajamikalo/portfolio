"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { PortfolioContent } from "@/types/content";

function toPrettyJson(value: unknown): string {
  return JSON.stringify(value, null, 2);
}

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [projectsJson, setProjectsJson] = useState("[]");
  const [stackJson, setStackJson] = useState("[]");
  const [cursusJson, setCursusJson] = useState("[]");
  const [feedbackJson, setFeedbackJson] = useState("[]");

  useEffect(() => {
    async function loadContent() {
      try {
        const response = await fetch("/api/admin/content", { cache: "no-store" });
        if (!response.ok) {
          router.push("/login?next=/admin");
          return;
        }

        const content = (await response.json()) as PortfolioContent;
        setProjectsJson(toPrettyJson(content.projects));
        setStackJson(toPrettyJson(content.stack));
        setCursusJson(toPrettyJson(content.cursus));
        setFeedbackJson(toPrettyJson(content.feedback));
      } catch {
        setStatus("Failed to load content.");
      } finally {
        setLoading(false);
      }
    }

    void loadContent();
  }, [router]);

  const hasData = useMemo(() => !loading, [loading]);

  async function handleSave() {
    setStatus("");
    setSaving(true);

    try {
      const payload: PortfolioContent = {
        projects: JSON.parse(projectsJson) as PortfolioContent["projects"],
        stack: JSON.parse(stackJson) as PortfolioContent["stack"],
        cursus: JSON.parse(cursusJson) as PortfolioContent["cursus"],
        feedback: JSON.parse(feedbackJson) as PortfolioContent["feedback"],
      };

      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setStatus("Save failed. Check your JSON format.");
        return;
      }

      setStatus("Content saved successfully.");
    } catch {
      setStatus("Invalid JSON format. Please review your data.");
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <section className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold text-blue-950">Admin Content Manager</h1>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-900 transition hover:border-soft-blue"
        >
          Logout
        </button>
      </div>

      <p className="mt-3 text-sm text-blue-900/75">
        Update projects, stack, cursus tree, and client feedback in JSON format.
      </p>

      {loading ? (
        <p className="mt-6 text-blue-900/70">Loading content...</p>
      ) : (
        <div className="mt-6 space-y-5">
          <label className="block">
            <span className="text-sm font-semibold text-blue-900">Projects JSON</span>
            <textarea
              className="mt-2 h-44 w-full rounded-xl border border-blue-100 bg-blue-50/50 p-3 font-mono text-xs outline-none transition focus:border-soft-blue focus:bg-white"
              value={projectsJson}
              onChange={(event) => setProjectsJson(event.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-blue-900">Stack JSON</span>
            <textarea
              className="mt-2 h-32 w-full rounded-xl border border-blue-100 bg-blue-50/50 p-3 font-mono text-xs outline-none transition focus:border-soft-blue focus:bg-white"
              value={stackJson}
              onChange={(event) => setStackJson(event.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-blue-900">Cursus Tree JSON</span>
            <textarea
              className="mt-2 h-40 w-full rounded-xl border border-blue-100 bg-blue-50/50 p-3 font-mono text-xs outline-none transition focus:border-soft-blue focus:bg-white"
              value={cursusJson}
              onChange={(event) => setCursusJson(event.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-blue-900">Client Feedback JSON</span>
            <textarea
              className="mt-2 h-40 w-full rounded-xl border border-blue-100 bg-blue-50/50 p-3 font-mono text-xs outline-none transition focus:border-soft-blue focus:bg-white"
              value={feedbackJson}
              onChange={(event) => setFeedbackJson(event.target.value)}
            />
          </label>

          <button
            type="button"
            disabled={!hasData || saving}
            onClick={handleSave}
            className="rounded-full bg-soft-blue px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {saving ? "Saving..." : "Save changes"}
          </button>
          {status ? <p className="text-sm text-blue-900">{status}</p> : null}
        </div>
      )}
    </section>
  );
}
