import Container from "@/components/layout/Container";
import ProfilePanel from "@/components/profile/ProfilePanel";
import { generateSEO } from "@/config/seo";

export const metadata = generateSEO({
  title: "Profile",
  url: "/profile",
});

export default function ProfilePage() {
  return (
    <Container className="py-24">
      <h1 className="text-4xl font-bold">My Account</h1>
      <ProfilePanel />
    </Container>
  );
}
