import { isDatabaseConfigured, listEnquiries } from "@/lib/db";
import EnquiryRow from "@/components/admin/EnquiryRow";

export const metadata = { title: "Enquiries · Admin" };

// Always hit the database fresh — this is an internal tool, not a
// marketing page, so it should never serve a stale/cached list.
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!isDatabaseConfigured()) {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="font-display text-2xl text-charcoal">Dashboard not configured</h1>
        <p className="mt-4 text-sm text-gray-600">
          Set <code className="rounded bg-gray-100 px-1.5 py-0.5">DATABASE_URL</code> in your environment
          (Vercel → Storage → create a Postgres database → it fills this in automatically) and redeploy to
          start collecting enquiries here.
        </p>
      </div>
    );
  }

  const enquiries = await listEnquiries();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-charcoal">Enquiries</h1>
          <p className="mt-1 text-sm text-gray-500">
            {enquiries.length} total · newest first. Status and notes save automatically.
          </p>
        </div>
      </div>

      {enquiries.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 px-6 py-16 text-center text-sm text-gray-500">
          No enquiries yet. New contact-form submissions will appear here automatically.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
            <thead className="bg-gray-50">
              <tr className="text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                <th className="px-3 py-3">Date</th>
                <th className="px-3 py-3">Name</th>
                <th className="px-3 py-3">Contact</th>
                <th className="px-3 py-3">Project</th>
                <th className="px-3 py-3">Message</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-3 py-3">Notes</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((enquiry) => (
                <EnquiryRow key={enquiry.id} enquiry={enquiry} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
