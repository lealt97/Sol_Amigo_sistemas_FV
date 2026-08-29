import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Zap } from "lucide-react";
import residencial from "@/assets/proj-residencial.jpg";
import comercial from "@/assets/proj-comercial.jpg";
import industrial from "@/assets/proj-industrial.jpg";
import rural from "@/assets/proj-rural.jpg";

export const PROJECTS = [
  {
    img: residencial,
    title: "Residência alto padrão",
    place: "Jundiaí/SP",
    power: "12,4 kWp",
    note: "Economia média de 94% na conta de energia.",
  },
  {
    img: comercial,
    title: "Centro comercial",
    place: "Sorocaba/SP",
    power: "48 kWp",
    note: "Instalação executada sem interrupção da operação.",
  },
  {
    img: industrial,
    title: "Galpão industrial",
    place: "Guarulhos/SP",
    power: "180 kWp",
    note: "Payback estimado em 3 anos e 2 meses.",
  },
  {
    img: rural,
    title: "Usina solo — agronegócio",
    place: "Itapetininga/SP",
    power: "420 kWp",
    note: "Geração dedicada a irrigação e beneficiamento.",
  },
];

export function ProjectsCarousel() {
  const [index, setIndex] = useState(0);
  const total = PROJECTS.length;

  const go = useCallback((dir: number) => setIndex((i) => (i + dir + total) % total), [total]);

  useEffect(() => {
    const id = setInterval(() => go(1), 6000);
    return () => clearInterval(id);
  }, [go]);

  return (
    <section id="projetos" className="surface-deep py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-sm font-semibold uppercase tracking-widest text-sun">
              Trabalhos realizados
            </span>
            <h2 className="mt-3 text-3xl font-bold text-balance-tight sm:text-4xl">
              Projetos que já estão gerando energia
            </h2>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Projeto anterior"
              className="rounded-full border border-primary-foreground/25 p-3 transition-colors hover:border-sun hover:text-sun"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Próximo projeto"
              className="rounded-full border border-primary-foreground/25 p-3 transition-colors hover:border-sun hover:text-sun"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl">
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {PROJECTS.map((p) => (
              <article key={p.title} className="w-full shrink-0">
                <div className="grid items-stretch gap-0 md:grid-cols-5">
                  <img
                    src={p.img}
                    alt={`${p.title} — ${p.place}`}
                    loading="lazy"
                    width={1280}
                    height={960}
                    className="h-64 w-full object-cover md:col-span-3 md:h-[26rem]"
                  />
                  <div className="flex flex-col justify-center gap-4 bg-primary-foreground/5 p-8 md:col-span-2">
                    <span className="inline-flex w-fit items-center gap-2 rounded-full bg-sun px-3 py-1 text-xs font-semibold text-sun-foreground">
                      <Zap className="size-3.5" /> {p.power}
                    </span>
                    <h3 className="text-2xl font-bold">{p.title}</h3>
                    <p className="text-sm text-primary-foreground/70">{p.place}</p>
                    <p className="text-sm leading-relaxed text-primary-foreground/80">{p.note}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {PROJECTS.map((p, i) => (
            <button
              key={p.title}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Ir para ${p.title}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-10 bg-sun" : "w-4 bg-primary-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
