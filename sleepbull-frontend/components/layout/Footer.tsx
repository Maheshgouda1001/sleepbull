import Link from "next/link";

import Container from "./Container";
import NewsletterForm from "./NewsletterForm";

import { footerNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="mt-12 bg-primary text-text-white">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-5">
          <div className="xl:col-span-2">
            <h2 className="mb-4 text-2xl font-bold">{siteConfig.name}</h2>
            <p className="max-w-md text-sm leading-7 text-text-white/75">
              Premium mattresses engineered for better sleep, orthopedic
              support and luxurious comfort.
            </p>
          </div>

          <div>
            <h3 className="mb-5 font-semibold">Shop</h3>
            <div className="space-y-3">
              {footerNavigation.shop.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-text-white/75 hover:text-text-white"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-5 font-semibold">Company</h3>
            <div className="space-y-3">
              {footerNavigation.company.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-text-white/75 hover:text-text-white"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-10 grid gap-6 border-t border-text-white/15 pt-6 md:grid-cols-2">
          <div className="space-y-3">
            {footerNavigation.support.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="mr-6 inline-block text-sm text-text-white/60 hover:text-text-white"
              >
                {item.title}
              </Link>
            ))}
          </div>

          <p className="text-sm text-text-white/60 md:text-right">
            © {new Date().getFullYear()} {siteConfig.name}. All Rights
            Reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
