"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [nextPath] = useState(() => {
    if (typeof window === "undefined") {
      return "/admin";
    }

    const nextValue = new URLSearchParams(window.location.search).get("next");
    return nextValue && nextValue.startsWith("/") ? nextValue : "/admin";
  });
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        setError("Invalid password.");
        return;
      }

      router.push(nextPath);
      router.refresh();
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-lg rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">
      <h1 className="text-3xl font-bold text-blue-950">Admin Login</h1>
      <p className="mt-3 text-sm text-blue-900/75">
        Enter your admin password to manage portfolio content.
      </p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-2 text-sm font-medium text-blue-900">
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="rounded-xl border border-blue-100 bg-blue-50/50 px-4 py-3 text-sm outline-none transition focus:border-soft-blue focus:bg-white"
            placeholder="Enter admin password"
          />
        </label>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-soft-blue px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </section>
  );
}
