import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = 'Burtech Solution <onboarding@resend.dev>'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'burgtechsolutions@gmail.com'

export async function sendContactEmail(data: {
  name: string; email: string; subject?: string; body: string
}) {
  await resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    reply_to: data.email,
    subject: `New message from ${data.name}${data.subject ? ': ' + data.subject : ''}`,
    html: `<h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
      ${data.subject ? `<p><strong>Subject:</strong> ${data.subject}</p>` : ''}
      <hr/>
      <p>${data.body.replace(/\n/g, '<br/>')}</p>`,
  })
}

export async function sendWelcomeEmail(to: string, name: string) {
  await resend.emails.send({
    from: FROM,
    to,
    subject: 'Welcome to Burtech Solution',
    html: `<h1>Welcome, ${name}!</h1>
      <p>Thanks for joining Burtech Solution. We are excited to work with you.</p>
      <p>Feel free to explore our services or reach out anytime.</p>
      <p>The Burtech Team</p>`,
  })
}

export async function sendOtpEmail(to: string, name: string, otp: string) {
  await resend.emails.send({
    from: FROM,
    to,
    subject: 'Your Burtech Admin Login Code',
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h1>Your One-Time Password</h1>
        <p>Hi ${name},</p>
        <p>Use the code below to complete your login:</p>
        <p style="font-size: 2rem; font-family: monospace; font-weight: bold; letter-spacing: 0.25em;">${otp}</p>
        <p>This code expires in <strong>10 minutes</strong>.</p>
        <p style="color: #e53e3e;"><strong>Do not share this code with anyone.</strong></p>
      </div>`,
  })
}
