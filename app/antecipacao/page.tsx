"use client";

import { useState, useEffect } from "react";
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
    vinculacoes: [] as string[], // Array de vinculações selecionadas
    
    // Bloco 3 - Dados da operação
    valorAntecipar: "",
    prazoRecebimento: ""
  });

  const [simulacao, setSimulacao] = useState({
    taxaBase: 0,
    descontoVinculacao: 0,
    taxaFinal: 0,
    valorDesconto: 0,
    valorReceber: 0,
    nivelRisco: ""
  });

  const [mostrarSimulacao, setMostrarSimulacao] = useState(false);

  // Matriz de taxas por risco e prazo
  const matrizTaxas = {
    baixo: { "30": 2.50, "60": 2.80, "90": 3.30, "120": 3.80 },
    medio: { "30": 2.80, "60": 3.30, "90": 3.80, "120": 4.40 },
    alto: { "30": 3.20, "60": 3.80, "90": 4.40, "120": 5.00 }
  };

  // Convênios por nível de risco
  const conveniosRisco = {
    baixo: ["Unimed Nacional", "Bradesco Saúde", "Amil", "SulAmérica", "Porto Saúde"],
    medio: ["Unimed regional", "Benevix", "MedSênior", "Samp"],
    alto: ["Outro"]
  };

  // Função para calcular simulação
  const calcularSimulacao = () => {
    if (formData.convenioPrincipal && formData.valorAntecipar && formData.prazoRecebimento) {
      const valorLimpo = formData.valorAntecipar.replace(/[^\d]/g, '');
      const valor = parseFloat(valorLimpo) / 100;
      const prazo = formData.prazoRecebimento;
      
      if (valor > 0) {
        // Determinar nível de risco
        let nivelRisco = "alto";
        if (conveniosRisco.baixo.includes(formData.convenioPrincipal)) {
          nivelRisco = "baixo";
        } else if (conveniosRisco.medio.includes(formData.convenioPrincipal)) {
          nivelRisco = "medio";
        }
        
        // Obter taxa base
        const taxaBase = matrizTaxas[nivelRisco as keyof typeof matrizTaxas][prazo as keyof typeof matrizTaxas.baixo];
        
        // Calcular desconto por vinculação (considerar o maior)
        let descontoVinculacao = 0;
        if (formData.vinculacoes.length > 0) {
          // Considerar o maior desconto entre as vinculações selecionadas
          const descontos = formData.vinculacoes.map(vinculacao => {
            if (vinculacao === "grupo-md") return 0.2;
            if (vinculacao === "clube-md") return 0.15;
            return 0;
          });
          descontoVinculacao = Math.max(...descontos);
        }
        
        const taxaFinal = Math.max(0, taxaBase - descontoVinculacao);
        const valorDesconto = (valor * taxaFinal) / 100;
        const valorReceber = valor - valorDesconto;
        
        setSimulacao({
          taxaBase,
          descontoVinculacao,
          taxaFinal,
          valorDesconto,
          valorReceber,
          nivelRisco
        });
        
        setMostrarSimulacao(true);
        return true;
      }
    }
    return false;
  };

  // Funções de validação
  const validarCPF = (cpf: string) => {
    const cpfLimpo = cpf.replace(/\D/g, '');
    if (cpfLimpo.length !== 11) return false;
    
    // Verificar se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpfLimpo)) return false;
    
    // Validar dígitos verificadores
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpfLimpo.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpfLimpo.charAt(9))) return false;
    
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpfLimpo.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpfLimpo.charAt(10));
  };

  const validarTelefone = (telefone: string) => {
    const telefoneLimpo = telefone.replace(/\D/g, '');
    return telefoneLimpo.length >= 10 && telefoneLimpo.length <= 11;
  };

  const validarCNPJ = (cnpj: string) => {
    const cnpjLimpo = cnpj.replace(/\D/g, '');
    if (cnpjLimpo.length !== 14) return false;
    
    // Verificar se todos os dígitos são iguais
    if (/^(\d)\1{13}$/.test(cnpjLimpo)) return false;
    
    // Validar primeiro dígito verificador
    let soma = 0;
    let peso = 5;
    for (let i = 0; i < 12; i++) {
      soma += parseInt(cnpjLimpo.charAt(i)) * peso;
      peso = peso === 2 ? 9 : peso - 1;
    }
    let resto = soma % 11;
    let dv1 = resto < 2 ? 0 : 11 - resto;
    if (dv1 !== parseInt(cnpjLimpo.charAt(12))) return false;
    
    // Validar segundo dígito verificador
    soma = 0;
    peso = 6;
    for (let i = 0; i < 13; i++) {
      soma += parseInt(cnpjLimpo.charAt(i)) * peso;
      peso = peso === 2 ? 9 : peso - 1;
    }
    resto = soma % 11;
    let dv2 = resto < 2 ? 0 : 11 - resto;
    return dv2 === parseInt(cnpjLimpo.charAt(13));
  };

  const formatarCPF = (cpf: string) => {
    const cpfLimpo = cpf.replace(/\D/g, '');
    return cpfLimpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formatarCNPJ = (cnpj: string) => {
    const cnpjLimpo = cnpj.replace(/\D/g, '');
    return cnpjLimpo.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  };

  const formatarTelefone = (telefone: string) => {
    const telefoneLimpo = telefone.replace(/\D/g, '');
    if (telefoneLimpo.length === 11) {
      return telefoneLimpo.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (telefoneLimpo.length === 10) {
      return telefoneLimpo.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return telefone;
  };

  const formatarValor = (valor: string) => {
    const valorLimpo = valor.replace(/\D/g, '');
    if (valorLimpo === '') return '';
    const valorNumerico = parseFloat(valorLimpo) / 100;
    return valorNumerico.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleVinculacaoChange = (vinculacao: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      vinculacoes: checked 
        ? [...prev.vinculacoes, vinculacao]
        : prev.vinculacoes.filter(v => v !== vinculacao)
    }));
  };

  // Função para verificar se o formulário está válido para simulação
  const isFormValid = () => {
    // Verificar campos básicos obrigatórios
    if (!formData.tipoInicial) return false;
    if (!formData.nomeCompleto.trim()) return false;
    if (!formData.cpfCnpj.trim()) return false;
    if (!formData.email.trim()) return false;
    if (!formData.telefone.trim()) return false;
    if (!formData.tempoAtividade.trim()) return false;
    if (!formData.convenioPrincipal) return false;
    if (!formData.valorAntecipar.trim()) return false;
    if (!formData.prazoRecebimento) return false;

    // Verificar se CPF/CNPJ é válido
    if (formData.tipoInicial === "medico" && !validarCPF(formData.cpfCnpj)) return false;
    if (formData.tipoInicial === "empresa" && !validarCNPJ(formData.cpfCnpj)) return false;

    // Verificar se telefone é válido
    if (!validarTelefone(formData.telefone)) return false;

    // Verificar se email é válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return false;

    // Verificar se valor é válido
    const valorLimpo = formData.valorAntecipar.replace(/[^\d]/g, '');
    const valor = parseFloat(valorLimpo) / 100;
    if (valor <= 0) return false;

    // Se convênio é "Outro", verificar se campo outros está preenchido
    if (formData.convenioPrincipal === "Outro" && !formData.convenioOutros.trim()) return false;

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const calculou = calcularSimulacao();
    if (calculou) {
      // Salvar dados no localStorage para a próxima página
      const dadosCompletos = {
        formData,
        simulacao,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('simulacaoAntecipacao', JSON.stringify(dadosCompletos));
      
      // Redirecionar para a página de resultados
      window.location.href = '/antecipacao/resultado';
    } else {
      alert("Por favor, preencha todos os campos obrigatórios para simular.");
    }
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

                    {/* Formulário desfocado como prévia */}
                    {!formData.tipoInicial && (
                      <div className="space-y-4 opacity-50 blur-sm pointer-events-none">
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-sanus-gold border-b pb-2">
                            Identificação
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Nome completo / Razão Social</Label>
                              <Input placeholder="Digite seu nome completo" disabled />
                            </div>
                            <div className="space-y-2">
                              <Label>CPF / CNPJ</Label>
                              <Input placeholder="000.000.000-00" disabled />
                            </div>
                            <div className="space-y-2">
                              <Label>E-mail</Label>
                              <Input placeholder="seu@email.com" disabled />
                            </div>
                            <div className="space-y-2">
                              <Label>Telefone/WhatsApp</Label>
                              <Input placeholder="(11) 99999-9999" disabled />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-sanus-gold border-b pb-2">
                            Perfil
                          </h3>
                          <div className="space-y-4">
                            <div className="space-y-3">
                              <Label>Tempo de formado / Tempo de mercado</Label>
                              <div className="flex items-center gap-2">
                                <Input className="w-20" placeholder="anos" disabled />
                                <span>anos</span>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Convênio principal</Label>
                              <Select disabled>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione seu convênio principal" />
                                </SelectTrigger>
                              </Select>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-sanus-gold border-b pb-2">
                            Dados da operação
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Valor a antecipar</Label>
                              <Input placeholder="R$ 0,00" disabled />
                            </div>
                            <div className="space-y-2">
                              <Label>Prazo de recebimento</Label>
                              <div className="flex flex-wrap gap-4">
                                <div className="flex items-center space-x-2">
                                  <input type="radio" disabled />
                                  <Label>30 dias</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <input type="radio" disabled />
                                  <Label>60 dias</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <input type="radio" disabled />
                                  <Label>90 dias</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <input type="radio" disabled />
                                  <Label>120 dias</Label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

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
                              onChange={(e) => {
                                const valor = formData.tipoInicial === "medico" 
                                  ? formatarCPF(e.target.value)
                                  : formatarCNPJ(e.target.value);
                                handleInputChange("cpfCnpj", valor);
                              }}
                              placeholder={formData.tipoInicial === "medico" ? "000.000.000-00" : "00.000.000/0000-00"}
                              required
                              className={
                                formData.cpfCnpj && (
                                  (formData.tipoInicial === "medico" && !validarCPF(formData.cpfCnpj)) ||
                                  (formData.tipoInicial === "empresa" && !validarCNPJ(formData.cpfCnpj))
                                ) ? "border-red-500" : ""
                              }
                            />
                            {formData.cpfCnpj && formData.tipoInicial === "medico" && !validarCPF(formData.cpfCnpj) && (
                              <p className="text-sm text-red-500">CPF inválido</p>
                            )}
                            {formData.cpfCnpj && formData.tipoInicial === "empresa" && !validarCNPJ(formData.cpfCnpj) && (
                              <p className="text-sm text-red-500">CNPJ inválido</p>
                            )}
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
                              onChange={(e) => {
                                const valor = formatarTelefone(e.target.value);
                                handleInputChange("telefone", valor);
                              }}
                              placeholder="(11) 99999-9999"
                              required
                              className={formData.telefone && !validarTelefone(formData.telefone) ? "border-red-500" : ""}
                            />
                            {formData.telefone && !validarTelefone(formData.telefone) && (
                              <p className="text-sm text-red-500">Telefone inválido</p>
                            )}
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
                                <SelectItem value="Unimed Nacional">Unimed Nacional</SelectItem>
                                <SelectItem value="Bradesco Saúde">Bradesco Saúde</SelectItem>
                                <SelectItem value="Amil">Amil</SelectItem>
                                <SelectItem value="SulAmérica">SulAmérica</SelectItem>
                                <SelectItem value="Porto Saúde">Porto Saúde</SelectItem>
                                <SelectItem value="Unimed regional">Unimed regional</SelectItem>
                                <SelectItem value="Benevix">Benevix</SelectItem>
                                <SelectItem value="MedSênior">MedSênior</SelectItem>
                                <SelectItem value="Samp">Samp</SelectItem>
                                <SelectItem value="Outro">Outro</SelectItem>
                              </SelectContent>
                            </Select>
                            {formData.convenioPrincipal === "Outro" && (
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
                              <Label>Você é parte do grupo MD Saúde ou do Clube MD?</Label>
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="checkbox"
                                    id="grupo-md"
                                    checked={formData.vinculacoes.includes("grupo-md")}
                                    onChange={(e) => handleVinculacaoChange("grupo-md", e.target.checked)}
                                    className="rounded border-gray-300"
                                  />
                                  <Label htmlFor="grupo-md">MD Saúde</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="checkbox"
                                    id="clube-md"
                                    checked={formData.vinculacoes.includes("clube-md")}
                                    onChange={(e) => handleVinculacaoChange("clube-md", e.target.checked)}
                                    className="rounded border-gray-300"
                                  />
                                  <Label htmlFor="clube-md">Clube MD</Label>
                                </div>
                              </div>
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
                            <Label htmlFor="valorAntecipar">Valor a antecipar</Label>
                            <Input
                              id="valorAntecipar"
                              value={formData.valorAntecipar}
                              onChange={(e) => {
                                const valor = formatarValor(e.target.value);
                                handleInputChange("valorAntecipar", valor);
                              }}
                              placeholder="R$ 0,00"
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


                    {/* Botão CTA - só aparece quando formulário válido */}
                    {isFormValid() && (
                      <div className="flex justify-center pt-8">
                        <Button
                          type="submit"
                          size="lg"
                          className="bg-gold-gradient border-gold shadow-gold hover:shadow-gold/60 text-black font-semibold px-8"
                        >
                          Simular agora
                        </Button>
                      </div>
                    )}
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