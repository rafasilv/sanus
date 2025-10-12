"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useRouter } from "next/navigation";

interface DadosSimulacao {
  formData: {
    tipoInicial: string;
    nomeCompleto: string;
    cpfCnpj: string;
    email: string;
    telefone: string;
    tempoAtividade: string;
    convenioPrincipal: string;
    convenioOutros: string;
    vinculacoes: string[];
    valorAntecipar: string;
    prazoRecebimento: string;
  };
  simulacao: {
    taxaBase: number;
    descontoVinculacao: number;
    taxaFinal: number;
    valorDesconto: number;
    valorReceber: number;
    nivelRisco: string;
  };
  timestamp: string;
}

export default function ResultadoPage() {
  const [dados, setDados] = useState<DadosSimulacao | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Convênios por nível de risco
  const conveniosRisco = {
    baixo: ["Unimed Nacional", "Bradesco Saúde", "Amil", "SulAmérica", "Porto Saúde"],
    medio: ["Unimed regional", "Benevix", "MedSênior", "Samp"],
    alto: ["Outro"]
  };

  // Matriz de taxas por risco e prazo
  const matrizTaxas = {
    baixo: { "30": 2.50, "60": 2.80, "90": 3.30, "120": 3.80 },
    medio: { "30": 2.80, "60": 3.30, "90": 3.80, "120": 4.40 },
    alto: { "30": 3.20, "60": 3.80, "90": 4.40, "120": 5.00 }
  };

  // Função para recalcular a simulação
  const recalcularSimulacao = (formData: any) => {
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
        const descontos = formData.vinculacoes.map((vinculacao: string) => {
          if (vinculacao === "grupo-md") return 0.2;
          if (vinculacao === "clube-md") return 0.15;
          return 0;
        });
        descontoVinculacao = Math.max(...descontos);
      }
      
      const taxaFinal = Math.max(0, taxaBase - descontoVinculacao);
      const valorDesconto = (valor * taxaFinal) / 100;
      const valorReceber = valor - valorDesconto;
      
      return {
        taxaBase,
        descontoVinculacao,
        taxaFinal,
        valorDesconto,
        valorReceber,
        nivelRisco
      };
    }
    return null;
  };

  useEffect(() => {
    const dadosSalvos = localStorage.getItem('simulacaoAntecipacao');
    if (dadosSalvos) {
      const dadosParsed = JSON.parse(dadosSalvos);
      // Recalcular a simulação para garantir que os dados estão corretos
      const simulacaoRecalculada = recalcularSimulacao(dadosParsed.formData);
      if (simulacaoRecalculada) {
        dadosParsed.simulacao = simulacaoRecalculada;
      }
      setDados(dadosParsed);
    }
    setLoading(false);
  }, []);

  const handleNovaSimulacao = () => {
    localStorage.removeItem('simulacaoAntecipacao');
    router.push('/antecipacao');
  };

  const handleContato = () => {
    // Aqui você pode implementar a lógica de contato
    alert("Entraremos em contato em breve! Obrigado pela simulação.");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sanus-gold mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Carregando simulação...</p>
        </div>
      </div>
    );
  }

  if (!dados) {
    return (
      <div className="min-h-screen bg-background dark">
        <Header />
        <main className="flex items-center justify-center min-h-[60vh]">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-6 text-center">
              <h2 className="text-xl font-semibold mb-4">Simulação não encontrada</h2>
              <p className="text-muted-foreground mb-6">
                Não foi possível encontrar os dados da simulação.
              </p>
              <Button onClick={() => router.push('/antecipacao')} className="w-full">
                Fazer nova simulação
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const { formData, simulacao } = dados;

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
                Resultado da simulação
              </Badge>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Sua simulação está pronta!
              </h1>
              <p className="mx-auto max-w-4xl text-muted-foreground text-lg md:text-xl lg:text-2xl">
                Confira todos os detalhes da sua antecipação de recebíveis.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Resultado da Simulação */}
        <section className="py-16 md:py-24 lg:py-32">
          <div className="container mx-auto space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="max-w-4xl mx-auto">
                <CardContent className="p-6">
                  <div className="space-y-8">
                    {/* Dados Pessoais */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-sanus-gold border-b pb-2">
                        {formData.tipoInicial === "medico" ? "Dados do Médico" : "Dados da Empresa"}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Nome/Razão Social</Label>
                          <p className="text-sm">{formData.nomeCompleto}</p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">
                            {formData.tipoInicial === "medico" ? "CPF" : "CNPJ"}
                          </Label>
                          <p className="text-sm">{formData.cpfCnpj}</p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">E-mail</Label>
                          <p className="text-sm">{formData.email}</p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Telefone</Label>
                          <p className="text-sm">{formData.telefone}</p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">
                            {formData.tipoInicial === "medico" ? "Tempo de formado" : "Tempo de mercado"}
                          </Label>
                          <p className="text-sm">{formData.tempoAtividade} anos</p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Convênio principal</Label>
                          <p className="text-sm">{formData.convenioPrincipal}</p>
                        </div>
                      </div>
                    </div>

                    {/* Vinculações */}
                    {formData.tipoInicial === "medico" && formData.vinculacoes.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-sanus-gold border-b pb-2">
                          Vinculações MD Saúde
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {formData.vinculacoes.map((vinculacao, index) => (
                            <Badge key={index} variant="secondary">
                              {vinculacao === "grupo-md" ? "MD Saúde" : "Clube MD"}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Dados da Operação */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-sanus-gold border-b pb-2">
                        Dados da Operação
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Valor a antecipar</Label>
                          <p className="text-lg font-semibold">{formData.valorAntecipar}</p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Prazo de recebimento</Label>
                          <p className="text-lg font-semibold">{formData.prazoRecebimento} dias</p>
                        </div>
                      </div>
                    </div>

                    {/* Resultado da Simulação */}
                    <div className="space-y-4 p-6 bg-muted/30 rounded-lg border">
                      <h3 className="text-lg font-semibold text-sanus-gold border-b pb-2">
                        Resultado da Simulação
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Nível de risco</Label>
                          <Badge variant={simulacao.nivelRisco === "baixo" ? "default" : simulacao.nivelRisco === "medio" ? "secondary" : "destructive"}>
                            {simulacao.nivelRisco === "baixo" ? "Baixo Risco" : simulacao.nivelRisco === "medio" ? "Médio Risco" : "Alto Risco"}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Taxa base</Label>
                          <p className="text-lg font-semibold">{simulacao.taxaBase.toFixed(2)}%</p>
                        </div>
                        {simulacao.descontoVinculacao > 0 && (
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Desconto por vinculação</Label>
                            <p className="text-lg font-semibold text-green-600">-{simulacao.descontoVinculacao.toFixed(2)}%</p>
                            <p className="text-xs text-muted-foreground">
                              {formData.vinculacoes.includes("grupo-md") && "MD Saúde "}
                              {formData.vinculacoes.includes("clube-md") && "Clube MD "}
                            </p>
                          </div>
                        )}
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Taxa final</Label>
                          <p className="text-lg font-semibold">{simulacao.taxaFinal.toFixed(2)}%</p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Valor do desconto</Label>
                          <p className="text-lg font-semibold text-red-600">
                            R$ {simulacao.valorDesconto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Valor a receber</Label>
                          <p className="text-2xl font-bold text-green-600">
                            R$ {simulacao.valorReceber.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Sugestão de vinculação ao Clube MD */}
                    {formData.tipoInicial === "medico" && formData.vinculacoes.length === 0 && (
                      <div className="space-y-4 p-6 bg-muted/30 rounded-lg border">
                        <h3 className="text-lg font-semibold text-sanus-gold border-b pb-2">💡 Oportunidade Especial</h3>
                        <p className="text-muted-foreground">
                          Associe-se ao <strong>Clube MD</strong> e maximize seus benefícios!
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Benefícios Financeiros</Label>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-sm">
                                  <strong>Desconto de 0,15%</strong> na taxa de antecipação
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-sm">
                                  Taxa final: <strong>{(simulacao.taxaBase - 0.15).toFixed(2)}%</strong>
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-sm">
                                  Valor a receber: <strong>R$ {(() => {
                                    const valorLimpo = formData.valorAntecipar.replace(/[^\d]/g, '');
                                    const valor = parseFloat(valorLimpo) / 100;
                                    const taxaComDesconto = simulacao.taxaBase - 0.15;
                                    const valorComDesconto = valor - (valor * taxaComDesconto / 100);
                                    return valorComDesconto.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
                                  })()}</strong>
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Outros Benefícios do Clube MD</Label>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-sanus-gold rounded-full"></div>
                                <span className="text-sm">Descontos em cursos e especializações</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-sanus-gold rounded-full"></div>
                                <span className="text-sm">Acesso a eventos exclusivos</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-sanus-gold rounded-full"></div>
                                <span className="text-sm">Networking com outros médicos</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-sanus-gold rounded-full"></div>
                                <span className="text-sm">Consultoria especializada</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-sanus-gold rounded-full"></div>
                                <span className="text-sm">Suporte para gestão financeira</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="pt-4 border-t">
                          <p className="text-sm text-muted-foreground text-center">
                            <strong>Interessado?</strong> Entre em contato conosco para saber mais sobre como se associar ao Clube MD!
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Botões de Ação */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                      <Button
                        onClick={handleContato}
                        size="lg"
                        className="bg-gold-gradient border-gold shadow-gold hover:shadow-gold/60 text-black font-semibold px-8 flex-1"
                      >
                        Quero antecipar agora
                      </Button>
                      <Button
                        onClick={handleNovaSimulacao}
                        variant="outline"
                        size="lg"
                        className="flex-1"
                      >
                        Nova simulação
                      </Button>
                    </div>
                  </div>
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
