"use client";

import { useRef, useState, type FormEvent } from "react";
import type { Locale } from "@/i18n/locales";
import type { Dictionary } from "@/i18n/dictionaries";
import { projectTypes } from "@/data/company";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const [status, setStatus] = useState<Status>("idle");
  const startedAt = useRef(Date.now());
  const t = dictionary.contactForm;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("locale", locale);
    data.set("startedAt", String(startedAt.current));
    data.set("page", typeof window !== "undefined" ? window.location.pathname : "");

    try {
      const res = await fetch("/api/contact", { method: "POST", body: data });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-sm border border-charcoal/15 bg-transparent px-4 py-3 text-charcoal placeholder:text-charcoal/40 focus:border-teal focus:outline-none";
  const labelClass = "mb-2 block text-sm font-medium text-charcoal/70";

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {/* Honeypot — hidden from real users. Zero-sized + clipped in place
          rather than shifted off-canvas, so it can never widen the page's
          scrollable area (a real gotcha with the more common -9999px
          pattern). */}
      <div className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" className={labelClass}>
          {t.name} *
        </label>
        <input id="name" name="name" type="text" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="company" className={labelClass}>
          {t.company}
        </label>
        <input id="company" name="company" type="text" className={inputClass} />
      </div>
      <div>
        <label htmlFor="email" className={labelClass}>
          {t.email} *
        </label>
        <input id="email" name="email" type="email" required className={inputClass} dir="ltr" />
      </div>
      <div>
        <label htmlFor="phone" className={labelClass}>
          {t.phone} *
        </label>
        <input id="phone" name="phone" type="tel" required className={inputClass} dir="ltr" />
      </div>
      <div>
        <label htmlFor="projectType" className={labelClass}>
          {t.projectType} *
        </label>
        <select id="projectType" name="projectType" required defaultValue="" className={inputClass}>
          <option value="" disabled>
            —
          </option>
          {projectTypes[locale].map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="projectLocation" className={labelClass}>
          {t.projectLocation}
        </label>
        <input id="projectLocation" name="projectLocation" type="text" className={inputClass} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="requirement" className={labelClass}>
          {t.requirement}
        </label>
        <input id="requirement" name="requirement" type="text" className={inputClass} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className={labelClass}>
          {t.message} *
        </label>
        <textarea id="message" name="message" required rows={5} className={inputClass} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="attachment" className={labelClass}>
          {t.attachment}
        </label>
        <input
          id="attachment"
          name="attachment"
          type="file"
          accept="image/png,image/jpeg,image/webp,application/pdf"
          className="w-full text-sm text-charcoal/70 file:me-4 file:rounded-full file:border-0 file:bg-charcoal file:px-4 file:py-2 file:text-sm file:text-warm"
        />
      </div>

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          data-cursor-hover
          className="rounded-full bg-charcoal px-8 py-4 text-sm font-medium text-warm transition-transform hover:scale-[1.02] disabled:opacity-60"
        >
          {status === "submitting" ? t.submitting : t.submit}
        </button>

        {status === "success" ? <p className="mt-4 text-sm text-emerald-700">{t.success}</p> : null}
        {status === "error" ? <p className="mt-4 text-sm text-red-700">{t.error}</p> : null}
      </div>
    </form>
  );
}
