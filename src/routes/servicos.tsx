import { createFileRoute, Link } from "@tanstack/react-router";
import { Home, Building2, Factory, Tractor, Wrench, ShieldCheck, BatteryCharging, Car } from "lucide-react";

export const Route = createFileRoute("/servicos")({
  head: () => ({
    meta: [
      { title: "Serviços de Energia Solar | SA Sistemas FV" },
      {
        name: "description",
        content:
          "Sistemas fotovoltaicos residenciais, comerciais, industriais e rurais, além de manutenção, limpeza de módulos, baterias e carregadores veiculares.",
      },
      { property: "og:title", content: "Serviços de Energia Solar | SA Sistemas FV" },
      {
        property: "og:description",
        content: "Projeto, instalação, homologação e manutenção de sistemas fotovoltaicos.",
      },
    ],
  }),
  component: Servicos,
});

const MAIN = [
  { Icon: Home, title: "Residencial", text: "Sistemas de 2 a 20 kWp para casas e condomínios, com projeto estético integrado ao telhado." },
  { Icon: Building2, title: "Comercial", text: "Lojas, clínicas e escritórios: redução de custo fixo com instalação sem parar a operação." },
  { Icon: Factory, title: "Industrial", text: "Sistemas de alta potência em média tensão, com análise de demanda contratada." },
  { Icon: Tractor, title: "Rural / Agronegócio", text: "Usinas de solo e sistemas para irrigação, aviários e agroindústrias." },
];

const EXTRA = [
  { Icon: Wrench, title: "Manutenção e limpeza", text: "Planos preventivos com inspeção termográfica e limpeza de módulos." },
  { Icon: ShieldCheck, title: "Laudos e homologação", text: "Regularização de sistemas existentes junto à concessionária." },
  { Icon: BatteryCharging, title: "Armazenamento", text: "Baterias para backup de energia em cargas críticas." },
  { Icon: Car, title: "Carregador veicular", text: "Instalação de estações de recarga para carros elétricos." },
];

export default function Servicos() {
  return (
    <>
      <section className="surface-deep py-20">
        <div className="mx-auto max-w-7xl px-5">
          <h1 className="max-w-3xl text-4xl font-bold text-balance-tight sm:text-5xl">
            Soluções fotovoltaicas para cada tipo de consumo
          </h1>
          <p className="mt-5 max-w-2xl text-primary-foreground/80">
            Dimensionamos o sistema a partir do seu histórico de consumo, do espaço disponível e da
            sua meta de retorno financeiro.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24">
        <div className="grid gap-6 md:grid-cols-2">
          {MAIN.map(({ Icon, title, text }) => (
            <article
              key={title}
              className="card-lift rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]"
            >
              <span className="inline-flex rounded-xl bg-sun/25 p-3 text-primary">
                <Icon className="size-6" />
              </span>
              <h2 className="mt-5 text-xl font-bold">{title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>

        <h2 className="mt-20 text-3xl font-bold text-balance-tight">Serviços complementares</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {EXTRA.map(({ Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-border bg-muted p-7">
              <Icon className="size-5 text-secondary" />
              <h3 className="mt-4 font-bold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 rounded-3xl bg-leaf/25 p-10">
          <p className="max-w-lg text-lg font-semibold">
            Não sabe qual solução se encaixa no seu caso? Nós fazemos o estudo por você.
          </p>
          <Link
            to="/contato"
            className="rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Pedir orçamento
          </Link>
        </div>
      </section>
    </>
  );
}
