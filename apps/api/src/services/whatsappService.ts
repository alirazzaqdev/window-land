import axios from 'axios'

interface InquiryData {
  name: string
  company?: string
  phone: string
  service: string
}

export async function sendWhatsAppNotification(data: InquiryData): Promise<void> {
  const token = process.env.WHATSAPP_TOKEN
  const phoneId = process.env.WHATSAPP_PHONE_ID
  const to = process.env.WHATSAPP_TO?.replace('+', '') ?? '971504552652'

  if (!token || !phoneId) {
    console.warn('WhatsApp credentials not configured, skipping notification')
    return
  }

  const timestamp = new Date().toLocaleString('en-AE', { timeZone: 'Asia/Dubai' })
  const message = `🔔 New Inquiry — Window Land Website\nName: ${data.name}\nCompany: ${data.company ?? 'N/A'}\nPhone: ${data.phone}\nService: ${data.service}\nTime: ${timestamp}`

  await axios.post(
    `https://graph.facebook.com/v20.0/${phoneId}/messages`,
    {
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: { body: message },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  )
}
