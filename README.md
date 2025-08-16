# Event Scrum Platform

Plataforma robusta para gestão de eventos com metodologia Scrum e integração com IA (AWS Bedrock) para geração automática de quadros de tarefas.

## 🚀 Tecnologias

### Backend
- **Laravel 12** - Framework PHP robusto
- **MySQL** - Banco de dados relacional
- **AWS Bedrock** - IA para geração de conteúdo
- **Laravel Sanctum** - Autenticação segura
- **Spatie Permissions** - Controle de acesso

### Frontend
- **Next.js 15** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS 4** - Estilização
- **React Hook Form** - Formulários
- **React Query** - Gerenciamento de estado
- **Radix UI** - Componentes acessíveis

## 📋 Funcionalidades

### ✅ Gestão de Eventos
- Criar, editar e excluir eventos
- Diferentes tipos: corporativo, social, educacional, esportivo, cultural
- Controle de participantes e orçamento
- Dashboard com métricas

### ✅ Sistema Scrum Automatizado
- Geração automática de quadros via IA
- Sprints personalizáveis
- Quadros Kanban (Backlog, To Do, In Progress, Review, Done)
- User stories e critérios de aceitação
- Story points e priorização

### ✅ Integração com IA
- AWS Bedrock (Claude 3)
- Análise contextual do evento
- Geração de tarefas inteligentes
- Sugestões de melhores práticas

## 🛠️ Instalação

### Opção 1: Docker (Recomendado)

```bash
# Clonar repositório
git clone https://github.com/hakenshi/event-scrum-platform.git
cd event-scrum-platform

# Iniciar com Docker
./docker-start.sh
```

### Opção 2: Instalação Manual

#### Pré-requisitos
- PHP 8.2+
- Composer
- Node.js 18+
- PostgreSQL 13+
- Conta AWS (para Bedrock)

### Backend (Laravel)

```bash
cd backend

# Instalar dependências
composer install

# Configurar ambiente
cp .env.example .env
php artisan key:generate

# Configurar banco de dados no .env
DB_DATABASE=event_scrum_platform
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha

# Configurar AWS Bedrock no .env
AWS_ACCESS_KEY_ID=sua_chave
AWS_SECRET_ACCESS_KEY=seu_secret
AWS_DEFAULT_REGION=us-east-1
AWS_BEDROCK_MODEL_ID=anthropic.claude-3-sonnet-20240229-v1:0

# Executar migrations
php artisan migrate

# Iniciar servidor
php artisan serve
```

### Frontend (Next.js)

```bash
cd frontend

# Instalar dependências
npm install

# Configurar ambiente
echo "NEXT_PUBLIC_API_URL=http://localhost:8000/api" > .env.local

# Iniciar desenvolvimento
npm run dev
```

## 🔧 Configuração AWS Bedrock

1. Acesse o console AWS
2. Ative o Amazon Bedrock na região us-east-1
3. Solicite acesso ao modelo Claude 3 Sonnet
4. Configure as credenciais no .env

## 📱 Como Usar

### 1. Criar Evento
- Acesse `/events/create`
- Preencha informações básicas
- Defina tipo, data e objetivos

### 2. Gerar Estrutura Scrum
- No evento criado, clique em "Gerar Scrum"
- Preencha o formulário:
  - Duração do sprint (3-30 dias)
  - Tamanho da equipe
  - Objetivos específicos
  - Complexidade do projeto
- A IA gerará automaticamente:
  - Backlog inicial
  - Sprints sugeridas
  - Tarefas detalhadas
  - Critérios de aceitação

### 3. Gerenciar Quadros
- Visualize quadros Kanban
- Mova tarefas entre colunas
- Atribua responsáveis
- Acompanhe progresso

## 🏗️ Arquitetura

```
event-scrum-platform/
├── backend/                 # Laravel API
│   ├── app/
│   │   ├── Models/         # Modelos de dados
│   │   ├── Http/Controllers/ # Controllers da API
│   │   └── Services/       # Serviços (Bedrock, etc)
│   ├── database/migrations/ # Estrutura do banco
│   └── routes/api.php      # Rotas da API
├── frontend/               # Next.js App
│   ├── src/
│   │   ├── app/           # Pages e layouts
│   │   ├── components/    # Componentes React
│   │   └── lib/          # Utilitários e API
└── shared/                # Código compartilhado
```

## 🔐 Segurança

- Autenticação JWT
- Middleware de autorização
- Validação de dados
- Sanitização de inputs
- CORS configurado
- Rate limiting

## 📊 Modelos de Dados

### Event
- Informações básicas do evento
- Relacionamento com organizador
- Controle de participantes

### ScrumBoard
- Quadros Scrum por evento
- Configuração de sprints
- Status de progresso

### Task
- Tarefas individuais
- Story points e prioridade
- Critérios de aceitação
- Atribuição de responsáveis

## 🚀 Deploy

### Backend
- Configure servidor PHP 8.2+
- Configure MySQL
- Configure variáveis de ambiente
- Execute `composer install --optimize-autoloader`
- Execute `php artisan migrate --force`

### Frontend
- Build: `npm run build`
- Deploy no Vercel/Netlify
- Configure variáveis de ambiente

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit: `git commit -m 'Adiciona nova funcionalidade'`
4. Push: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

## 📄 Licença

MIT License - veja o arquivo LICENSE para detalhes.

## 🆘 Suporte

- Documentação: `/docs`
- Issues: GitHub Issues
- Email: suporte@eventscrum.com

---

**Event Scrum Platform** - Transformando a gestão de eventos com IA e metodologia ágil! 🎯