import Navbar from '@/components/ui/Navbar'
import Hero from '@/components/sections/Hero'
import Institut from '@/components/sections/Institut'
import Camp from '@/components/sections/Camp'
import Ebooks from '@/components/sections/Ebooks'
import MielScooter from '@/components/sections/MielScooter'
import Transferts from '@/components/sections/Transferts'
import Footer from '@/components/ui/Footer'
import WhatsappFloat from '@/components/ui/WhatsappFloat'
import LeadMagnetPopup from '@/components/ui/LeadMagnetPopup'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Institut />
      <Camp />
      <Ebooks />
      <Transferts />
      <MielScooter />
      <Footer />
      <WhatsappFloat />
      <LeadMagnetPopup />
    </main>
  )
}
