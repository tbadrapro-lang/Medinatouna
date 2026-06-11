import Navbar from '@/components/ui/Navbar'
import ScrollProgress from '@/components/ui/ScrollProgress'
import Hero from '@/components/sections/Hero'
import TrustBar from '@/components/ui/TrustBar'
import Institut from '@/components/sections/Institut'
import Camp from '@/components/sections/Camp'
import Ebooks from '@/components/sections/Ebooks'
import MielScooter from '@/components/sections/MielScooter'
import Transferts from '@/components/sections/Transferts'
import Footer from '@/components/ui/Footer'
import WhatsappFloat from '@/components/ui/WhatsappFloat'
import LeadMagnetPopup from '@/components/ui/LeadMagnetPopup'
import StickyCTA from '@/components/ui/StickyCTA'
import { getContents } from '@/lib/getContents'

export const revalidate = 60

export default async function Home() {
  const [packsInstitut, packsCamp, ebooks] = await Promise.all([
    getContents('pack_institut'),
    getContents('pack_camp'),
    getContents('ebook'),
  ])

  return (
    <main>
      <ScrollProgress />
      <Navbar />
      <Hero />
      <TrustBar />
      <Institut packs={packsInstitut} />
      <Camp packs={packsCamp} />
      <Ebooks ebooks={ebooks} />
      <Transferts />
      <MielScooter />
      <Footer />
      <WhatsappFloat />
      <LeadMagnetPopup />
      <StickyCTA />
    </main>
  )
}
