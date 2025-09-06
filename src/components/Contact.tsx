import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  MessageCircle
} from "lucide-react"
import { motion } from "framer-motion"

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    description: "contato@sannus.com",
    action: "Enviar email"
  },
  {
    icon: Phone,
    title: "Telefone",
    description: "+55 (11) 99999-9999",
    action: "Ligar agora"
  },
  {
    icon: MapPin,
    title: "Endereço",
    description: "São Paulo, SP - Brasil",
    action: "Ver no mapa"
  },
  {
    icon: Clock,
    title: "Horário",
    description: "Seg - Sex: 9h às 18h",
    action: "Agendar reunião"
  }
]

export function Contact() {
  return (
    <section id="contact" className="pt-20 pb-16 md:py-24 lg:py-32">
      <div className="container space-y-12">
        <motion.div
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Badge variant="outline" className="mb-6">
            Entre em contato
          </Badge>
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Vamos conversar sobre seu projeto
          </h2>
          <p className="mx-auto max-w-4xl text-muted-foreground text-lg md:text-xl lg:text-2xl">
            Pronto para transformar sua ideia em realidade? Entre em contato conosco e 
            vamos discutir como podemos ajudar seu negócio a crescer.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <info.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <CardTitle className="text-lg">{info.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="mb-4">
                    {info.description}
                  </CardDescription>
                  <Button variant="outline" size="sm" className="w-full">
                    {info.action}
                  </Button>
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
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Envie uma mensagem
              </CardTitle>
              <CardDescription>
                Preencha o formulário e entraremos em contato em até 24 horas.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nome</label>
                <input 
                  className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                  placeholder="Seu nome completo"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <input 
                  className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                  placeholder="seu@email.com"
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Mensagem</label>
                <textarea 
                  className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm min-h-[100px]"
                  placeholder="Conte-nos sobre seu projeto..."
                />
              </div>
              <Button className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Enviar mensagem
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Por que escolher a Sanus?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold">✅ Consultoria Gratuita</h4>
                <p className="text-sm text-muted-foreground">
                  Análise completa do seu projeto sem compromisso.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">🚀 Entrega Rápida</h4>
                <p className="text-sm text-muted-foreground">
                  Desenvolvimento ágil com entregas em etapas.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">💡 Soluções Inovadoras</h4>
                <p className="text-sm text-muted-foreground">
                  Tecnologias de ponta para resultados excepcionais.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">🛡️ Suporte Contínuo</h4>
                <p className="text-sm text-muted-foreground">
                  Acompanhamento e manutenção após a entrega.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
