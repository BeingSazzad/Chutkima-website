"use client";

import { useState } from "react";
import { Modal, Input, App } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setLocation } from "@/redux/slices/authSlice";
import { STORE } from "@/Mockdata";

const SUGGESTIONS = [
  "Traffic Chowk, Butwal",
  "Amarpath-4, Butwal",
  "Golpark, Butwal",
  "Milanchowk, Butwal",
  "Devinagar, Butwal",
];

export default function LocationPill({ light = false }: { light?: boolean }) {
  const dispatch = useAppDispatch();
  const location = useAppSelector((s) => s.auth.location);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(location);
  const { message } = App.useApp();

  const save = (loc: string) => {
    dispatch(setLocation(loc));
    setOpen(false);
    message.success("Delivery location updated");
  };

  return (
    <>
      <button
        onClick={() => {
          setValue(location);
          setOpen(true);
        }}
        className={`flex items-center gap-1 text-left text-[13px] font-medium ${
          light ? "text-white/85" : "text-ink-muted"
        }`}
      >
        <span className="text-sm">📍</span>
        <span className="max-w-[180px] truncate">{location}</span>
        <span className="text-[10px]">▾</span>
      </button>

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        title="Choose delivery location"
        centered
      >
        <p className="mb-3 text-sm text-ink-muted">
          {STORE.name} delivers across {STORE.city} in {STORE.etaMins} minutes.
        </p>
        <Input.Search
          placeholder="Search your area…"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onSearch={(v) => v.trim() && save(v.trim())}
          enterButton="Set"
          size="large"
        />
        <div className="mt-4 space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
            Popular areas
          </p>
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => save(s)}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-ink hover:bg-cream"
            >
              <span>📍</span> {s}
            </button>
          ))}
        </div>
      </Modal>
    </>
  );
}
