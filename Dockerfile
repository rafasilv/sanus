
# Stage de build
FROM node:18-alpine AS builder
WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar todas as dependências (incluindo devDependencies)
RUN npm ci

# Copiar código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Stage de produção
FROM node:18-alpine AS runner
WORKDIR /app

# Copiar arquivos buildados e configuração
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/vite.config.ts ./

# Instalar apenas dependências necessárias para preview
RUN npm ci --only=production

# Expor porta
EXPOSE 5173

# Configurar variáveis de ambiente
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=5173

# Comando para servir a aplicação com preview
CMD ["npx", "vite", "preview", "--host", "0.0.0.0", "--port", "5173"]
