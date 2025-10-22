# 🐳 Docker - Sanus Next.js

Este documento explica como usar Docker com o projeto Sanus Next.js, configurado para funcionar com Caddy proxy reverso.

## 📋 Pré-requisitos

- Docker instalado
- Docker Compose instalado
- Caddy com caddy-gen configurado (para SSL automático)

## 🚀 Comandos Rápidos

### Usando o script helper (recomendado)

```bash
# Construir e executar
./docker-scripts.sh run

# Modo desenvolvimento
./docker-scripts.sh dev

# Parar container
./docker-scripts.sh stop

# Ver logs
./docker-scripts.sh logs

# Limpar tudo
./docker-scripts.sh clean
```

### Comandos Docker diretos

```bash
# Construir imagem
docker build -t sanus-nextjs .

# Executar container
docker run -d --name sanus-app -p 3000:3000 sanus-nextjs

# Usar Docker Compose
docker-compose up --build
```

## 🏗️ Estrutura do Dockerfile

O Dockerfile utiliza multi-stage build para otimização:

1. **deps**: Instala apenas dependências de produção
2. **builder**: Constrói a aplicação Next.js
3. **runner**: Imagem final otimizada para produção

## ⚙️ Configurações

### Next.js Config
O arquivo `next.config.ts` foi configurado com `output: 'standalone'` para otimizar o build Docker.

### Portas
- **Container interno**: 3000
- **Acesso externo**: Via Caddy em `sanusfinance.com.br`

### Variáveis de Ambiente
- `HOST=0.0.0.0`
- `NODE_ENV=production`
- `NEXT_TELEMETRY_DISABLED=1`

### Labels Caddy
- `virtual.host`: `sanusfinance.com.br`
- `virtual.port`: `3000`
- `virtual.tls-email`: `rafasilv@gmail.com`

## 🔧 Desenvolvimento

Para desenvolvimento com hot-reload:

```bash
# Usar Docker Compose
docker-compose up --build

# Ou usar o script
./docker-scripts.sh dev
```

## 🚀 Deploy em Produção

### Build e Run
```bash
./docker-scripts.sh run
```

### Com Docker Compose
```bash
docker-compose up -d
```

## 📊 Monitoramento

### Ver logs
```bash
./docker-scripts.sh logs
```

### Health Check
O container inclui health check que verifica se a aplicação está respondendo em `http://localhost:3000/api/health`.

### Acessar container
```bash
./docker-scripts.sh shell
```

## 🧹 Limpeza

### Parar e remover container
```bash
./docker-scripts.sh stop
```

### Limpeza completa
```bash
./docker-scripts.sh clean
```

## 🔍 Troubleshooting

### Container não inicia
1. Verifique os logs: `./docker-scripts.sh logs`
2. Verifique se a porta 3000 está disponível
3. Reconstrua a imagem: `./docker-scripts.sh clean && ./docker-scripts.sh run`

### Problemas de build
1. Verifique se o `next.config.ts` tem `output: 'standalone'`
2. Limpe o cache: `docker system prune -a`
3. Reconstrua: `./docker-scripts.sh clean && ./docker-scripts.sh run`

## 📝 Notas

- A imagem final é otimizada com Alpine Linux
- Usa usuário não-root para segurança
- Inclui health checks automáticos
- Configurado para produção com telemetria desabilitada
