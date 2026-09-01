# Editora Levi

Presença digital inicial da Editora Levi, construída como um projeto enxuto e independente da infraestrutura da Editora Ichthus.

## Escopo desta fase

- Home institucional concisa
- Obras publicadas de Adilson Borges
- Pedido de livros via WhatsApp
- CTA para serviços editoriais via WhatsApp
- Landing page completa de `A Prisão ou o Milhão`
- Links secundários para obras publicadas na Amazon
- SEO básico com metadados, `robots.txt` e sitemap
- Estrutura preparada para checkout e entrega digital na evolução comercial do projeto

A loja completa, catálogo administrável, carrinho multiobra e CMS não fazem parte deste MVP.

## Rotas

- `/` — Home da Editora Levi
- `/a-prisao-ou-o-milhao` — Landing page comercial da obra

## Ambiente

Crie `.env.local` a partir de `.env.example`:

```bash
NEXT_PUBLIC_SITE_URL=https://editoralevi.com.br
NEXT_PUBLIC_WHATSAPP_NUMBER=55DDDNUMERO
```

O número do WhatsApp deve ser informado somente com dígitos e código do país.

## Desenvolvimento

```bash
npm install
npm run dev
```

Validação:

```bash
npm run typecheck
npm run build
```

## Observação sobre os assets

As capas e a marca presentes nesta primeira fundação são assets provisórios para desenvolvimento, reconstruídos a partir das referências visuais disponíveis. Antes da publicação final, devem ser substituídos pelos arquivos oficiais em alta qualidade.

## Próximas etapas

1. Conectar o repositório ao Vercel e gerar a primeira preview.
2. Configurar o número de WhatsApp da Editora Levi.
3. Substituir marca e capas pelos arquivos oficiais.
4. Revisar a home e a LP visualmente em desktop e mobile.
5. Integrar checkout do livro físico e das versões PDF/EPUB.
6. Implementar entrega digital protegida.
