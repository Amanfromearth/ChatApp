import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Chat-Ayna",
  description: "Chat application powered by Anurag",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} bg-zinc-200 md:p-5 w-full h-[100dvh]`}>
        <main className="w-full h-full">{children}</main>
      </body>
    </html>
  );
}