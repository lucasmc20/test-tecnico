# Top 20 Criptomoedas - Teste Técnico

Aplicação web desenvolvida em Next.js que exibe as top 20 criptomoedas do CoinGecko com funcionalidades avançadas de visualização e análise.

## 🚀 Funcionalidades

- **Lista das Top 20 Criptomoedas** com dados em tempo real
- **Busca por nome ou símbolo** da moeda
- **Ordenação** por todas as colunas (rank, nome, preço, variação, market cap)
- **Paginação** com opções de 5, 10 ou 25 itens por página
- **Página de detalhes** de cada moeda com gráfico de 7 dias
- **Tema dark/light** alternável
- **Design responsivo** com Material-UI
- **Cache inteligente** com SWR
- **Loading states** e tratamento de erros

## 🛠️ Tecnologias

- **Next.js 15** - Framework React
- **TypeScript** - Tipagem estática
- **Material-UI** - Componentes de interface
- **SWR** - Cache e sincronização de dados
- **Chart.js** - Gráficos interativos
- **Jest** - Testes unitários
- **Docker** - Containerização

## 📦 Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>

# Entre na pasta
cd test-tecnico

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.local.example .env.local
# Adicione sua API key do CoinGecko
 
# Execute o projeto
npm run dev
```

## 🔧 Variáveis de Ambiente

```env
COINGECKO_API_URL=https://api.coingecko.com/api/v3
COINGECKO_API_KEY=sua_api_key_aqui
```

## 🐳 Docker

```bash
# Build da imagem
docker build -t test-tecnico .

# Execute o container
docker run -p 3000:3000 test-tecnico
```

## 🧪 Testes

```bash
# Execute os testes
npm test

# Execute com coverage
npm run test:coverage
```

## 📱 Uso

1. **Página Principal**: Visualize as top 20 criptomoedas
2. **Busca**: Use o campo de busca para filtrar moedas
3. **Ordenação**: Clique nos cabeçalhos das colunas para ordenar
4. **Detalhes**: Clique em uma moeda para ver detalhes e gráfico
5. **Tema**: Use o botão no header para alternar entre claro/escuro

## 🏗️ Estrutura do Projeto

```
src/
├── app/                 # App Router do Next.js
├── components/          # Componentes React
├── hooks/              # Custom hooks
├── services/           # Serviços de API
├── types/              # Definições TypeScript
└── contexts/           # Contextos React
```

## 🚀 Deploy

O projeto possui CI/CD configurado com GitHub Actions que:
- Executa testes automaticamente
- Faz build do projeto
- Deploy automático na branch main

## 👨‍💻 Desenvolvedor

**Lucas Coelho**
- LinkedIn: [devlucascoelho](https://www.linkedin.com/in/devlucascoelho/)

## 📄 Licença

Este projeto foi desenvolvido como teste técnico.