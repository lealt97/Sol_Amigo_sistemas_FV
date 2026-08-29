import { createFileRoute, Link } from "@tanstack/react-router";
import { Target, HeartHandshake, Leaf } from "lucide-react";
import img from "@/assets/proj-comercial.jpg";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre a SA Sistemas FV | Integradora de Energia Solar" },
      {
        name: "description",
        content:
          "Conheça a SA Sistemas Fotovoltaicos: engenharia própria, equipe certificada e mais de 500 sistemas solares instalados com acompanhamento pós-obra.",
      },
      { property: "og:title", content: "Sobre a SA Sistemas FV" },
      {
        property: "og:description",
        content: "Engenharia própria, equipe certificada e +500 sistemas solares instalados.",
      },
    ],
  }),
  component: Sobre,
});

const VALUES = [
  { Icon: Target, title: "Técnica antes da venda", text: "Cada proposta nasce de um estudo real de consumo e sombreamento — nunca de tabela pronta." },
  { Icon: HeartHandshake, title: "Relação de longo prazo", text: "O contrato não acaba na instalação: acompanhamos a geração e a manutenção do sistema." },
  { Icon: Leaf, title: "Compromisso ambiental", text: "Cada sistema entregue evita toneladas de CO₂ ao longo da vida útil dos módulos." },
];

export default function Sobre() {
  return (
    <>
      <section className="surface-deep py-20">
        <div className="mx-auto max-w-7xl px-5">
          <h1 className="max-w-3xl text-4xl font-bold text-balance-tight sm:text-5xl">
            Uma integradora que entrega engenharia, não só painéis
          </h1>
          <p className="mt-5 max-w-2xl text-primary-foreground/80">
            Nascemos da união entre engenharia elétrica e execução em campo. Hoje somos referência
            regional em sistemas fotovoltaicos conectados à rede.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 lg:grid-cols-2">
        <img
          src={img}
          alt="Equipe técnica instalando módulos fotovoltaicos"
          loading="lazy"
          width={1280}
          height={960}
          className="rounded-3xl object-cover shadow-[var(--shadow-soft)]"
        />
        <div>
          <h2 className="text-3xl font-bold text-balance-tight">Nossa história</h2>
          <p className="mt-4 text-muted-foreground">
            Começamos com instalações residenciais em bairros vizinhos e, projeto após projeto,
            crescemos para usinas de solo no agronegócio e sistemas industriais de centenas de kWp.
            O que não mudou foi o método: estudo detalhado, materiais homologados e uma equipe fixa
            que responde pelo que instala.
          </p>
          <p className="mt-4 text-muted-foreground">
            Trabalhamos apenas com módulos e inversores de fabricantes Tier 1, com garantia de
            performance de 25 anos e suporte técnico no Brasil.
          </p>
          <Link
            to="/contato"
            className="mt-8 inline-flex rounded-full bg-secondary px-7 py-3.5 text-sm font-semibold text-secondary-foreground transition-transform hover:-translate-y-0.5"
          >
            Falar com um engenheiro
          </Link>
        </div>
      </section>

      <section className="bg-muted py-24">
        <div className="mx-auto max-w-7xl px-5">
          <h2 className="text-3xl font-bold text-balance-tight">O que nos guia</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {VALUES.map(({ Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-border bg-card p-8">
                <Icon className="size-6 text-secondary" />
                <h3 className="mt-4 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
