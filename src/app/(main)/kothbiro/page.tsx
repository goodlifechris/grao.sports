import TrendsSidebar from "@/components/TrendsSidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Communities",
};

export default function Page() {
  return (
    <main className="flex w-full min-w-0">
     
      <iframe 
        src="https://kothbiro.netlify.app" 
        className="w-full h-full border-0"
        title="KothBiro Tournament Platform"
        allowFullScreen
      />

      <TrendsSidebar />
    </main>
  );
}
