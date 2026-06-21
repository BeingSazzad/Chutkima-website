"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { App } from "antd";
import { useAppDispatch } from "@/redux/hooks";
import { setPendingPhone, continueAsGuest } from "@/redux/slices/authSlice";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { message } = App.useApp();
  const [phone, setPhone] = useState("");

  const sendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 9) {
      message.warning("Please enter a valid 10-digit phone number");
      return;
    }
    dispatch(setPendingPhone(`+977 ${digits}`));
    message.success("OTP sent to your phone");
    router.push("/verify");
  };

  return (
    <div className="animate-fade-up">
      <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-ink">
        Enter your phone number to continue
      </h1>
      <p className="mt-2 text-sm text-ink-muted">We&apos;ll text an OTP to your phone.</p>

      <form onSubmit={sendOtp} className="mt-7">
        <label className="text-sm font-semibold text-ink">Phone number</label>
        <div className="mt-2 flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-xl border border-line bg-cream px-3 py-3 text-sm font-bold text-ink">
            🇳🇵 +977
          </span>
          <input
            type="tel"
            inputMode="numeric"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="98XXXXXXXX"
            className="input flex-1"
            autoFocus
          />
        </div>

        <button type="submit" className="btn-primary mt-5 w-full">
          Send OTP
        </button>
      </form>

      <button
        onClick={() => {
          dispatch(continueAsGuest());
          router.push("/home");
        }}
        className="mt-4 flex w-full items-center justify-center gap-2 text-sm font-semibold text-ink-soft hover:text-brand-700"
      >
        🏪 Shop as Guest
      </button>

      <p className="mt-8 text-center text-xs text-ink-muted">
        By continuing you agree to our{" "}
        <a href="/terms" className="font-semibold text-brand-700">Terms</a> &{" "}
        <a href="/privacy" className="font-semibold text-brand-700">Privacy Policy</a>.
      </p>
    </div>
  );
}
