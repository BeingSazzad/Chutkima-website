import Logo from "@/components/ui/Logo";
import SearchBar from "./SearchBar";
import LocationPill from "./LocationPill";
import CartButton from "./CartButton";
import AccountButton from "./AccountButton";
import { STORE } from "@/Mockdata";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white shadow-nav">
      <div className="shell">
        {/* Top row */}
        <div className="flex h-[68px] items-center gap-4 lg:gap-6">
          <Logo />

          {/* Delivery time + location (Blinkit-style) */}
          <div className="hidden border-l border-line pl-4 lg:block lg:pl-6">
            <p className="text-[15px] font-extrabold leading-tight text-ink">
              Delivery in {STORE.etaMins} minutes
            </p>
            <LocationPill />
          </div>

          {/* Desktop search */}
          <div className="hidden max-w-2xl flex-1 md:block">
            <SearchBar placeholder={`Search "milk", "noodles", "oil"…`} />
          </div>

          <div className="ml-auto flex items-center gap-3">
            <AccountButton />
            <CartButton />
          </div>
        </div>

        {/* Mobile: location + search */}
        <div className="pb-3 md:hidden">
          <div className="mb-2 flex items-center justify-between">
            <div>
              <p className="text-sm font-extrabold leading-tight text-ink">
                Delivery in {STORE.etaMins} minutes
              </p>
              <LocationPill />
            </div>
          </div>
          <SearchBar placeholder="Search for atta, dal, coke and more" />
        </div>
      </div>
    </header>
  );
}
