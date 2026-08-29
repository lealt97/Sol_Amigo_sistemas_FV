# Site da SA Sistemas Fotovoltaicos

Site institucional feito somente com HTML, CSS e JavaScript. Não precisa instalar programas, executar comandos de compilação ou conhecer React/TypeScript.

## Como abrir

Abra o arquivo `index.html` no navegador. Para publicar, envie todos os arquivos e a pasta `assets` ao seu serviço de hospedagem.

## Estrutura

- `index.html`: página inicial
- `sobre.html`: página sobre a empresa
- `servicos.html`: serviços oferecidos
- `projetos.html`: portfólio de projetos
- `contato.html`: contato e formulário do Sol Amigo PRO
- `style.css`: cores, fontes, espaçamentos e responsividade
- `script.js`: menu móvel, carrossel e comportamentos do site
- `assets/`: logotipos e imagens do site

## Formulário do Sol Amigo PRO

O widget está incorporado em `index.html` e `contato.html` com o identificador público:

```html
<div id="sol-amigo-formulario"></div>
<script
  async
  src="https://lealt97.github.io/sol-amigo-pro/widget.js"
  data-sol-amigo-token="d5395e84-a46a-4745-9dc3-22c5dc764d38"
  data-mode="inline"
  data-target="#sol-amigo-formulario"
></script>
```

No Sol Amigo PRO, autorize a origem `https://lealt97.github.io`. O caminho `/sunpowered-portal/` não faz parte da origem e não deve ser acrescentado ao domínio autorizado. Se o site passar a usar um domínio próprio, autorize também a origem desse domínio, sempre com `https://` e sem caminho final.

O widget usa um `iframe`, por isso seu estilo interno não é controlado por `style.css`. Cole o CSS abaixo no editor **CSS avançado** do formulário dentro do Sol Amigo PRO:

```css
.sol-form__card {
  border-radius: 24px;
  box-shadow: 0 18px 45px rgba(14, 35, 55, 0.16);
}

.sol-form__input,
.sol-form__select {
  border-radius: 10px;
  border-color: #64B0F3;
}

.sol-form__button {
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
```

Ao abrir os arquivos diretamente pelo computador (`file://`), o formulário pode ser bloqueado pela validação de origem. Faça o teste final na versão publicada do GitHub Pages.

## Informações que precisam ser revisadas

Também revise nos arquivos HTML o endereço, e-mail, telefone, redes sociais, números de projetos, depoimentos e demais textos antes da publicação. Os dados atuais são conteúdo provisório herdado da versão anterior do site.

## Como editar

Você pode editar os arquivos em qualquer editor de texto. Depois de salvar, atualize a página no navegador para ver a mudança. As cores principais ficam no início de `style.css`, dentro de `:root`.
