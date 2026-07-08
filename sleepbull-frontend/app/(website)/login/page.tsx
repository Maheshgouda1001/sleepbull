"use client";

import Link from "next/link";
import Script from "next/script";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";

import {
  getProfileClient,
  googleLogin,
  login,
} from "@/services/auth.service";

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
              shape: "rectangular" | "pill";
              text?:
                | "signin_with"
                | "signup_with"
                | "continue_with"
                | "signin";
              width?: number;
            }
          ) => void;
        };
      };
    };
  }
}

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const googleButtonRef = useRef<HTMLDivElement>(null);

  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  useEffect(() => {
    getProfileClient()
      .then((user) => {
        if (user) {
          router.replace("/profile");
        }
      })
      .finally(() => setLoading(false));
  }, [router]);

  function renderGoogleButton() {
    if (
      !googleClientId ||
      !window.google ||
      !googleButtonRef.current
    ) {
      return;
    }

    googleButtonRef.current.innerHTML = "";

    window.google.accounts.id.initialize({
      client_id: googleClientId,

      callback: async ({ credential }) => {
        if (!credential) return;

        setSubmitting(true);

        try {
          await googleLogin({ credential });

          router.push("/profile");
        } catch (err) {
          setError(
            err instanceof Error
              ? err.message
              : "Google login failed."
          );
        } finally {
          setSubmitting(false);
        }
      },
    });

    window.google.accounts.id.renderButton(
      googleButtonRef.current,
      {
        theme: "outline",
        size: "large",
        shape: "rectangular",
        width: 350,
        text: "continue_with",
      }
    );
  }

  useEffect(() => {
    renderGoogleButton();
  }, [googleClientId]);

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    try {
      await login({
        email: String(formData.get("email")),
        password: String(formData.get("password")),
      });

      router.push("/profile");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Invalid email or password."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <Container className="py-24 text-center">
        Loading...
      </Container>
    );
  }

  return (
    <Container className="flex min-h-[85vh] items-center justify-center py-20">
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={renderGoogleButton}
      />

      <div className="w-full max-w-md rounded-3xl border bg-white p-8 shadow-lg">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-primary">
            Welcome Back
          </h1>

          <p className="mt-2 text-slate-500">
            Login to access your orders, wishlist and profile.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <input
              name="email"
              type="email"
              required
              placeholder="john@example.com"
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Password
            </label>

            <div className="relative">
              <input
                name="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                required
                className="w-full rounded-xl border px-4 py-3 pr-12"
              />

              <button
                type="button"
                className="absolute right-4 top-3"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>

            <div className="mt-2 flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={submitting}
          >
            {submitting
              ? "Signing In..."
              : "Sign In"}
          </Button>
        </form>

        <div className="my-6 flex items-center">
          <div className="h-px flex-1 bg-slate-200" />

          <span className="mx-4 text-sm text-slate-500">
            OR
          </span>

          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <div
          ref={googleButtonRef}
          className="flex justify-center"
        />

        <p className="mt-8 text-center text-sm text-slate-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-primary hover:underline"
          >
            Create Account
          </Link>
        </p>
      </div>
    </Container>
  );
}