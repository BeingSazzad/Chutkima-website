"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { App } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { loginSuccess } from "@/redux/slices/authSlice";

const LEN = 6;

export default function VerifyPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { message } = App.useApp();
  const pendingPhone = useAppSelector((s) => s.auth.pendingPhone);

  const [digits, setDigits] = useState<string[]>(Array(LEN).fill(""));
  const [seconds, setSeconds] = useState(42);
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    refs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [seconds]);

  const maskedPhone = pendingPhone
    ? pendingPhone.replace(/(\+977\s?\d{2})\d+/, "$1••••••")
    : "+977 98••••••";

  const filled = digits.join("").length === LEN;

  const onChange = (i: number, val: string) => {
    const v = val.replace(/\D/g, "");
    if (!v) {
      setDigits((d) => d.map((x, idx) => (idx === i ? "" : x)));
      return;
    }
    const chars = v.split("");
    setDigits((d) => {
      const next = [...d];
      let idx = i;
      for (const c of chars) {
        if (idx < LEN) next[idx] = c;
        idx++;
      }
      return next;
    });
    const nextIdx = Math.min(LEN - 1, i + chars.length);
    refs.current[nextIdx]?.focus();
  };

  const onKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
  };

  const verify = () => {
    if (!filled) return;
    dispatch(loginSuccess({}));
    message.success("Verified! Welcome to Chutkima 🎉");
    router.push("/home");
  };

  return (
    <div className="animate-fade-up">
      <Link
        href="/login"
        className="mb-6 inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft hover:border-brand-300"
      >
        ←
      </Link>

      <h1 className="text-2xl font-extrabold tracking-tight text-ink">Enter The Code</h1>
      <p className="mt-1 text-sm text-ink-muted">Sent to {maskedPhone}</p>

      <div className="mt-6 flex justify-between gap-2">
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            value={d}
            onChange={(e) => onChange(i, e.target.value)}
            onKeyDown={(e) => onKeyDown(i, e)}
            inputMode="numeric"
            maxLength={1}
            className={`h-14 w-full rounded-xl border text-center text-xl font-bold text-ink outline-none transition-colors ${
              d ? "border-brand-500 bg-brand-50/40" : "border-line bg-white"
            } focus:border-brand-500 focus:ring-2 focus:ring-brand-100`}
          />
        ))}
      </div>

      <p className="mt-4 text-center text-sm text-ink-muted">
        {seconds > 0 ? (
          <>
            Resend OTP in{" "}
            <span className="font-bold text-ink">0:{seconds.toString().padStart(2, "0")}s</span>
          </>
        ) : (
          <button
            onClick={() => setSeconds(42)}
            className="font-bold text-brand-700 hover:underline"
          >
            Resend OTP
          </button>
        )}
      </p>

      <button
        onClick={verify}
        disabled={!filled}
        className="btn-primary mt-5 w-full"
      >
        Verify &amp; Continue
      </button>
    </div>
  );
}
