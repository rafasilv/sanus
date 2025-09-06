import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Stethoscope, 
  Clock, 
  Shield, 
  Lightbulb, 
  DollarSign, 
  Users 
} from "lucide-react"
import { motion } from "framer-motion"

const advantages = [
  {
    icon: Stethoscope,
    title: "Especialização no setor de saúde",
    description: "Entendemos as particularidades da carreira médica e oferecemos soluções sob medida para profissionais de saúde.",
    badge: "Especialização"
  },
  {
    icon: Clock,
    title: "Análise ágil e digital",
    description: "Processo de análise rápido e totalmente digital, respeitando a rotina corrida dos profissionais de saúde.",
    badge: "Agilidade"
  },
  {
    icon: Shield,
    title: "Segurança jurídica e compliance",
    description: "Compliance regulatório completo (BACEN, CVM, LGPD, COAF) garantindo total segurança nas operações.",
    badge: "Segurança"
  },
  {
    icon: Lightbulb,
    title: "Soluções sob medida",
    description: "Produtos financeiros personalizados para médicos e clínicas, respeitando suas necessidades específicas.",
    badge: "Personalização"
  },
  {
    icon: DollarSign,
    title: "Taxas competitivas e transparentes",
    description: "Condições diferenciadas e taxas competitivas, com total transparência em todas as operações.",
    badge: "Transparência"
  },
  {
    icon: Users,
    title: "Parceiros estratégicos",
    description: "Rede de parceiros estratégicos no setor de saúde que fortalecem nossa oferta de soluções.",
    badge: "Parcerias"
  }
]

export function Advantages() {
  return (
    <section id="advantages" className="pt-20 pb-16 md:py-24 lg:py-32">
      <div className="container space-y-12">
        <motion.div
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Badge variant="outline" className="mb-6">
            Vantagens
          </Badge>
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Por que escolher a SANUS?
          </h2>
          <p className="mx-auto max-w-4xl text-muted-foreground text-lg md:text-xl lg:text-2xl">
            Somos especialistas em soluções financeiras para o setor de saúde, com diferenciais únicos que fazem a diferença.
          </p>
        </motion.div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {advantages.map((advantage, index) => (
            <motion.div
              key={advantage.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <advantage.icon className="h-8 w-8 text-primary" />
                    <Badge variant="secondary">{advantage.badge}</Badge>
                  </div>
                  <CardTitle className="text-xl">{advantage.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {advantage.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
