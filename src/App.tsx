import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { Hero } from '@/sections/Hero'
import { TrustStrip } from '@/sections/TrustStrip'
import { WhyBlock } from '@/sections/WhyBlock'
import { Phases } from '@/sections/Phases'
import { Pricing } from '@/sections/Pricing'

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <TrustStrip />
        <WhyBlock />
        <Phases />
        <Pricing />
      </main>
      <Footer />
    </div>
  )
}
