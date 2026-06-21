"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dropdown } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/slices/authSlice";

export default function AccountButton() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, isGuest, name } = useAppSelector((s) => s.auth);

  if (!isAuthenticated) {
    return (
      <Link
        href="/login"
        className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand-300 hover:text-brand-700 sm:px-4"
      >
        <span>👤</span>
        <span className="hidden sm:inline">{isGuest ? "Sign in" : "Login"}</span>
      </Link>
    );
  }

  const first = name.split(" ")[0];

  return (
    <Dropdown
      placement="bottomRight"
      menu={{
        items: [
          { key: "profile", label: <Link href="/account">My account</Link> },
          { key: "orders", label: <Link href="/account/orders">Order history</Link> },
          { key: "addresses", label: <Link href="/account/addresses">Saved addresses</Link> },
          { key: "wallet", label: <Link href="/account/wallet">Wallet</Link> },
          { type: "divider" },
          {
            key: "logout",
            label: "Log out",
            danger: true,
            onClick: () => {
              dispatch(logout());
              router.push("/home");
            },
          },
        ],
      }}
    >
      <button className="flex items-center gap-2 rounded-full border border-line bg-white px-2 py-1.5 pr-3 text-sm font-semibold text-ink transition-colors hover:border-brand-300">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
          {first.charAt(0)}
        </span>
        <span className="hidden sm:inline">{first}</span>
      </button>
    </Dropdown>
  );
}
