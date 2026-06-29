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
      <p className="mb-4 text-sm text-text-white/75">
        Get sleep tips and exclusive offers.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          name="email"
          type="email"
          required
          placeholder="Your email"
          className="flex-1 rounded-xl border border-text-white/20 bg-primary-hover px-4 py-3 text-text-white placeholder:text-text-white/45"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-xl bg-secondary px-5 py-3 font-medium text-text-white hover:bg-secondary-hover disabled:opacity-60"
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
