"use client";

import { FormEvent, useEffect, useState } from "react";

import Button from "@/components/ui/Button";
import {
  getProfileClient,
  login,
  logout,
} from "@/services/auth.service";
import type { AuthUser } from "@/types/auth";

export default function ProfilePanel() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getProfileClient().then((profile) => {
      setUser(profile);
      setLoading(false);
    });
  }, []);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setMessage("");

    const formData = new FormData(event.currentTarget);

    try {
      const profile = await login({
        email: String(formData.get("email") ?? ""),
        password: String(formData.get("password") ?? ""),
      });
      setUser(profile);
      setMessage("Logged in successfully.");
      event.currentTarget.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleLogout() {
    setSubmitting(true);
    try {
      await logout();
      setUser(null);
      setMessage("Logged out.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Logout failed");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <p className="text-slate-500">Loading account...</p>;
  }

  if (user) {
    return (
      <div className="mt-10 max-w-xl rounded-3xl border border-slate-200 bg-white p-8">
        <h2 className="text-2xl font-bold">Welcome, {user.name}</h2>
        <dl className="mt-6 space-y-3 text-slate-600">
          <div>
            <dt className="text-sm font-medium text-slate-500">Email</dt>
            <dd>{user.email}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-slate-500">Role</dt>
            <dd>{user.role}</dd>
          </div>
        </dl>

        {message && <p className="mt-4 text-green-600">{message}</p>}
        {error && <p className="mt-4 text-red-600">{error}</p>}

        <Button
          className="mt-8"
          onClick={handleLogout}
          disabled={submitting}
        >
          Logout
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-10 max-w-xl">
      <p className="text-slate-600">
        Sign in with your SleepBull admin account to manage the store.
      </p>

      <form onSubmit={handleLogin} className="mt-8 space-y-5">
        <label className="block">
          <span className="mb-2 block text-sm font-medium">Email</span>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
            placeholder="admin@sleepbull.com"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium">Password</span>
          <input
            name="password"
            type="password"
            required
            minLength={8}
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
            placeholder="••••••••"
          />
        </label>

        {error && <p className="text-red-600">{error}</p>}
        {message && <p className="text-green-600">{message}</p>}

        <Button type="submit" disabled={submitting}>
          {submitting ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </div>
  );
}
