import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Chat-Ayna",
  description: "Chat application made by Anurag",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} bg-zinc-200 lg:p-5 w-full h-[100dvh]`}>
        <main className="w-full h-full">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}