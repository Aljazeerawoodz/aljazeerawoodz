import nodemailer from "nodemailer";

export interface EnquiryPayload {
  name: string;
  company?: string;
  email: string;
  phone: string;
  projectType: string;
  projectLocation?: string;
  requirement?: string;
  message: string;
  locale: string;
  page?: string;
  attachment?: { filename: string; content: Buffer; contentType?: string };
}

/**
 * Server-only mail transport. Reads Microsoft 365 / SMTP credentials from
 * environment variables — never import this file from client components.
 */
function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function sendEnquiryEmail(payload: EnquiryPayload) {
  const transporter = getTransporter();
  const to = process.env.EMAIL_TO || process.env.SMTP_USER;
  const fromAddress = process.env.EMAIL_FROM || process.env.SMTP_USER;

  if (!transporter || !to || !fromAddress) {
    throw new Error("Email is not configured. Set SMTP_HOST/SMTP_USER/SMTP_PASSWORD/EMAIL_TO in .env.local");
  }

  // A display name on the sender so it reads as "Al Jazeera Woodz Website"
  // in the inbox instead of a bare email address (or "me", when the send
  // and receive mailbox happen to be the same account, as with the Gmail
  // SMTP fallback).
  const from = `"Al Jazeera Woodz Website" <${fromAddress}>`;

  const lines = [
    `New enquiry from aljazeerawoodz.com (${payload.locale.toUpperCase()})`,
    "",
    `Name: ${payload.name}`,
    payload.company ? `Company: ${payload.company}` : null,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    `Project type: ${payload.projectType}`,
    payload.projectLocation ? `Project location: ${payload.projectLocation}` : null,
    payload.requirement ? `Requirement: ${payload.requirement}` : null,
    "",
    "Message:",
    payload.message,
    payload.page ? `\nSubmitted from: ${payload.page}` : null,
  ].filter(Boolean);

  await transporter.sendMail({
    to,
    from,
    replyTo: payload.email,
    subject: `New enquiry — ${payload.name} (${payload.projectType})`,
    text: lines.join("\n"),
    attachments: payload.attachment
      ? [{ filename: payload.attachment.filename, content: payload.attachment.content, contentType: payload.attachment.contentType }]
      : undefined,
  });
}
