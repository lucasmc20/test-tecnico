# Deploy no Vercel

## Configuração Manual

1. **Conecte o repositório ao Vercel**
   - Acesse [vercel.com](https://vercel.com)
   - Importe o repositório do GitHub
   - Configure o projeto

2. **Configure as variáveis de ambiente**
   ```
   COINGECKO_API_URL=https://api.coingecko.com/api/v3
   COINGECKO_API_KEY=CG-LTBcC1zamACb69xwTKVA32Rj
   ```

3. **Deploy automático**
   - A cada push na branch `main`, o Vercel fará deploy automaticamente
   - O CI/CD roda testes antes do deploy

## Configuração com GitHub Actions (Opcional)

Para deploy automático via GitHub Actions, adicione os secrets:

```
VERCEL_TOKEN - Token da API do Vercel
VERCEL_ORG_ID - ID da organização
VERCEL_PROJECT_ID - ID do projeto
```

Depois descomente a seção de deploy no `.github/workflows/ci-cd.yml`