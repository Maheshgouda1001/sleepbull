"use client";

import { FormEvent, useState } from "react";

import Button from "@/components/ui/Button";
import { submitContact } from "@/services/public.service";

export default function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      await submitContact({
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        phone: String(formData.get("phone") ?? "") || undefined,
        subject: String(formData.get("subject") ?? "") || undefined,
        message: String(formData.get("message") ?? ""),
      });

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error ? err.message : "Failed to submit enquiry"
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 max-w-2xl space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium">Name</span>
          <input
            name="name"
            required
            minLength={2}
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
            placeholder="Your name"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium">Email</span>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
            placeholder="you@example.com"
          />
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium">Phone</span>
          <input
            name="phone"
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
            placeholder="+91 9876543210"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium">Subject</span>
          <input
            name="subject"
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
            placeholder="Mattress enquiry"
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-medium">Message</span>
        <textarea
          name="message"
          required
          minLength={10}
          rows={6}
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
          placeholder="Tell us how we can help..."
        />
      </label>

      {status === "success" && (
        <p className="text-green-600">
          Thank you! Your enquiry was submitted successfully.
        </p>
      )}

      {status === "error" && (
        <p className="text-red-600">{error}</p>
      )}

      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
