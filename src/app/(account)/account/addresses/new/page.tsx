"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { App } from "antd";

export default function NewAddressPage() {
  const router = useRouter();
  const { message } = App.useApp();
  const [form, setForm] = useState({
    label: "Home",
    building: "",
    landmark: "",
    phone: "",
  });

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.building.trim() || !form.phone.trim()) {
      message.warning("Please fill in the building and phone number");
      return;
    }
    message.success("Address saved");
    router.push("/account/addresses");
  };

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="mb-5 text-xl font-extrabold tracking-tight text-ink">Add New Address</h1>

      <form onSubmit={save} className="card space-y-4 p-5">
        <div>
          <label className="text-sm font-semibold text-ink">Address label</label>
          <div className="mt-2 flex gap-2">
            {["Home", "Work", "Other"].map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setForm({ ...form, label: l })}
                className={`chip ${form.label === l ? "chip-active" : ""}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-ink">Building / apartment no.</label>
          <input
            className="input mt-2"
            placeholder="e.g. House 24, Block B"
            value={form.building}
            onChange={(e) => setForm({ ...form, building: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-ink">Landmark (optional)</label>
          <input
            className="input mt-2"
            placeholder="e.g. Ram Path"
            value={form.landmark}
            onChange={(e) => setForm({ ...form, landmark: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-ink">Phone number</label>
          <div className="mt-2 flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-xl border border-line bg-cream px-3 py-3 text-sm font-bold">
              🇳🇵 +977
            </span>
            <input
              className="input flex-1"
              placeholder="98XXXXXXXX"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
        </div>

        <button type="submit" className="btn-primary w-full">
          Save Changes
        </button>
      </form>
    </div>
  );
}
