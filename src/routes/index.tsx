import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BatteryCharging,
  ClipboardCheck,
  LineChart,
  ShieldCheck,
  Sun,
  Wrench,
} from "lucide-react";
import heroImg from "@/assets/hero-solar.jpg";
import { Testimonials } from "@/components/site/Testimonials";
import { ProjectsCarousel } from "@/components/site/ProjectsCarousel";
import { CrmForm } from "@/components/site/CrmForm";
import { COMPANY } from "@/lib/company";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SA Sistemas FV | Energia Solar para Casa, Empresa e Campo" },
      {
        name: "description",
        content:
          "Integradora de energia solar fotovoltaica: projeto, instalação, homologação e monitoramento. Reduza até 95% da sua conta de luz. Simulação gratuita.",
      },
      { property: "og:title", content: "SA Sistemas FV | Energia Solar Sob Medida" },
      {
        property: "og:description",
        content:
          "Projeto, instalação e homologação de sistemas fotovoltaicos residenciais, comerciais, industriais e rurais.",
      },
    ],
  }),
  component: Home,
});

const STEPS = [
  {
    Icon: ClipboardCheck,
    title: "Diagnóstico e projeto",
    text: "Analisamos sua conta de energia e o local da instalação para dimensionar o sistema ideal.",
  },
  {
    Icon: Wrench,
    title: "Instalação certificada",
    text: "Equipe própria, equipamentos Tier 1 e execução conforme as normas NBR e da concessionária.",
  },
  {
    Icon: ClipboardCheck,
    title: "Homologação",
    text: "Cuidamos de toda a papelada junto à distribuidora até a troca do medidor.",
  },
  {
    Icon: LineChart,
    title: "Monitoramento",
    text: "Acompanhamento da geração e manutenção preventiva durante toda a vida útil.",
  },
];

const BENEFITS = [
  { Icon: Sun, title: "Até 95% de economia", text: "Sua conta de luz reduzida à taxa mínima." },
  { Icon: ShieldCheck, title: "25 anos de garantia", text: "Módulos com garantia de performance." },
  { Icon: BatteryCharging, title: "Valorização do imóvel", text: "Imóveis com geração própria valem mais." },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImg}
          alt="Painéis solares instalados em telhado residencial ao entardecer"
          width={1920}
          height={1280}
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,oklch(0.246_0.039_249.5/0.94)_25%,oklch(0.246_0.039_249.5/0.55))]" />
        <div className="mx-auto max-w-7xl px-5 py-28 text-primary-foreground sm:py-36">
          <span className="inline-flex items-center gap-2 rounded-full border border-sun/40 bg-sun/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sun">
            <Sun className="size-3.5" /> Integradora fotovoltaica
          </span>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.08] text-balance-tight sm:text-6xl">
            Gere sua própria energia e liberte seu orçamento da conta de luz
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/80 sm:text-lg">
            Do estudo de viabilidade à homologação: entregamos sistemas solares completos para
            residências, comércios, indústrias e propriedades rurais.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              to="/contato"
              className="inline-flex items-center gap-2 rounded-full bg-sun px-7 py-3.5 text-sm font-semibold text-sun-foreground transition-transform hover:-translate-y-0.5"
            >
              Simular minha economia <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/projetos"
              className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-7 py-3.5 text-sm font-semibold transition-colors hover:border-sun hover:text-sun"
            >
              Ver projetos realizados
            </Link>
          </div>

          <dl className="mt-16 grid max-w-3xl grid-cols-2 gap-8 border-t border-primary-foreground/15 pt-8 sm:grid-cols-4">
            {[
              ["+500", "sistemas instalados"],
              ["8 MWp", "de potência entregue"],
              ["4,9", "nota média dos clientes"],
              ["25 anos", "de garantia dos módulos"],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="text-2xl font-bold text-sun sm:text-3xl">{n}</dt>
                <dd className="mt-1 text-xs text-primary-foreground/70">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="mx-auto max-w-7xl px-5 py-24">
        <div className="grid gap-6 md:grid-cols-3">
          {BENEFITS.map(({ Icon, title, text }) => (
            <div
              key={title}
              className="card-lift rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]"
            >
              <span className="inline-flex rounded-xl bg-leaf/25 p-3 text-primary">
                <Icon className="size-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="bg-muted py-24">
        <div className="mx-auto max-w-7xl px-5">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-widest text-secondary">
              Como funciona
            </span>
            <h2 className="mt-3 text-3xl font-bold text-balance-tight sm:text-4xl">
              Quatro etapas, uma equipe só do começo ao fim
            </h2>
          </div>
          <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(({ Icon, title, text }, i) => (
              <li key={title} className="rounded-2xl border border-border bg-card p-7">
                <span className="text-xs font-bold text-secondary">0{i + 1}</span>
                <Icon className="mt-4 size-6 text-secondary" />
                <h3 className="mt-4 font-bold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ProjectsCarousel />
      <Testimonials />

      {/* CRM / ORÇAMENTO */}
      <section id="orcamento" className="mx-auto max-w-7xl px-5 pb-8">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div className="lg:sticky lg:top-28">
            <span className="text-sm font-semibold uppercase tracking-widest text-secondary">
              Orçamento
            </span>
            <h2 className="mt-3 text-3xl font-bold text-balance-tight sm:text-4xl">
              Peça sua simulação gratuita
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              Preencha o formulário e receba um estudo com potência recomendada, economia estimada e
              tempo de retorno do investimento.
            </p>
            <ul className="mt-8 space-y-3 text-sm">
              {["Sem custo e sem compromisso", "Retorno em até 1 dia útil", "Atendimento por engenheiro"].map(
                (t) => (
                  <li key={t} className="flex items-center gap-3">
                    <span className="size-2 rounded-full bg-leaf" /> {t}
                  </li>
                ),
              )}
            </ul>
            <p className="mt-8 text-sm text-muted-foreground">
              Prefere falar agora?{" "}
              <a href={COMPANY.phoneHref} className="font-semibold text-secondary">
                {COMPANY.phone}
              </a>
            </p>
          </div>
          <CrmForm />
        </div>
      </section>
    </>
  );
}
