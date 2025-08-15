import nodemailer from 'nodemailer'

Deno.serve(async (req) => {
  const { name, message } = await req.json()

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: Deno.env.get('GMAIL_USER'),
      pass: Deno.env.get('GMAIL_PASS')
    }
  })

  await transporter.sendMail({
    from: `"留言通知" <${Deno.env.get('GMAIL_USER')}>`,
    to: Deno.env.get('NOTIFY_EMAIL'),
    subject: '网站有新的留言',
    text: `来自 ${name} 的留言：\n\n${message}`
  })

  return new Response(JSON.stringify({ status: 'ok' }), { headers: { 'Content-Type': 'application/json' } })
})
