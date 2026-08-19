"use client";

import { useState } from "react";
import type { Enquiry } from "@/lib/db";

const STATUSES = ["new", "contacted", "quoted", "won", "lost"] as const;

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-amber-100 text-amber-800",
  quoted: "bg-purple-100 text-purple-800",
  won: "bg-green-100 text-green-800",
  lost: "bg-gray-200 text-gray-600",
};

export default function EnquiryRow({ enquiry }: { enquiry: Enquiry }) {
  const [status, setStatus] = useState(enquiry.status);
  const [notes, setNotes] = useState(enquiry.notes ?? "");
  const [saving, setSaving] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function patch(fields: { status?: string; notes?: string }) {
    setSaving("saving");
    try {
      const res = await fetch(`/api/admin/enquiries/${enquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (!res.ok) throw new Error("failed");
      setSaving("saved");
      setTimeout(() => setSaving("idle"), 1500);
    } catch {
      setSaving("error");
    }
  }

  return (
    <tr className="border-b border-gray-200 align-top">
      <td className="whitespace-nowrap px-3 py-3 text-xs text-gray-500">
        {new Date(enquiry.created_at).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}
      </td>
      <td className="px-3 py-3">
        <div className="font-medium text-gray-900">{enquiry.name}</div>
        {enquiry.company ? <div className="text-xs text-gray-500">{enquiry.company}</div> : null}
      </td>
      <td className="px-3 py-3 text-sm">
        <a href={`mailto:${enquiry.email}`} className="text-blue-600 hover:underline">
          {enquiry.email}
        </a>
        <div className="text-gray-500">{enquiry.phone}</div>
      </td>
      <td className="px-3 py-3 text-sm">
        <div>{enquiry.project_type}</div>
        {enquiry.project_location ? <div className="text-xs text-gray-500">{enquiry.project_location}</div> : null}
      </td>
      <td className="max-w-xs px-3 py-3 text-sm text-gray-700">
        {enquiry.requirement ? <div className="mb-1 text-xs text-gray-500">{enquiry.requirement}</div> : null}
        <div className="whitespace-pre-wrap">{enquiry.message}</div>
      </td>
      <td className="px-3 py-3">
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            patch({ status: e.target.value });
          }}
          className={`rounded-full border-0 px-2 py-1 text-xs font-medium capitalize ${STATUS_COLORS[status] ?? "bg-gray-100"}`}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </td>
      <td className="min-w-[180px] px-3 py-3">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          onBlur={() => patch({ notes })}
          placeholder="Internal notes…"
          rows={2}
          className="w-full rounded border border-gray-300 px-2 py-1 text-xs"
        />
        <div className="mt-1 h-3 text-[10px] text-gray-400">
          {saving === "saving" ? "Saving…" : saving === "saved" ? "Saved" : saving === "error" ? "Failed to save" : ""}
        </div>
      </td>
    </tr>
  );
}
