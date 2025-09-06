import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

export function FinalCTA() {
  return (
    <section id="final-cta" className="pt-20 pb-16 md:py-24 lg:py-32">
      <div className="container">
        <motion.div
          className="text-center space-y-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Badge variant="outline" className="mb-6">
            Próximo passo
          </Badge>
          
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            O próximo passo da sua carreira merece a{" "}
            <span className="text-gold">confiança da SANUS</span>
          </h2>
          
          <p className="text-muted-foreground text-lg md:text-xl lg:text-2xl">
            Seja para organizar seu fluxo, investir em crescimento ou conquistar patrimônio, 
            a SANUS está pronta para apoiar você.
          </p>

          <div className="grid gap-4 md:grid-cols-3 py-8">
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <CheckCircle className="h-6 w-6 text-green-500" />
              <span className="text-sm md:text-base">Organizar fluxo de caixa</span>
            </motion.div>
            
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <CheckCircle className="h-6 w-6 text-green-500" />
              <span className="text-sm md:text-base">Investir em crescimento</span>
            </motion.div>
            
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <CheckCircle className="h-6 w-6 text-green-500" />
              <span className="text-sm md:text-base">Conquistar patrimônio</span>
            </motion.div>
          </div>

          <motion.div
            className="flex flex-col gap-4 sm:flex-row sm:justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Button size="lg" className="text-lg px-8 py-6 h-auto bg-gold-gradient border-gold shadow-gold hover:shadow-gold/60 text-black font-semibold">
              Solicite sua análise personalizada
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" className="text-lg px-8 py-6 h-auto btn-gold-outline font-semibold">
              Falar com especialista
            </Button>
          </motion.div>

          <motion.p
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Análise gratuita e sem compromisso • Resposta em até 24 horas
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
