"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function SimulacaoPage() {
  const [formData, setFormData] = useState({
    // Seleção inicial
    tipoInicial: "", // "medico" ou "empresa"
    
    // Bloco 1 - Identificação básica (dinâmico)
    nomeCompleto: "",
    cpfCnpj: "",
    email: "",
    telefone: "",
    
    // Bloco 2 - Perfil do cliente
    tempoAtividade: "",
    convenioPrincipal: "",
    convenioOutros: "",
    vinculadoMdSaude: "",
    
    // Bloco 3 - Dados da operação
    valorAntecipar: "",
    prazoRecebimento: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados do formulário:", formData);
    // Aqui você pode implementar a lógica de envio dos dados
    alert("Simulação enviada com sucesso! Entraremos em contato em breve.");
  };

  return (
    <div className="min-h-screen bg-background dark">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-20 pb-16 md:py-24 lg:py-32 bg-muted/30">
          <div className="container mx-auto space-y-12">
            <motion.div
              className="text-center space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="outline" className="mb-6">
                Antecipação de recebíveis
              </Badge>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Antecipação de recebíveis
              </h1>
              <div className="space-y-4">
                <p className="mx-auto max-w-4xl text-muted-foreground text-lg md:text-xl lg:text-2xl">
                  Antecipe hoje seus recebíveis médicos e conquiste liquidez imediata.
                </p>
                <p className="mx-auto max-w-4xl text-muted-foreground text-base md:text-lg lg:text-xl">
                  Receba agora o que seus convênios só pagariam em 60 a 120 dias.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Seção do Formulário */}
        <section className="py-16 md:py-24 lg:py-32">
          <div className="container mx-auto space-y-12">
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
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Simule sua antecipação de recebíveis
              </h2>
              <p className="mx-auto max-w-3xl text-muted-foreground text-lg md:text-xl">
                Preencha todos os campos para receber uma simulação personalizada
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="max-w-4xl mx-auto">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Seleção Inicial */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-sanus-gold border-b pb-2">Quem é você?</h3>
                      <RadioGroup
                        value={formData.tipoInicial}
                        onValueChange={(value) => handleInputChange("tipoInicial", value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="medico" id="tipo-medico" />
                          <Label htmlFor="tipo-medico">Médico</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="empresa" id="tipo-empresa" />
                          <Label htmlFor="tipo-empresa">Empresa</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Bloco 1 - Identificação básica (dinâmico) */}
                    {formData.tipoInicial && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-sanus-gold border-b pb-2">
                          {formData.tipoInicial === "medico" ? "Identificação do médico" : "Identificação da empresa"}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="nomeCompleto">
                              {formData.tipoInicial === "medico" ? "Nome completo" : "Razão Social"}
                            </Label>
                            <Input
                              id="nomeCompleto"
                              value={formData.nomeCompleto}
                              onChange={(e) => handleInputChange("nomeCompleto", e.target.value)}
                              placeholder={formData.tipoInicial === "medico" ? "Digite seu nome completo" : "Digite a razão social"}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cpfCnpj">
                              {formData.tipoInicial === "medico" ? "CPF" : "CNPJ"}
                            </Label>
                            <Input
                              id="cpfCnpj"
                              value={formData.cpfCnpj}
                              onChange={(e) => handleInputChange("cpfCnpj", e.target.value)}
                              placeholder={formData.tipoInicial === "medico" ? "000.000.000-00" : "00.000.000/0000-00"}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">E-mail</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                              placeholder="seu@email.com"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="telefone">Telefone/WhatsApp</Label>
                            <Input
                              id="telefone"
                              value={formData.telefone}
                              onChange={(e) => handleInputChange("telefone", e.target.value)}
                              placeholder="(11) 99999-9999"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Bloco 2 - Perfil do cliente (dinâmico) */}
                    {formData.tipoInicial && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-sanus-gold border-b pb-2">
                          {formData.tipoInicial === "medico" ? "Perfil do médico" : "Perfil da empresa"}
                        </h3>
                        <div className="space-y-4">
                          <div className="space-y-3">
                            <Label>
                              {formData.tipoInicial === "medico" ? "Tempo de formado:" : "Tempo de mercado:"}
                            </Label>
                            <div className="flex items-center gap-2">
                              <Input
                                className="w-20"
                                placeholder="anos"
                                value={formData.tempoAtividade}
                                onChange={(e) => handleInputChange("tempoAtividade", e.target.value)}
                                required
                              />
                              <span>anos</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="convenio">Convênio principal</Label>
                            <Select
                              value={formData.convenioPrincipal}
                              onValueChange={(value) => handleInputChange("convenioPrincipal", value)}
                            >
                              <SelectTrigger 
                                className="w-full bg-background border border-input"
                                style={{ backgroundColor: 'hsl(var(--background))', opacity: 1 }}
                              >
                                <SelectValue placeholder="Selecione seu convênio principal" />
                              </SelectTrigger>
                              <SelectContent className="z-50 bg-background border border-input">
                                <SelectItem value="unimed">Unimed</SelectItem>
                                <SelectItem value="bradesco">Bradesco Saúde</SelectItem>
                                <SelectItem value="sulamerica">SulAmérica</SelectItem>
                                <SelectItem value="outros">Outros</SelectItem>
                              </SelectContent>
                            </Select>
                            {formData.convenioPrincipal === "outros" && (
                              <div className="mt-2">
                                <Label htmlFor="convenioOutros">Especifique o convênio</Label>
                                <Input
                                  id="convenioOutros"
                                  value={formData.convenioOutros}
                                  onChange={(e) => handleInputChange("convenioOutros", e.target.value)}
                                  placeholder="Digite o nome do convênio"
                                  required
                                />
                              </div>
                            )}
                          </div>
                          
                          {formData.tipoInicial === "medico" && (
                            <div className="space-y-3">
                              <Label>Você é médico vinculado à MD Saúde ou associado Clube MD?</Label>
                              <RadioGroup
                                value={formData.vinculadoMdSaude}
                                onValueChange={(value) => handleInputChange("vinculadoMdSaude", value)}
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="sim" id="vinculado-sim" />
                                  <Label htmlFor="vinculado-sim">Sim</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="nao" id="vinculado-nao" />
                                  <Label htmlFor="vinculado-nao">Não</Label>
                                </div>
                              </RadioGroup>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Bloco 3 - Dados da operação */}
                    {formData.tipoInicial && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-sanus-gold border-b pb-2">Dados da operação</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="valorAntecipar">Valor a antecipar (R$)</Label>
                            <Input
                              id="valorAntecipar"
                              type="number"
                              value={formData.valorAntecipar}
                              onChange={(e) => handleInputChange("valorAntecipar", e.target.value)}
                              placeholder="0,00"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Prazo de recebimento</Label>
                            <RadioGroup
                              value={formData.prazoRecebimento}
                              onValueChange={(value) => handleInputChange("prazoRecebimento", value)}
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="30" id="prazo-30" />
                                <Label htmlFor="prazo-30">30 dias</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="60" id="prazo-60" />
                                <Label htmlFor="prazo-60">60 dias</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="90" id="prazo-90" />
                                <Label htmlFor="prazo-90">90 dias</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="120" id="prazo-120" />
                                <Label htmlFor="prazo-120">120 dias</Label>
                              </div>
                            </RadioGroup>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Botão CTA */}
                    <div className="flex justify-center pt-8">
                      <Button
                        type="submit"
                        size="lg"
                        className="bg-gold-gradient border-gold shadow-gold hover:shadow-gold/60 text-black font-semibold px-8"
                      >
                        Simular agora
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}