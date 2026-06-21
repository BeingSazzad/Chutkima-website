import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import StickyCartBar from "@/components/layout/StickyCartBar";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pb-24 md:pb-0">{children}</main>
      <Footer />
      <StickyCartBar />
      <MobileBottomNav />
    </div>
  );
}
