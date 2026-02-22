import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex flex-col">
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto rounded-full overflow-hidden shadow-2xl border-4 border-white dark:border-slate-700">
            <img
              src="https://images.unsplash.com/photo-1507019978388-6d173e1b74ba?w=800&h=800&fit=crop"
              alt="Jesus Christ"
              className="object-cover w-full h-full"
            />
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-slate-100">
              ✝️ Welcome
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Welcome to Church
            </p>
            <p className="text-lg text-slate-500 dark:text-slate-500">
              "Come unto me, all ye that labour and are heavy laden, and I will give you rest." — Matthew 11:28
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/church/home">
              <Button size="lg" className="text-lg px-8 py-6">
                Enter Church
              </Button>
            </Link>
            <Link href="/church/scripture">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Read Scripture
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-6 text-center text-slate-400 text-sm">
        <p>✝️ Built with faith and love</p>
      </footer>
    </div>
  );
}
