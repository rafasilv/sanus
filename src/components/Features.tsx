import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  CreditCard, 
  TrendingUp, 
  Home, 
  Calculator, 
  Clock, 
  Shield 
} from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: CreditCard,
    title: "Antecipação de Recebíveis",
    description: "Transforme em liquidez imediata os valores a receber de convênios e operadoras de saúde. Receba hoje o que só entraria em 60 ou 90 dias.",
    badge: "Liquidez"
  },
  {
    icon: TrendingUp,
    title: "Crédito para Fluxo de Caixa",
    description: "Linha especial para médicos e clínicas organizarem seu fluxo financeiro, investirem em expansão, compra de equipamentos e estruturação de consultórios.",
    badge: "Investimento"
  },
  {
    icon: Home,
    title: "Crédito para Aquisição de Patrimônio",
    description: "Realize conquistas pessoais com segurança: aquisição de imóveis, veículos ou outros bens de valor, com condições diferenciadas para médicos.",
    badge: "Patrimônio"
  },
  {
    icon: Calculator,
    title: "Simulação Personalizada",
    description: "Área interativa para o médico simular valores, prazos e parcelas de acordo com suas necessidades específicas.",
    badge: "Simulação"
  },
  {
    icon: Clock,
    title: "Análise Ágil e Digital",
    description: "Processo de análise rápido e totalmente digital, respeitando a rotina corrida dos profissionais de saúde.",
    badge: "Agilidade"
  },
  {
    icon: Shield,
    title: "Segurança Jurídica",
    description: "Compliance regulatório completo (BACEN, CVM, LGPD, COAF) garantindo total segurança nas operações.",
    badge: "Segurança"
  }
]

export function Features() {
  return (
    <section id="features" className="pt-20 pb-16 md:py-24 lg:py-32">
      <div className="container space-y-12">
        <motion.div
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Badge variant="outline" className="mb-6">
            Soluções
          </Badge>
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Nossas Soluções
          </h2>
          <p className="mx-auto max-w-4xl text-muted-foreground text-lg md:text-xl lg:text-2xl">
            Produtos financeiros especializados para médicos, clínicas e hospitais, com condições diferenciadas e análise personalizada.
          </p>
        </motion.div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <feature.icon className="h-8 w-8 text-primary" />
                    <Badge variant="secondary">{feature.badge}</Badge>
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
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
