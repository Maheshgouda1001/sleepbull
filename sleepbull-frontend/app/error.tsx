"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({
  error,
  reset,
}: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">
          Something went wrong!
        </h1>

        <p className="mt-4 text-slate-500">
          Please try again.
        </p>

        <button
          onClick={reset}
          className="mt-8 rounded-xl bg-slate-900 px-6 py-3 text-white"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}