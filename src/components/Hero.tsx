import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export function Hero() {
  return (
    <section 
      className="h-screen max-h-screen flex items-start justify-center px-4 pt-4 md:pt-8 lg:pt-12 relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/hero-background.jpg')"
      }}
    >
      {/* Overlay escuro para melhorar legibilidade */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="container flex flex-col items-center gap-1 md:gap-3 text-center max-w-6xl relative z-10">
        <motion.div
          className="flex flex-col items-center gap-3 md:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img 
            src="/logo-sanus.svg" 
            alt="Sanus" 
            className="h-56 w-56 sm:h-64 sm:w-64 md:h-72 md:w-72 lg:h-80 lg:w-80 xl:h-96 xl:w-96"
          />
          
          <motion.h1
            className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="text-gold">
              Inteligência financeira
            </span>{" "}
            para médicos e clínicas
          </motion.h1>
        </motion.div>
        
        <motion.p
          className="max-w-3xl leading-relaxed text-foreground/80 text-sm sm:text-base md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Somos uma plataforma financeira especializada no setor de saúde. Criada para médicos, clínicas e hospitais que buscam soluções de crédito seguras, transparentes e sob medida para suas necessidades profissionais e pessoais.
        </motion.p>
        
        <motion.div
          className="flex flex-col gap-3 sm:flex-row sm:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button asChild size="lg" className="text-sm sm:text-base px-4 py-3 h-auto bg-gold-gradient border-gold shadow-gold hover:shadow-gold/60 text-black font-semibold">
            <a href="#features">
              Descubra sua linha de crédito
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button asChild size="lg" className="text-sm sm:text-base px-4 py-3 h-auto btn-gold-outline font-semibold">
            <a href="#simulation">Simule agora</a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
