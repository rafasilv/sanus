import { Button } from "@/components/ui/button"
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail,
  Heart
} from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Sanus</h3>
            <p className="text-sm text-muted-foreground">
              Transformando ideias em soluções digitais inovadoras. 
              Desenvolvimento web de alta qualidade para impulsionar seu negócio.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Serviços</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Desenvolvimento Web</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Aplicações Mobile</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">E-commerce</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Consultoria</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Empresa</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#about" className="hover:text-foreground transition-colors">Sobre nós</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Equipe</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Carreiras</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Contato</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>contato@sannus.com</li>
              <li>+55 (11) 99999-9999</li>
              <li>São Paulo, SP</li>
              <li>Brasil</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © 2024 Sanus. Todos os direitos reservados.
          </p>
          <p className="text-sm text-muted-foreground flex items-center">
            Feito com <Heart className="h-4 w-4 mx-1 text-red-500" /> em São Paulo
          </p>
        </div>
      </div>
    </footer>
  )
}
