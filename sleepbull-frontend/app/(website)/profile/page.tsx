"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Package,
  Heart,
  MapPin,
  Lock,
  LogOut,
  Pencil,
  User,
  LifeBuoy,
} from "lucide-react";

import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";

import {
  getProfileClient,
  logout,
} from "@/services/auth.service";

import type { AuthUser } from "@/types/auth";
import { ApiError } from "@/lib/fetcher";

export default function ProfilePage() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const   router = useRouter();

  useEffect(() => {
    async function loadProfile() {
      try {
        const profile = await getProfileClient();
  
        setUser(profile);
      } catch (error) {
        if (error instanceof ApiError) {
          if (error.status === 401) {
            router.replace("/login");
            return;
          }
  
          // setError(error.message);
        } else {
          // setError("Something went wrong");
        }
      } finally {
        // setLoading(false);
      }
    }
  
    loadProfile();
  }, [router]);

  async function handleLogout() {
    await logout();
    window.location.href = "/login";
  }

  if (!user) {
    return (
      <Container className="py-20">
        Loading profile...
      </Container>
    );
  }

  return (
    <Container className="py-16">

      <div className="mx-auto max-w-5xl">

        <div className="mb-10 rounded-3xl border bg-white p-8 shadow-sm">

          <div className="flex items-center gap-5">

            <div className="grid h-20 w-20 place-items-center rounded-full bg-primary text-white">
              <User size={36} />
            </div>

            <div>
              <h1 className="text-3xl font-bold">
                Hello, {user.firstName ?? user.name}
              </h1>

              <p className="mt-2 text-slate-500">
                Manage your SleepBull account
              </p>
            </div>

          </div>

        </div>

        <div className="grid gap-8 lg:grid-cols-3">

          <div className="rounded-3xl border bg-white p-6 shadow-sm lg:col-span-2">

            <div className="mb-6 flex items-center justify-between">

              <h2 className="text-2xl font-semibold">
                Personal Information
              </h2>

              <Button>
                <Pencil size={18} />
                Edit Profile
              </Button>

            </div>

            <div className="grid gap-6 md:grid-cols-2">

              <div>
                <p className="text-sm text-slate-500">
                  First Name
                </p>

                <p className="font-medium">
                  {user.firstName}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Last Name
                </p>

                <p className="font-medium">
                  {user.lastName ?? "-"}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Email
                </p>

                <p className="font-medium">
                  {user.email}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Mobile
                </p>

                <p className="font-medium">
                  {user.phone ?? "-"}
                </p>
              </div>

            </div>

          </div>

          <div className="rounded-3xl border bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-xl font-semibold">
              Quick Actions
            </h2>

            <div className="space-y-2">

              <Link
                href="/orders"
                className="flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-slate-100"
              >
                <Package size={20} />
                My Orders
              </Link>

              <Link
                href="/wishlist"
                className="flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-slate-100"
              >
                <Heart size={20} />
                Wishlist
              </Link>

              <Link
                href="/addresses"
                className="flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-slate-100"
              >
                <MapPin size={20} />
                Saved Addresses
              </Link>

              <Link
                href="/change-password"
                className="flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-slate-100"
              >
                <Lock size={20} />
                Change Password
              </Link>

              <Link
                href="/contact"
                className="flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-slate-100"
              >
                <LifeBuoy size={20} />
                Help & Support
              </Link>

            </div>

            <Button
              variant="outline"
              className="mt-8 w-full"
              onClick={handleLogout}
            >
              <LogOut size={18} />
              Logout
            </Button>

          </div>

        </div>

      </div>

    </Container>
  );
}