import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { updateEnquiry } from "@/lib/db";

// Auth is enforced by src/middleware.ts (Basic Auth) for every /api/admin/*
// route — nothing further needed here.

const schema = z.object({
  status: z.enum(["new", "contacted", "quoted", "won", "lost"]).optional(),
  notes: z.string().max(4000).optional(),
});

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isInteger(id)) {
    return NextResponse.json({ ok: false, error: "invalid_id" }, { status: 400 });
  }

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid_input" }, { status: 400 });
  }

  try {
    await updateEnquiry(id, parsed.data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[admin] failed to update enquiry", error);
    return NextResponse.json({ ok: false, error: "update_failed" }, { status: 500 });
  }
}
