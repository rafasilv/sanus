#!/bin/bash

# Scripts para Docker - Projeto Sanus Next.js

# Função para mostrar ajuda
show_help() {
    echo "Scripts Docker para Sanus Next.js"
    echo ""
    echo "Uso: ./docker-scripts.sh [comando]"
    echo ""
    echo "Comandos disponíveis:"
    echo "  build     - Construir a imagem Docker"
    echo "  run       - Executar o container"
    echo "  dev       - Executar em modo desenvolvimento"
    echo "  stop      - Parar o container"
    echo "  clean     - Limpar imagens e containers"
    echo "  logs      - Ver logs do container"
    echo "  shell     - Acessar shell do container"
    echo "  help      - Mostrar esta ajuda"
}

# Construir imagem
build_image() {
    echo "🔨 Construindo imagem Docker..."
    docker build -t sanus-nextjs .
    echo "✅ Imagem construída com sucesso!"
}

# Executar container
run_container() {
    echo "🚀 Executando container..."
    docker run -d \
        --name sanus \
        --restart unless-stopped \
        -e HOST=0.0.0.0 \
        -e NODE_ENV=production \
        -e NEXT_TELEMETRY_DISABLED=1 \
        --label "virtual.host=sanusfinance.com.br" \
        --label "virtual.port=3000" \
        --label "virtual.tls-email=rafasilv@gmail.com" \
        sanus-nextjs
    echo "✅ Container executando (acessível via Caddy em sanusfinance.com.br)"
}

# Modo desenvolvimento
dev_mode() {
    echo "🛠️  Executando em modo desenvolvimento..."
    docker-compose up --build
}

# Parar container
stop_container() {
    echo "🛑 Parando container..."
    docker stop sanus 2>/dev/null || true
    docker rm sanus 2>/dev/null || true
    echo "✅ Container parado"
}

# Limpar imagens e containers
clean_docker() {
    echo "🧹 Limpando Docker..."
    docker stop sanus 2>/dev/null || true
    docker rm sanus 2>/dev/null || true
    docker rmi sanus-nextjs 2>/dev/null || true
    docker system prune -f
    echo "✅ Limpeza concluída"
}

# Ver logs
show_logs() {
    echo "📋 Mostrando logs do container..."
    docker logs -f sanus
}

# Acessar shell
access_shell() {
    echo "🐚 Acessando shell do container..."
    docker exec -it sanus sh
}

# Processar comando
case "$1" in
    build)
        build_image
        ;;
    run)
        build_image
        run_container
        ;;
    dev)
        dev_mode
        ;;
    stop)
        stop_container
        ;;
    clean)
        clean_docker
        ;;
    logs)
        show_logs
        ;;
    shell)
        access_shell
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        echo "❌ Comando não reconhecido: $1"
        echo ""
        show_help
        exit 1
        ;;
esac
