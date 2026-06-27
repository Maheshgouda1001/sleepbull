import Container from "@/components/layout/Container";
import { generateSEO } from "@/config/seo";

export const metadata = generateSEO({
  title: "About Us",
  url: "/about",
});

export default function AboutPage() {
  return (
    <Container className="py-24">
      <h1 className="text-4xl font-bold">About SleepBull</h1>
      <p className="mt-4 max-w-2xl leading-8 text-slate-600">
        We craft premium mattresses for better sleep. This page is coming soon.
      </p>
    </Container>
  );
}
