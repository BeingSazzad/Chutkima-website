"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { ONBOARDING } from "@/Mockdata";
import { cn } from "@/lib/utils";

export default function OnboardingPage() {
  const router = useRouter();
  const [i, setI] = useState(0);
  const last = i === ONBOARDING.length - 1;
  const slide = ONBOARDING[i];

  const next = () => {
    if (last) router.push("/login");
    else setI((p) => p + 1);
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-brand-800 via-brand-900 to-black text-white">
      {/* top bar */}
      <div className="flex items-center justify-between p-5">
        <Logo variant="light" href={null} />
        <Link href="/home" className="text-sm font-semibold text-white/80 hover:text-white">
          Skip
        </Link>
      </div>

      {/* hero emoji */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 -z-10 rounded-full bg-brand-500/30 blur-3xl" />
          <div className="flex h-44 w-44 items-center justify-center rounded-[2.5rem] bg-white/10 text-8xl backdrop-blur">
            {slide.emoji}
          </div>
        </div>

        <h1 className="max-w-md text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
          {slide.title}
        </h1>
        <p className="mt-4 max-w-sm text-base text-white/80">{slide.body}</p>
      </div>

      {/* footer controls */}
      <div className="px-6 pb-10">
        <div className="mb-6 flex justify-center gap-2">
          {ONBOARDING.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={cn(
                "h-2 rounded-full bg-white/40 transition-all",
                idx === i ? "w-7 bg-white" : "w-2"
              )}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="mx-auto block w-full max-w-sm rounded-full bg-brand-500 py-4 text-center text-base font-bold text-white transition-colors hover:bg-brand-400"
        >
          {last ? "Get Started" : "Next"}
        </button>
      </div>
    </div>
  );
}
