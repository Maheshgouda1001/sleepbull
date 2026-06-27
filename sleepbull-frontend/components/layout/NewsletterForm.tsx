"use client";

import { FormEvent, useState } from "react";

import { subscribeNewsletter } from "@/services/public.service";

export default function NewsletterForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") ?? "");

    try {
      await subscribeNewsletter({ email });
      setStatus("success");
      setMessage("Thanks for subscribing!");
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error ? err.message : "Subscription failed"
      );
    }
  }

  return (
    <div>
      <h3 className="mb-3 font-semibold">Newsletter</h3>
      <p className="mb-4 text-sm text-slate-300">
        Get sleep tips and exclusive offers.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <input
          name="email"
          type="email"
          required
          placeholder="Your email"
          className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-500"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-xl bg-white px-5 py-3 font-medium text-slate-900 hover:bg-slate-100 disabled:opacity-60"
        >
          {status === "loading" ? "..." : "Subscribe"}
        </button>
      </form>

      {message && (
        <p
          className={`mt-3 text-sm ${
            status === "success" ? "text-green-400" : "text-red-400"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
