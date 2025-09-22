import loginImage from "@/assets/image.jpg";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import GoogleSignInButton from "./google/GoogleSignInButton";
import LoginForm from "./LoginForm";
import HeroSection from "@/components/views/HeroSection";
import FeaturesSection from "@/components/views/FeaturesSection";
import PlayerProfileSection from "@/components/views/PlayerProfileSection";
import KothbiroTournamentSection from "@/components/views/KothbiroTournamentSection";

export const metadata: Metadata = {
  title: "Login",
};

export default function Page() {


  return (
    <main className="items-center justify-center p-5 bg-white">
            <>
          <HeroSection  />
          <FeaturesSection />
          <PlayerProfileSection/>
          <KothbiroTournamentSection/>
        </>
      <div className="flex h-full items-center justify-center p-5 max-h-[40rem] mx-auto w-full max-w-[64rem] rounded-2xl bg-card shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <h1 className="text-center text-3xl font-bold">Login to Grao</h1>
          <div className="space-y-5">
            <GoogleSignInButton />
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-muted" />
              <span>OR</span>
              <div className="h-px flex-1 bg-muted" />
            </div>
            <LoginForm />
            <Link href="/signup" className="block text-center hover:underline">
              Don&apos;t have an account? Sign up
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
