import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl mx-auto text-center space-y-8 animate-in fade-in duration-1000">
        <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto rounded-full overflow-hidden shadow-2xl ring-4 ring-blue-200">
          <Image
            src="https://images.unsplash.com/photo-1507019978388-6d173e1b74ba?w=800&h=800&fit=crop"
            alt="Jesus Christ"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-800">
            ✝️ Welcome
          </h1>
          <p className="text-xl md:text-2xl text-slate-600">
            Ward Conference 2026
          </p>
        </div>

        <blockquote className="text-lg md:text-xl text-slate-500 italic border-l-4 border-blue-400 pl-6 py-2 text-left">
          "Come unto me, all ye that labour and are heavy laden, and I will give you rest."
          <cite className="block mt-2 text-sm not-italic">— Matthew 11:28</cite>
        </blockquote>

        <div className="pt-8">
          <Button size="lg" className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-shadow">
            Begin Presentation →
          </Button>
        </div>

        <footer className="pt-12 text-slate-400 text-sm">
          <p>The Church of Jesus Christ of Latter-day Saints</p>
        </footer>
      </div>
    </div>
  );
}
