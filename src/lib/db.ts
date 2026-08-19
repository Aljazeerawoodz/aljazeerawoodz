import postgres from "postgres";

/**
 * Enquiry storage — completely optional. If DATABASE_URL isn't set, every
 * function here is a safe no-op (returns null/empty rather than throwing),
 * so the contact form keeps working via email alone until a database is
 * actually provisioned. Works with any standard Postgres connection
 * string — Vercel Postgres (Neon), Supabase, Railway, etc.
 */

let sql: ReturnType<typeof postgres> | null = null;
let schemaReady: Promise<void> | null = null;

function getClient() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  if (!sql) {
    sql = postgres(url, { ssl: "require", max: 3, idle_timeout: 20 });
  }
  return sql;
}

async function ensureSchema(client: ReturnType<typeof postgres>) {
  if (!schemaReady) {
    schemaReady = client`
      CREATE TABLE IF NOT EXISTS enquiries (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        name TEXT NOT NULL,
        company TEXT,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        project_type TEXT NOT NULL,
        project_location TEXT,
        requirement TEXT,
        message TEXT NOT NULL,
        locale TEXT,
        page TEXT,
        status TEXT NOT NULL DEFAULT 'new',
        notes TEXT
      )
    `.then(() => undefined);
  }
  await schemaReady;
}

export interface NewEnquiry {
  name: string;
  company?: string;
  email: string;
  phone: string;
  projectType: string;
  projectLocation?: string;
  requirement?: string;
  message: string;
  locale?: string;
  page?: string;
}

/** Best-effort insert — swallows errors so a DB hiccup never breaks the
    email-sending path in /api/contact, which is the real source of truth. */
export async function saveEnquiry(enquiry: NewEnquiry): Promise<void> {
  const client = getClient();
  if (!client) return;
  try {
    await ensureSchema(client);
    await client`
      INSERT INTO enquiries
        (name, company, email, phone, project_type, project_location, requirement, message, locale, page)
      VALUES
        (${enquiry.name}, ${enquiry.company ?? null}, ${enquiry.email}, ${enquiry.phone},
         ${enquiry.projectType}, ${enquiry.projectLocation ?? null}, ${enquiry.requirement ?? null},
         ${enquiry.message}, ${enquiry.locale ?? null}, ${enquiry.page ?? null})
    `;
  } catch (error) {
    console.error("[db] failed to save enquiry (email still sent independently)", error);
  }
}

export interface Enquiry {
  id: number;
  created_at: string;
  name: string;
  company: string | null;
  email: string;
  phone: string;
  project_type: string;
  project_location: string | null;
  requirement: string | null;
  message: string;
  locale: string | null;
  page: string | null;
  status: string;
  notes: string | null;
}

export async function listEnquiries(): Promise<Enquiry[]> {
  const client = getClient();
  if (!client) return [];
  await ensureSchema(client);
  const rows = await client<Enquiry[]>`SELECT * FROM enquiries ORDER BY created_at DESC`;
  return rows;
}

export async function updateEnquiry(id: number, fields: { status?: string; notes?: string }): Promise<void> {
  const client = getClient();
  if (!client) throw new Error("Database not configured");
  await ensureSchema(client);
  if (fields.status !== undefined) {
    await client`UPDATE enquiries SET status = ${fields.status} WHERE id = ${id}`;
  }
  if (fields.notes !== undefined) {
    await client`UPDATE enquiries SET notes = ${fields.notes} WHERE id = ${id}`;
  }
}

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}
