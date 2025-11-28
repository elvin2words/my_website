import nodemailer from "nodemailer";
import type { InsertContact } from "@shared/schema";

interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  to: string;
}

function getEmailConfig(): EmailConfig | null {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_SECURE,
    SMTP_USER,
    SMTP_PASS,
    EMAIL_FROM,
    EMAIL_TO,
  } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !EMAIL_FROM || !EMAIL_TO) {
    console.warn("Email configuration missing - emails will not be sent");
    return null;
  }

  return {
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT || "587"),
    secure: SMTP_SECURE === "true",
    user: SMTP_USER,
    pass: SMTP_PASS,
    from: EMAIL_FROM,
    to: EMAIL_TO,
  };
}

export async function sendContactEmail(data: InsertContact): Promise<boolean> {
  const config = getEmailConfig();
  
  if (!config) {
    console.log("Email not configured - skipping email send");
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {
        user: config.user,
        pass: config.pass,
      },
    });

    const mailOptions = {
      from: config.from,
      to: config.to,
      replyTo: data.email,
      subject: `Portfolio Contact: ${data.subject}`,
      text: `
Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <h3>Message:</h3>
        <p>${data.message.replace(/\n/g, "<br>")}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Contact email sent successfully");
    return true;
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return false;
  }
}
