import Link from "next/link";
import Logo from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <Logo href="/home" />
      <div className="mt-8 text-7xl">🧺</div>
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink">
        This shelf is empty
      </h1>
      <p className="mt-2 max-w-sm text-sm text-ink-muted">
        The page you&apos;re looking for moved or never existed. Let&apos;s get you back to
        shopping.
      </p>
      <Link href="/home" className="btn-primary mt-6 px-8">
        Back to home
      </Link>
    </div>
  );
}
