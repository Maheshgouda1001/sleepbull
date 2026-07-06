"use client";

import Script from "next/script";
import { FormEvent, useEffect, useRef, useState } from "react";

import Button from "@/components/ui/Button";
import {
  getProfileClient,
  googleLogin,
  login,
  logout,
} from "@/services/auth.service";
import type { AuthUser } from "@/types/auth";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (options: {
            client_id: string;
            callback: (response: { credential?: string }) => void;
          }) => void;
          renderButton: (
            element: HTMLElement,
            options: {
              theme: "outline" | "filled_blue" | "filled_black";
              size: "large" | "medium" | "small";
              shape: "rectangular" | "pill" | "circle" | "square";
              width?: number;
              text?: "signin_with" | "signup_with" | "continue_with" | "signin";
            }
          ) => void;
        };
      };
    };
  }
}

export default function ProfilePanel() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const googleButtonRef = useRef<HTMLDivElement | null>(null);
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  useEffect(() => {
    getProfileClient().then((profile) => {
      setUser(profile);
      setLoading(false);
    });
  }, []);

  function renderGoogleButton() {
    if (!googleClientId || !window.google || !googleButtonRef.current || user) {
      return;
    }

    googleButtonRef.current.innerHTML = "";
    window.google.accounts.id.initialize({
      client_id: googleClientId,
      callback: async ({ credential }) => {
        if (!credential) {
          setError("Google did not return a sign-in credential.");
          return;
        }

        setSubmitting(true);
        setError("");
        setMessage("");

        try {
          const profile = await googleLogin({ credential });
          setUser(profile);
          setMessage("Logged in with Google.");
        } catch (err) {
          setError(err instanceof Error ? err.message : "Google login failed");
        } finally {
          setSubmitting(false);
        }
      },
    });

    window.google.accounts.id.renderButton(googleButtonRef.current, {
      theme: "outline",
      size: "large",
      shape: "rectangular",
      text: "continue_with",
      width: 320,
    });
  }

  useEffect(() => {
    renderGoogleButton();
  }, [googleClientId, user]);

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
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={renderGoogleButton}
      />

      <p className="text-slate-600">
        Sign in with your SleepBull admin account to manage the store.
      </p>

      {googleClientId && (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="mb-4 text-sm font-semibold text-slate-700">
            Continue faster with Google
          </p>
          <div ref={googleButtonRef} className={submitting ? "opacity-60" : ""} />
        </div>
      )}

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
