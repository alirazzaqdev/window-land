import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST ?? 'smtp.sendgrid.net',
  port: Number(process.env.SMTP_PORT ?? 587),
  auth: {
    user: process.env.SMTP_USER ?? 'apikey',
    pass: process.env.SENDGRID_API_KEY,
  },
})

interface InquiryData {
  name: string
  company?: string
  phone: string
  email: string
  service: string
  location?: string
  message: string
}

export async function sendInquiryNotification(data: InquiryData): Promise<void> {
  const timestamp = new Date().toLocaleString('en-AE', { timeZone: 'Asia/Dubai' })

  await transporter.sendMail({
    from: `Window Land Website <${process.env.EMAIL_FROM}>`,
    to: process.env.EMAIL_TO,
    replyTo: data.email,
    subject: `New Inquiry — ${data.service} from ${data.name}${data.company ? ', ' + data.company : ''}`,
    text: `
NEW INQUIRY RECEIVED
──────────────────
Name: ${data.name}
Company: ${data.company ?? 'N/A'}
Phone: ${data.phone}
Email: ${data.email}
Service Required: ${data.service}
Location: ${data.location ?? 'Not specified'}
Message: ${data.message}
Date: ${timestamp}
Source: Website Contact Form
──────────────────
Reply directly to: ${data.email}
    `.trim(),
    html: `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#e8e0d0;padding:32px">
  <div style="border-left:3px solid #c9a84c;padding-left:20px;margin-bottom:24px">
    <h2 style="color:#c9a84c;margin:0 0 4px;font-size:20px">New Inquiry Received</h2>
    <p style="color:#7a7060;margin:0;font-size:12px">${timestamp} — Window Land Website</p>
  </div>
  <table style="width:100%;border-collapse:collapse">
    ${[
      ['Name', data.name],
      ['Company', data.company ?? 'N/A'],
      ['Phone', data.phone],
      ['Email', data.email],
      ['Service Required', data.service],
      ['Location', data.location ?? 'Not specified'],
    ]
      .map(
        ([k, v]) =>
          `<tr><td style="padding:8px 0;color:#7a7060;font-size:12px;width:140px">${k}</td><td style="padding:8px 0;color:#fff;font-size:14px">${v}</td></tr>`
      )
      .join('')}
  </table>
  <div style="margin-top:16px;padding:16px;background:#0f0f0f;border:1px solid rgba(201,168,76,0.2)">
    <p style="color:#7a7060;font-size:12px;margin:0 0 8px">Message:</p>
    <p style="color:#e8e0d0;font-size:14px;margin:0;line-height:1.6">${data.message}</p>
  </div>
  <p style="margin-top:24px;font-size:12px;color:#7a7060">Reply directly to: <a href="mailto:${data.email}" style="color:#c9a84c">${data.email}</a></p>
</div>
    `,
  })
}

export async function sendAutoReply(data: InquiryData): Promise<void> {
  await transporter.sendMail({
    from: `Window Land <${process.env.EMAIL_FROM}>`,
    to: data.email,
    subject: 'Thank You for Contacting Window Land',
    text: `
Dear ${data.name},

Thank you for reaching out to Window Land. We have received your inquiry
regarding ${data.service} and our team will contact you within 24 hours.

For urgent matters, please call: +971 50 455 2652

Best regards,
Muhammad Waqas Muhammad Akram
CEO — Window Land Glass & Aluminum Installation & Maintenance Co. LLC
Dubai, UAE | info@windowland.ae
    `.trim(),
    html: `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#e8e0d0;padding:32px">
  <div style="border-bottom:1px solid rgba(201,168,76,0.2);padding-bottom:20px;margin-bottom:24px">
    <h1 style="color:#c9a84c;margin:0;font-size:24px;font-weight:300;letter-spacing:2px">WINDOW LAND</h1>
    <p style="color:#7a7060;margin:4px 0 0;font-size:10px;letter-spacing:3px">GLASS &amp; ALUMINIUM · DUBAI UAE</p>
  </div>
  <p style="font-size:14px;color:#e8e0d0">Dear ${data.name},</p>
  <p style="font-size:14px;color:#7a7060;line-height:1.75">Thank you for reaching out to Window Land. We have received your inquiry regarding <strong style="color:#c9a84c">${data.service}</strong> and our team will contact you within 24 hours.</p>
  <p style="font-size:14px;color:#7a7060;line-height:1.75">For urgent matters, please call: <a href="tel:+971504552652" style="color:#c9a84c">+971 50 455 2652</a></p>
  <div style="margin-top:32px;padding-top:20px;border-top:1px solid rgba(201,168,76,0.2)">
    <p style="margin:0;font-size:13px;color:#e8e0d0">Muhammad Waqas Muhammad Akram</p>
    <p style="margin:4px 0 0;font-size:11px;color:#7a7060">CEO — Window Land Glass &amp; Aluminum Installation &amp; Maintenance Co. LLC</p>
    <p style="margin:2px 0 0;font-size:11px;color:#7a7060">Dubai, UAE | info@windowland.ae</p>
  </div>
</div>
    `,
  })
}
