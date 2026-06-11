export const CONFIG = {
  WHATSAPP_FR: '33764850414',
  WHATSAPP_PRESTARABIA: '966582538386',
  SITE_URL: 'https://lesbonsplansdarabie.com',
  SITE_NAME: "Les Bons Plans d'Arabie",
  EMAIL_CONTACT: 'contact@lesbonsplansdarabie.com',
  INSTAGRAM: '#',
  TIKTOK: '#',
  PAYPAL: '#',
}

export const waLink = (num: string, text: string) =>
  `https://wa.me/${num}?text=${encodeURIComponent(text)}`
