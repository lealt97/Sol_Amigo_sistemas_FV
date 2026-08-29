import { Quote, Star } from "lucide-react";

const ITEMS = [
  {
    name: "Marcelo Andrade",
    role: "Residência · Campinas/SP",
    text: "Minha conta caiu de R$ 780 para a taxa mínima já no segundo mês. A equipe cuidou de tudo, inclusive da homologação.",
  },
  {
    name: "Fernanda Ribeiro",
    role: "Padaria Trigo Nobre · Sorocaba/SP",
    text: "Projeto entregue no prazo combinado e sem parar a operação da loja. O acompanhamento pós-instalação faz muita diferença.",
  },
  {
    name: "Cláudio Menezes",
    role: "Fazenda Boa Vista · Itapetininga/SP",
    text: "Dimensionaram o sistema pensando na irrigação. Hoje a energia deixou de ser meu maior custo fixo.",
  },
  {
    name: "Patrícia Lopes",
    role: "Clínica Vitalis · São Paulo/SP",
    text: "Transparência total no orçamento, nada de surpresa. Recomendo para quem quer previsibilidade de custo.",
  },
  {
    name: "Rogério Tanaka",
    role: "Metalúrgica RT · Guarulhos/SP",
    text: "Retorno do investimento chegou antes do previsto. Monitoramos a geração todo mês pelo app que eles configuraram.",
  },
  {
    name: "Ana Beatriz Souza",
    role: "Residência · Jundiaí/SP",
    text: "Atendimento humano do começo ao fim. Explicaram cada etapa sem enrolação técnica.",
  },
];

export function Testimonials() {
  return (
    <section id="depoimentos" className="mx-auto max-w-7xl px-5 py-24">
      <div className="max-w-2xl">
        <span className="text-sm font-semibold uppercase tracking-widest text-secondary">
          Depoimentos
        </span>
        <h2 className="mt-3 text-3xl font-bold text-balance-tight sm:text-4xl">
          Quem já gera a própria energia com a gente
        </h2>
        <p className="mt-4 text-muted-foreground">
          Mais de 500 sistemas instalados e uma nota média de 4,9 em avaliações de clientes.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map((t) => (
          <figure
            key={t.name}
            className="card-lift relative rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-soft)]"
          >
            <Quote className="size-8 text-leaf" aria-hidden />
            <blockquote className="mt-4 text-sm leading-relaxed text-foreground/85">
              “{t.text}”
            </blockquote>
            <div className="mt-5 flex gap-0.5" aria-label="5 de 5 estrelas">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-sun text-sun" />
              ))}
            </div>
            <figcaption className="mt-4 border-t border-border pt-4">
              <span className="block text-sm font-semibold">{t.name}</span>
              <span className="block text-xs text-muted-foreground">{t.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
