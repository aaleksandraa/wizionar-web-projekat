import "dotenv/config";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mysql from "mysql2/promise";
import nodemailer from "nodemailer";
import { z } from "zod";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");

const env = {
  port: Number(process.env.PORT || 3000),
  host: process.env.HOST || "127.0.0.1",
  corsOrigin: process.env.CORS_ORIGIN || "https://wizionar.com,https://www.wizionar.com,https://wizionar.app",
  adminEmail: process.env.ADMIN_EMAIL || "info@wizionar.com",
  smtpFrom: process.env.SMTP_FROM || process.env.SMTP_USER || "info@wizionar.com",
  db: {
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || "wizionar",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || process.env.DB_DATABASE || "wizionar",
  },
};

const allowedOrigins = env.corsOrigin
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const answerSchema = z.object({
  stepKey: z.string().max(120).optional(),
  stepTitle: z.string().max(255).optional(),
  key: z.string().min(1).max(120),
  label: z.string().min(1).max(255),
  value: z.union([z.string(), z.array(z.string()), z.boolean(), z.null()]).optional(),
  displayValue: z.string().optional(),
});

const inquirySchema = z.object({
  source: z.literal("wizionar-project-inquiry"),
  submittedAt: z.string().optional(),
  submittedDate: z.string().regex(/^\d{2}\.\d{2}\.\d{4}$/),
  submittedDateTime: z.string().optional(),
  language: z.enum(["sr", "en", "de", "it"]),
  protection: z
    .object({
      websiteUrl: z.string().optional(),
      elapsedSeconds: z.number().optional(),
    })
    .optional(),
  complexityScore: z.enum(["low", "medium", "high", "enterprise"]),
  budgetScore: z.enum(["low_budget", "standard", "serious", "enterprise", "unknown"]),
  contact: z.object({
    fullName: z.string().min(2).max(190),
    companyName: z.string().max(190).optional().nullable(),
    email: z.string().email().max(190),
    phone: z.string().max(80).optional().nullable(),
    location: z.string().max(190).optional().nullable(),
  }),
  projectType: z.string().min(1).max(80),
  budgetRange: z.string().max(120).optional().nullable(),
  desiredStart: z.string().max(120).optional().nullable(),
  nextStep: z.string().max(190).optional().nullable(),
  emailDelivery: z
    .object({
      admin: z.object({
        to: z.string().email(),
        subject: z.string().min(1).max(255),
        body: z.string().min(1),
      }),
      client: z.object({
        to: z.string().email(),
        subject: z.string().min(1).max(255),
        body: z.string().min(1),
      }),
    })
    .optional(),
  answers: z.array(answerSchema).min(1).max(250),
});

const pool = mysql.createPool({
  ...env.db,
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 10),
  charset: "utf8mb4",
});

const mailTransport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: String(process.env.SMTP_SECURE || "false") === "true",
  auth: process.env.SMTP_USER
    ? {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      }
    : undefined,
});

const escapeHtml = (value) =>
  String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const renderEmailHtml = (title, body) =>
  `<!doctype html>
  <html>
    <body style="margin:0;background:#f6f6f6;font-family:Arial,sans-serif;color:#1b1b1b;">
      <div style="max-width:720px;margin:0 auto;padding:32px 18px;">
        <div style="background:#ffffff;border:1px solid #e7e7e7;border-radius:12px;padding:24px;">
          <h1 style="font-size:22px;line-height:1.3;margin:0 0 18px;">${escapeHtml(title)}</h1>
          <pre style="white-space:pre-wrap;font-family:Arial,sans-serif;font-size:14px;line-height:1.6;margin:0;">${escapeHtml(body)}</pre>
        </div>
      </div>
    </body>
  </html>`;

const normalizeText = (value) => {
  if (value === null || value === undefined) return null;
  return String(value).trim().replace(/[<>]/g, "").slice(0, 5000) || null;
};

const getAnswer = (answers, key) => answers.find((answer) => answer.key === key)?.value;

const insertInquiry = async (payload) => {
  const uuid = crypto.randomUUID();
  const answers = payload.answers;
  const businessDescription = normalizeText(getAnswer(answers, "business_description"));
  const desiredDeadline = normalizeText(getAnswer(answers, "desired_deadline"));

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [result] = await connection.execute(
      `INSERT INTO project_inquiries (
        uuid, full_name, company_name, email, phone, location, business_description,
        project_type, budget_range, desired_start, desired_deadline, next_step,
        complexity_score, budget_score, locale, submitted_date_label, raw_payload
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CAST(? AS JSON))`,
      [
        uuid,
        normalizeText(payload.contact.fullName),
        normalizeText(payload.contact.companyName),
        normalizeText(payload.contact.email),
        normalizeText(payload.contact.phone),
        normalizeText(payload.contact.location),
        businessDescription,
        normalizeText(payload.projectType),
        normalizeText(payload.budgetRange),
        normalizeText(payload.desiredStart),
        desiredDeadline,
        normalizeText(payload.nextStep),
        payload.complexityScore,
        payload.budgetScore,
        payload.language,
        payload.submittedDate,
        JSON.stringify(payload),
      ],
    );

    const inquiryId = result.insertId;

    for (const answer of answers) {
      await connection.execute(
        `INSERT INTO project_inquiry_answers (
          project_inquiry_id, step_key, step_title, question_key, question_label, answer_value, answer_label
        ) VALUES (?, ?, ?, ?, ?, CAST(? AS JSON), ?)`,
        [
          inquiryId,
          normalizeText(answer.stepKey),
          normalizeText(answer.stepTitle),
          normalizeText(answer.key),
          normalizeText(answer.label),
          JSON.stringify(answer.value ?? null),
          normalizeText(answer.displayValue),
        ],
      );
    }

    await connection.commit();
    return { id: inquiryId, uuid };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const sendInquiryEmails = async (payload, uuid) => {
  const adminDelivery = payload.emailDelivery?.admin;
  const clientDelivery = payload.emailDelivery?.client;

  const adminSubject = adminDelivery?.subject || `Novi projektni upitnik - ${payload.contact.fullName}`;
  const adminBody = `${adminDelivery?.body || ""}\n\nID prijave: ${uuid}`;
  const clientSubject = clientDelivery?.subject || "Kopija vašeg projektnog upitnika - Wizionar";
  const clientBody = clientDelivery?.body || adminBody;

  await mailTransport.sendMail({
    from: env.smtpFrom,
    to: env.adminEmail,
    replyTo: payload.contact.email,
    subject: adminSubject,
    text: adminBody,
    html: renderEmailHtml(adminSubject, adminBody),
  });

  await mailTransport.sendMail({
    from: env.smtpFrom,
    to: payload.contact.email,
    replyTo: env.adminEmail,
    subject: clientSubject,
    text: clientBody,
    html: renderEmailHtml(clientSubject, clientBody),
  });
};

const app = express();

app.set("trust proxy", 1);
app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("CORS origin is not allowed"));
    },
  }),
);
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", async (_request, response) => {
  await pool.query("SELECT 1");
  response.json({ ok: true });
});

app.post(
  "/api/project-inquiry",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: true,
    legacyHeaders: false,
  }),
  async (request, response) => {
    const parsed = inquirySchema.safeParse(request.body);

    if (!parsed.success) {
      response.status(422).json({ message: "Invalid inquiry payload", errors: parsed.error.flatten() });
      return;
    }

    const payload = parsed.data;

    if (payload.protection?.websiteUrl) {
      response.status(400).json({ message: "Spam protection failed" });
      return;
    }

    if (typeof payload.protection?.elapsedSeconds === "number" && payload.protection.elapsedSeconds < 8) {
      response.status(429).json({ message: "Submitted too quickly" });
      return;
    }

    try {
      const inquiry = await insertInquiry(payload);
      await sendInquiryEmails(payload, inquiry.uuid);
      response.status(201).json({ ok: true, uuid: inquiry.uuid });
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: "Could not store inquiry" });
    }
  },
);

if (fs.existsSync(distDir)) {
  app.use(express.static(distDir, { extensions: ["html"] }));
  app.use((request, response, next) => {
    if (request.method !== "GET") {
      next();
      return;
    }

    response.sendFile(path.join(distDir, "index.html"));
  });
}

app.listen(env.port, env.host, () => {
  console.log(`Wizionar server listening on http://${env.host}:${env.port}`);
});
