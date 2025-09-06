import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Handshake, 
  Star, 
  Users,
  ArrowRight
} from "lucide-react"
import { motion } from "framer-motion"

const partners = [
  {
    name: "MD Saúde",
    description: "Médicos associados à MD Saúde têm acesso a condições exclusivas e taxas diferenciadas em todos os nossos produtos financeiros.",
    benefits: ["Taxas diferenciadas", "Condições exclusivas", "Processo simplificado"],
    badge: "Parceiro Estratégico"
  }
]

export function Partners() {
  return (
    <section id="partners" className="pt-20 pb-16 md:py-24 lg:py-32 bg-muted/30">
      <div className="container space-y-12">
        <motion.div
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Badge variant="outline" className="mb-6">
            Parceiros
          </Badge>
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Parceiros que fortalecem nossa rede
          </h2>
          <p className="mx-auto max-w-4xl text-muted-foreground text-lg md:text-xl lg:text-2xl">
            Quanto mais próximo da nossa rede de parceiros, melhores as condições que você pode obter.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Handshake className="h-8 w-8 text-primary" />
                    <Badge variant="secondary">{partner.badge}</Badge>
                  </div>
                  <CardTitle className="text-xl">{partner.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4">
                    {partner.description}
                  </CardDescription>
                  <div className="space-y-2">
                    {partner.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-gold" />
                        <span className="text-sm text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Users className="h-5 w-5" />
            <span>Mais parceiros em breve</span>
          </div>
          <p className="text-muted-foreground">
            Estamos sempre expandindo nossa rede de parceiros estratégicos para oferecer as melhores condições aos profissionais de saúde.
          </p>
          <Button size="lg" className="text-lg">
            Seja nosso parceiro
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
