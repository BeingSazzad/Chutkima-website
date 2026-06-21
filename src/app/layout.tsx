import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/components/providers/ReduxProvider";
import AntdProvider from "@/components/providers/AntdProvider";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chutkima — Groceries in minutes, not hours",
  description:
    "Butwal's fastest dark-store. Daily essentials delivered to your door in 10–15 minutes. Tap. Snap. Deliver.",
  applicationName: "Chutkima",
  keywords: ["grocery delivery", "Butwal", "quick commerce", "Chutkima", "Nepal groceries"],
};

export const viewport: Viewport = {
  themeColor: "#0e7a5f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="font-sans antialiased">
        <ReduxProvider>
          <AntdProvider>{children}</AntdProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
