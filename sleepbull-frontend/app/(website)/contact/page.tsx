import Container from "@/components/layout/Container";
import ContactForm from "@/components/contact/ContactForm";
import { generateSEO } from "@/config/seo";
import { siteConfig } from "@/config/site";

export const metadata = generateSEO({
  title: "Contact",
  url: "/contact",
});

export default function ContactPage() {
  return (
    <Container className="py-24">
      <h1 className="text-4xl font-bold">Contact Us</h1>
      <p className="mt-4 max-w-2xl leading-8 text-slate-600">
        Have a question about our mattresses? Send us a message and our sleep
        experts will get back to you.
      </p>

      <div className="mt-8 grid gap-4 text-slate-600 md:grid-cols-2">
        <p>📞 {siteConfig.phone}</p>
        <p>✉ {siteConfig.email}</p>
      </div>

      <ContactForm />
    </Container>
  );
}
