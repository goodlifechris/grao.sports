import TrendsSidebar from "@/components/TrendsSidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Communities",
};

export default function Page() {
  return (
    <main className="flex w-full min-w-0 ">
      {/* <div className="w-full min-w-0"> */}
        {/* <div className="rounded-2xl bg-card p-5 shadow-sm">
          <h1 className="text-center text-2xl font-bold">Communities</h1>
        </div> */}
        {/* <div className="w-full h-screen"> */}
      <iframe 
        src="https://wadau.netlify.app" 
        className="w-full h-full border-0"
        title="KothBiro Tournament Platform"
        allowFullScreen
      />
    {/* </div> */}
      {/* </div> */}
      <TrendsSidebar />
    </main>
  );
}
