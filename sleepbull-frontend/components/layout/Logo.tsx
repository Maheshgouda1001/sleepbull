import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/config/site";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3"
    >
      <Image
        src={siteConfig.logo}
        alt={siteConfig.name}
        width={160}
        height={42}
        priority
      />
    </Link>
  );
}