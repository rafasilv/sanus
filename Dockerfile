# Dockerfile para projeto Next.js Sanus
# Multi-stage build para otimização de tamanho e performance
# Configurado para funcionar com Caddy proxy

# Estágio 1: Build das dependências
FROM node:20-alpine AS deps
WORKDIR /app

# Instalar dependências do sistema necessárias
RUN apk add --no-cache libc6-compat

# Copiar arquivos de dependências
COPY package.json package-lock.json* ./

# Instalar todas as dependências (incluindo devDependencies para build)
RUN npm ci

# Estágio 2: Build da aplicação
FROM node:20-alpine AS builder
WORKDIR /app

# Copiar dependências do estágio anterior
COPY --from=deps /app/node_modules ./node_modules

# Copiar código fonte
COPY . .

# Configurar variáveis de ambiente para build
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# Build da aplicação (desabilitar ESLint para Docker)
RUN DISABLE_ESLINT_PLUGIN=true npm run build

# Estágio 3: Imagem de produção
FROM node:20-alpine AS runner
WORKDIR /app

# Instalar dependências para health check
RUN apk add --no-cache curl

# Configurar usuário não-root para segurança
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar arquivos públicos
COPY --from=builder /app/public ./public

# Copiar arquivos de build
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Configurar usuário
USER nextjs

# Expor porta (Caddy vai fazer proxy)
EXPOSE 3000

# Configurar variáveis de ambiente para Caddy
ENV PORT 3000
ENV HOST 0.0.0.0
ENV NEXT_TELEMETRY_DISABLED 1

# Health check para Caddy
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# Comando para iniciar a aplicação
CMD ["node", "server.js"]
