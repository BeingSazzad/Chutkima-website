import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import AccountShell from "@/components/layout/AccountShell";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pb-24 md:pb-0">
        <div className="shell py-8">
          <AccountShell>{children}</AccountShell>
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
