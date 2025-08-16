#!/bin/bash

echo "🐳 Iniciando Event Scrum Platform com Docker..."

# Build e start dos containers
docker-compose up --build -d

echo "⏳ Aguardando containers iniciarem..."
sleep 10

# Executar migrations no backend
echo "🔄 Executando migrations..."
docker-compose exec backend php artisan migrate --force

echo "✅ Event Scrum Platform iniciado!"
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:8000"
echo "🗄️ PostgreSQL: localhost:5432"