import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Target, 
  Lightbulb, 
  Award, 
  TrendingUp 
} from "lucide-react"
import { motion } from "framer-motion"

const stats = [
  { icon: Target, value: "500+", label: "Médicos Atendidos" },
  { icon: Lightbulb, value: "R$ 50M+", label: "Em Crédito Aprovado" },
  { icon: Award, value: "98%", label: "Satisfação do Cliente" },
  { icon: TrendingUp, value: "24h", label: "Análise Rápida" }
]

export function About() {
  return (
    <section id="about" className="pt-20 pb-16 md:py-24 lg:py-32">
      <div className="container space-y-12">
        <motion.div
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Badge variant="outline" className="mb-6">
            Quem somos
          </Badge>
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Nosso Propósito
          </h2>
          <p className="mx-auto max-w-4xl text-muted-foreground text-lg md:text-xl lg:text-2xl">
            Na SANUS, entendemos os desafios do médico: conciliar prática clínica, gestão de consultório, aquisição de patrimônio e investimentos no futuro.
            Nosso propósito é oferecer <strong>crédito inteligente e acessível</strong>, com taxas competitivas e análise diferenciada, respeitando as particularidades da carreira médica.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="text-center">
                <CardContent className="pt-6">
                  <stat.icon className="h-8 w-8 mx-auto mb-4 text-primary" />
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="grid gap-6 md:grid-cols-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Nossa Missão</h3>
              <p className="text-muted-foreground">
                Oferecer soluções financeiras especializadas para o setor de saúde, com análise diferenciada 
                e condições competitivas que respeitam as particularidades da carreira médica.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Nossa Visão</h3>
              <p className="text-muted-foreground">
                Ser a principal referência em crédito para médicos e clínicas, reconhecida pela 
                especialização no setor de saúde e pela excelência no atendimento personalizado.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Button size="lg" className="text-lg">
            Solicite sua análise personalizada
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
