# Site da SA Sistemas Fotovoltaicos

Site institucional feito somente com HTML, CSS e JavaScript. Não precisa instalar programas, executar comandos de compilação ou conhecer React/TypeScript.

## Como abrir

Abra o arquivo `index.html` no navegador. Para publicar, envie todos os arquivos e a pasta `assets` ao seu serviço de hospedagem.

## Estrutura

- `index.html`: página inicial
- `sobre.html`: página sobre a empresa
- `servicos.html`: serviços oferecidos
- `projetos.html`: portfólio de projetos
- `contato.html`: contato e área do formulário do CRM
- `style.css`: cores, fontes, espaçamentos e responsividade
- `script.js`: menu móvel, carrossel, formulário e integração do CRM
- `assets/`: logotipos e imagens do site

## Informações que precisam ser configuradas

No começo de `script.js`, preencha:

```js
const WHATSAPP_NUMBER = "5511999999999";
const CRM_EMBED_URL = "https://endereco-do-formulario-do-seu-crm";
```

Use o telefone do WhatsApp apenas com números, incluindo código do país e DDD. Se o seu CRM fornecer um código completo de incorporação em vez de uma URL, substitua o bloco `#crm-embed` em `index.html` ou `contato.html` pelo código fornecido.

Também revise nos arquivos HTML o endereço, e-mail, telefone, redes sociais, números de projetos, depoimentos e demais textos antes da publicação. Os dados atuais são conteúdo provisório herdado da versão anterior do site.

## Como editar

Você pode editar os arquivos em qualquer editor de texto. Depois de salvar, atualize a página no navegador para ver a mudança. As cores principais ficam no início de `style.css`, dentro de `:root`.
