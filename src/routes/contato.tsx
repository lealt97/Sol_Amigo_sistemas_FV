import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { CrmForm } from "@/components/site/CrmForm";
import { COMPANY } from "@/lib/company";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato e Orçamento | SA Sistemas FV Energia Solar" },
      {
        name: "description",
        content:
          "Fale com a SA Sistemas FV: telefone, WhatsApp, e-mail e endereço. Peça sua simulação gratuita de energia solar e receba retorno em até 1 dia útil.",
      },
      { property: "og:title", content: "Contato e Orçamento | SA Sistemas FV" },
      {
        property: "og:description",
        content: "Peça sua simulação gratuita de energia solar. Retorno em até 1 dia útil.",
      },
    ],
  }),
  component: Contato,
});

export default function Contato() {
  const items = [
    { Icon: Phone, label: "Telefone / WhatsApp", value: COMPANY.phone, href: COMPANY.phoneHref },
    { Icon: Mail, label: "E-mail", value: COMPANY.email, href: `mailto:${COMPANY.email}` },
    {
      Icon: MapPin,
      label: "Endereço",
      value: `${COMPANY.address.line1} — ${COMPANY.address.line2}`,
      href: COMPANY.address.mapsUrl,
    },
    { Icon: Clock, label: "Horário", value: COMPANY.hours },
  ];

  return (
    <>
      <section className="surface-deep py-20">
        <div className="mx-auto max-w-7xl px-5">
          <h1 className="max-w-3xl text-4xl font-bold text-balance-tight sm:text-5xl">
            Vamos calcular sua economia
          </h1>
          <p className="mt-5 max-w-2xl text-primary-foreground/80">
            Preencha o formulário ou fale direto com nossa equipe. Respondemos em até 1 dia útil.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <h2 className="text-2xl font-bold">Canais de atendimento</h2>
          <ul className="mt-8 space-y-6">
            {items.map(({ Icon, label, value, href }) => (
              <li key={label} className="flex gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-leaf/25">
                  <Icon className="size-5 text-primary" />
                </span>
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {label}
                  </span>
                  {href ? (
                    <a href={href} className="text-sm font-medium hover:text-secondary">
                      {value}
                    </a>
                  ) : (
                    <span className="text-sm font-medium">{value}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10 overflow-hidden rounded-2xl border border-border">
            <iframe
              title="Mapa da localização"
              src="https://www.google.com/maps?q=S%C3%A3o%20Paulo%2C%20SP&output=embed"
              loading="lazy"
              className="h-64 w-full"
            />
          </div>
        </div>

        <CrmForm />
      </section>
    </>
  );
}
