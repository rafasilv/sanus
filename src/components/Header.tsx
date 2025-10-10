"use client";

import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import { useState } from "react"
import { RotatingText } from "./RotatingText"
import Link from "next/link"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSimulationOpen, setIsSimulationOpen] = useState(false)
  const [simulationTimeout, setSimulationTimeout] = useState<NodeJS.Timeout | null>(null)

  const handleSimulationMouseEnter = () => {
    if (simulationTimeout) {
      clearTimeout(simulationTimeout)
      setSimulationTimeout(null)
    }
    setIsSimulationOpen(true)
  }

  const handleSimulationMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsSimulationOpen(false)
    }, 150) // 150ms delay
    setSimulationTimeout(timeout)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-3 w-48">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10">
              <RotatingText 
                text=""
                className="flex items-center justify-center h-10 w-10"
                delay={0}
                shouldAnimate={true}
              >
                <Link 
                  href="/"
                  className="flex items-center cursor-pointer"
                >
                  <img 
                    src="/logo-compact.png" 
                    alt="Sanus" 
                    className="h-10 w-10"
                  />
                </Link>
              </RotatingText>
            </div>
            <Link 
              href="/"
              className="text-lg sm:text-xl font-bold text-sanus-gold font-garamond tracking-wider whitespace-nowrap hover:opacity-80 transition-opacity cursor-pointer"
            >
              SANUS FINANCE
            </Link>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            href="/#features"
          >
            Soluções
          </a>
          <div 
            className="relative"
            onMouseEnter={handleSimulationMouseEnter}
            onMouseLeave={handleSimulationMouseLeave}
          >
            <div className="flex items-center gap-1">
              <a
                href="/#simulation"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Simulação
              </a>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </div>
            {isSimulationOpen && (
              <div 
                className="absolute top-full left-0 mt-1 w-48 bg-background border rounded-md shadow-lg z-50"
                onMouseEnter={handleSimulationMouseEnter}
                onMouseLeave={handleSimulationMouseLeave}
              >
                <div className="py-2">
                    <Link
                      href="/antecipacao"
                      className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      onClick={() => setIsSimulationOpen(false)}
                    >
                      Antecipação de Recebíveis
                    </Link>
                </div>
              </div>
            )}
          </div>
          <a
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            href="/#advantages"
          >
            Vantagens
          </a>
          <a
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            href="/#partners"
          >
            Parceiros
          </a>
          <a
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            href="/#contact"
          >
            Contato
          </a>
        </nav>

        {/* CTA Button */}
        <div className="flex items-center space-x-4">
          <Button asChild className="hidden sm:inline-flex bg-gold-gradient border-gold shadow-gold hover:shadow-gold/60">
            <a href="/#simulation">Simular crédito</a>
          </Button>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t">
            <a
              className="block px-3 py-2 text-base font-medium text-foreground/60 hover:text-foreground/80"
              href="/#features"
              onClick={() => setIsMenuOpen(false)}
            >
              Soluções
            </a>
            <a
              className="block px-3 py-2 text-base font-medium text-foreground/60 hover:text-foreground/80"
              href="/#simulation"
              onClick={() => setIsMenuOpen(false)}
            >
              Simulação
            </a>
            <Link
              href="/antecipacao"
              className="block px-6 py-2 text-sm text-foreground/60 hover:text-foreground/80"
              onClick={() => setIsMenuOpen(false)}
            >
              Antecipação de Recebíveis
            </Link>
            <a
              className="block px-3 py-2 text-base font-medium text-foreground/60 hover:text-foreground/80"
              href="/#advantages"
              onClick={() => setIsMenuOpen(false)}
            >
              Vantagens
            </a>
            <a
              className="block px-3 py-2 text-base font-medium text-foreground/60 hover:text-foreground/80"
              href="/#partners"
              onClick={() => setIsMenuOpen(false)}
            >
              Parceiros
            </a>
            <a
              className="block px-3 py-2 text-base font-medium text-foreground/60 hover:text-foreground/80"
              href="/#contact"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
