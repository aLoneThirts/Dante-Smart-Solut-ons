// pages/api/subscribe.js
import fs from 'fs'
import path from 'path'
import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Sadece POST kabul edilir.' })
  }
  const { email } = req.body
  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Geçerli bir email girin.' })
  }

  // 1) Abone listesini güncelle
  const filePath = path.join(process.cwd(), 'data', 'subscribers.json')
  let list = []
  try {
    list = JSON.parse(fs.readFileSync(filePath, 'utf8') || '[]')
  } catch {
    list = []
  }
  if (!list.includes(email)) {
    list.push(email)
    fs.writeFileSync(filePath, JSON.stringify(list, null, 2))
  }

  // 2) Hemen 200 dön
  res.status(200).json({ message: 'Aboneliğiniz başarıyla kaydedildi!' })

  // 3) Asenkron mail gönderimi (Gmail service kullanımı)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,  // 16 haneli App Password
    },
    logger: true,          // log’ları console’a bas (hata ayıklama için)
    debug: true,           // debug modda daha fazla detay
    connectionTimeout: 10000 // 10 saniye timeout
  })

  // Kullanıcıya onay maili
  transporter.sendMail({
    from: `"Dante Smart" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Aboneliğiniz Onaylandı!',
    html: `
      <h2>Hoşgeldiniz!</h2>
      <p>${email} adresiniz başarıyla abone listemize eklendi.</p>
    `
  })
  .then(info => {
    console.log('✔ Onay maili gönderildi:', info.response)
  })
  .catch(err => {
    console.error('🚨 Onay maili gönderilemedi:', err)
  })

  // Opsiyonel: Sana bildirim maili
  if (process.env.RECEIVER_EMAIL) {
    transporter.sendMail({
      from: `"Dante Smart" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: 'Yeni Abone Geldi',
      html: `<p>Yeni abone: <strong>${email}</strong></p>`
    })
    .then(info => {
      console.log('✔ Bildirim maili gönderildi:', info.response)
    })
    .catch(err => {
      console.error('🚨 Bildirim maili gönderilemedi:', err)
    })
  }
}
i