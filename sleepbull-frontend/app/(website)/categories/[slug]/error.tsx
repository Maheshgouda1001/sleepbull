"use client";

interface Props {
  error: Error;
  reset: () => void;
}

export default function Error({
  reset,
}: Props) {
  return (
    <div className="py-20 text-center">

      <h2 className="text-3xl font-bold">

        Something went wrong

      </h2>

      <button
        onClick={reset}
        className="mt-8 rounded-xl bg-slate-900 px-6 py-3 text-white"
      >
        Try Again
      </button>

    </div>
  );
}