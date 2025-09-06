import { Button } from "@/components/ui/button"
import { 
  Linkedin, 
  Mail,
  Phone,
  MapPin,
  Heart,
  Shield,
  FileText
} from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-sanus-gold">Sanus Finance</h3>
            <p className="text-sm text-muted-foreground">
              Inteligência financeira especializada para médicos e clínicas. 
              Soluções de crédito seguras, transparentes e sob medida para o setor de saúde.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" asChild>
                <a href="https://linkedin.com/company/sanus-finance" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href="mailto:contato@sanus.com.br">
                  <Mail className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Produtos</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#features" className="hover:text-sanus-gold transition-colors">Antecipação de Recebíveis</a></li>
              <li><a href="#features" className="hover:text-sanus-gold transition-colors">Crédito para Fluxo de Caixa</a></li>
              <li><a href="#features" className="hover:text-sanus-gold transition-colors">Crédito para Patrimônio</a></li>
              <li><a href="#simulation" className="hover:text-sanus-gold transition-colors">Simulação Personalizada</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Institucional</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#about" className="hover:text-sanus-gold transition-colors">Sobre nós</a></li>
              <li><a href="#advantages" className="hover:text-sanus-gold transition-colors">Nossas Vantagens</a></li>
              <li><a href="#contact" className="hover:text-sanus-gold transition-colors">Contato</a></li>
              <li><a href="#" className="hover:text-sanus-gold transition-colors">Política de Privacidade</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Contato</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-sanus-gold" />
                <a href="mailto:contato@sanus.com.br" className="hover:text-sanus-gold transition-colors">
                  contato@sanus.com.br
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-sanus-gold" />
                <a href="tel:+5511999999999" className="hover:text-sanus-gold transition-colors">
                  +55 (11) 99999-9999
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-sanus-gold" />
                São Paulo, SP - Brasil
              </li>
              <li className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-sanus-gold" />
                <span className="text-xs">Regulamentado pelo BACEN</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <p className="text-sm text-muted-foreground">
                © 2024 Sanus Finance. Todos os direitos reservados.
              </p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  BACEN
                </span>
                <span className="flex items-center gap-1">
                  <FileText className="h-3 w-3" />
                  LGPD
                </span>
                <span className="flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  COAF
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground flex items-center">
              Feito com <Heart className="h-4 w-4 mx-1 text-red-500" /> para médicos
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
