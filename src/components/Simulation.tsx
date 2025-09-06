import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Calculator, 
  CreditCard, 
  TrendingUp,
  ArrowRight
} from "lucide-react"
import { motion } from "framer-motion"

export function Simulation() {
  return (
    <section id="simulation" className="pt-20 pb-16 md:py-24 lg:py-32 bg-muted/30">
      <div className="container space-y-12">
        <motion.div
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Badge variant="outline" className="mb-6">
            Simulação
          </Badge>
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Simule sua linha de crédito
          </h2>
          <p className="mx-auto max-w-4xl text-muted-foreground text-lg md:text-xl lg:text-2xl">
            Descubra as condições ideais para suas necessidades financeiras com nossa calculadora personalizada.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Calculator className="h-8 w-8 text-primary" />
                  <Badge variant="secondary">Simulação</Badge>
                </div>
                <CardTitle className="text-xl">Simule sua linha de crédito</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  Calcule valores, prazos e parcelas para diferentes tipos de crédito disponíveis.
                </CardDescription>
                <Button className="w-full">
                  Simular agora
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CreditCard className="h-8 w-8 text-primary" />
                  <Badge variant="secondary">Antecipação</Badge>
                </div>
                <CardTitle className="text-xl">Calcule sua antecipação</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  Transforme seus recebíveis em liquidez imediata com nossa calculadora de antecipação.
                </CardDescription>
                <Button className="w-full">
                  Calcular antecipação
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="md:col-span-2 lg:col-span-1"
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <TrendingUp className="h-8 w-8 text-primary" />
                  <Badge variant="secondary">Investimento</Badge>
                </div>
                <CardTitle className="text-xl">Planeje seu investimento</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  Simule investimentos em equipamentos, expansão ou aquisição de patrimônio.
                </CardDescription>
                <Button className="w-full">
                  Planejar investimento
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground mb-6">
            Todas as simulações são gratuitas e sem compromisso. Nossos especialistas estão prontos para ajudar você.
          </p>
          <Button size="lg" className="text-lg">
            Falar com especialista
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
