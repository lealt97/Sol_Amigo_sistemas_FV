import { createFileRoute } from "@tanstack/react-router";
import { Zap } from "lucide-react";
import { ProjectsCarousel, PROJECTS } from "@/components/site/ProjectsCarousel";
import { Testimonials } from "@/components/site/Testimonials";

export const Route = createFileRoute("/projetos")({
  head: () => ({
    meta: [
      { title: "Projetos Realizados | SA Sistemas FV Energia Solar" },
      {
        name: "description",
        content:
          "Galeria de sistemas fotovoltaicos entregues pela SA Sistemas FV: residências, comércios, indústrias e usinas de solo no agronegócio.",
      },
      { property: "og:title", content: "Projetos Realizados | SA Sistemas FV" },
      {
        property: "og:description",
        content: "Veja sistemas solares residenciais, comerciais, industriais e rurais já em operação.",
      },
    ],
  }),
  component: Projetos,
});

export default function Projetos() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 py-16">
        <h1 className="max-w-3xl text-4xl font-bold text-balance-tight sm:text-5xl">
          Trabalhos realizados
        </h1>
        <p className="mt-5 max-w-2xl text-muted-foreground">
          Uma amostra dos sistemas que projetamos, instalamos e homologamos. Cada obra é
          acompanhada por nossa equipe técnica após a energização.
        </p>
      </section>

      <ProjectsCarousel />

      <section className="mx-auto max-w-7xl px-5 py-24">
        <h2 className="text-3xl font-bold text-balance-tight">Galeria completa</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROJECTS.map((p) => (
            <figure
              key={p.title}
              className="card-lift overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)]"
            >
              <img
                src={p.img}
                alt={`${p.title} em ${p.place}`}
                loading="lazy"
                width={1280}
                height={960}
                className="h-52 w-full object-cover"
              />
              <figcaption className="p-6">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-sun/30 px-2.5 py-1 text-xs font-semibold">
                  <Zap className="size-3" /> {p.power}
                </span>
                <h3 className="mt-3 font-bold">{p.title}</h3>
                <p className="text-xs text-muted-foreground">{p.place}</p>
                <p className="mt-3 text-sm text-muted-foreground">{p.note}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <Testimonials />
    </>
  );
}
