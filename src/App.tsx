import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { About } from "@/components/About"
import { Features } from "@/components/Features"
import { Simulation } from "@/components/Simulation"
import { Advantages } from "@/components/Advantages"
import { Partners } from "@/components/Partners"
import { FinalCTA } from "@/components/FinalCTA"
import { Contact } from "@/components/Contact"
import { Footer } from "@/components/Footer"

function App() {
  return (
    <div className="min-h-screen bg-background dark">
      <Header />
      <main>
        <Hero />
        <About />
        <Features />
        <Simulation />
        <Advantages />
        <Partners />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
