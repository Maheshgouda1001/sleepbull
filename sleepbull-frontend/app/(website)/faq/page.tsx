import Container from "@/components/layout/Container";
import { generateSEO } from "@/config/seo";
import { getFaqs } from "@/services/faq.service";

export const metadata = generateSEO({
  title: "FAQ",
  url: "/faq",
});

export default async function FaqPage() {
  const faqs = await getFaqs();

  return (
    <Container className="py-24">
      <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
      <p className="mt-4 max-w-2xl text-slate-600">
        Answers to common questions about SleepBull mattresses and policies.
      </p>

      {faqs.length === 0 ? (
        <p className="mt-10 text-slate-500">No FAQs available yet.</p>
      ) : (
        <div className="mt-12 space-y-6">
          {faqs.map((faq) => (
            <article
              key={faq.id}
              className="rounded-2xl border border-slate-200 bg-white p-6"
            >
              {faq.category && (
                <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
                  {faq.category}
                </p>
              )}
              <h2 className="mt-2 text-xl font-semibold">{faq.question}</h2>
              <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
            </article>
          ))}
        </div>
      )}
    </Container>
  );
}
