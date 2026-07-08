"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Chrome } from "lucide-react";

import Container from "@/components/layout/Container";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Container className="flex min-h-[80vh] items-center justify-center py-16">
      <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#0d253d]">
            Create Your Account
          </h1>

          <p className="mt-2 text-slate-500">
            Join SleepBull for a better sleep experience.
          </p>
        </div>

        <form className="space-y-5">

          <div className="grid gap-5 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium">
                First Name
              </label>

              <input
                type="text"
                placeholder="Mahesh"
                className="w-full rounded-lg border p-3 outline-none focus:border-[#0d253d]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Last Name
              </label>

              <input
                type="text"
                placeholder="Gouda"
                className="w-full rounded-lg border p-3 outline-none focus:border-[#0d253d]"
              />
            </div>

          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Email Address
            </label>

            <input
              type="email"
              placeholder="mahesh@gmail.com"
              className="w-full rounded-lg border p-3 outline-none focus:border-[#0d253d]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Mobile Number
            </label>

            <input
              type="tel"
              placeholder="+91 9876543210"
              className="w-full rounded-lg border p-3 outline-none focus:border-[#0d253d]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Password
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="w-full rounded-lg border p-3 pr-12 outline-none focus:border-[#0d253d]"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Confirm Password
            </label>

            <div className="relative">

              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                className="w-full rounded-lg border p-3 pr-12 outline-none focus:border-[#0d253d]"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-4 top-3"
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>
          </div>

          <label className="flex items-start gap-3 text-sm">
            <input type="checkbox" className="mt-1" />

            <span>
              I agree to the{" "}
              <Link
                href="/terms"
                className="font-medium text-[#0d253d]"
              >
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy-policy"
                className="font-medium text-[#0d253d]"
              >
                Privacy Policy
              </Link>
            </span>
          </label>

          <button
            type="submit"
            className="w-full rounded-lg bg-[#0d253d] py-3 font-semibold text-white transition hover:opacity-90"
          >
            Create Account
          </button>

          <div className="relative py-3">
            <div className="border-t"></div>

            <span className="absolute left-1/2 top-0 -translate-x-1/2 bg-white px-4 text-sm text-slate-500">
              OR
            </span>
          </div>

          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-lg border py-3 transition hover:bg-slate-50"
          >
            <Chrome size={20} />

            Continue with Google
          </button>

          <p className="text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#0d253d]"
            >
              Sign In
            </Link>
          </p>

        </form>
      </div>
    </Container>
  );
}