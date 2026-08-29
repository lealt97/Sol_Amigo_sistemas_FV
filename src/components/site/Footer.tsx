import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Clock, Instagram, Facebook, Linkedin, Youtube } from "lucide-react";
import logoDark from "@/assets/SA_sistemas_FV_horizontal_escuro.svg.asset.json";
import { COMPANY } from "@/lib/company";

const LINKS = [
  { to: "/", label: "Início" },
  { to: "/sobre", label: "Sobre nós" },
  { to: "/servicos", label: "Serviços" },
  { to: "/projetos", label: "Projetos" },
  { to: "/contato", label: "Contato" },
] as const;

const SOCIAL = [
  { href: COMPANY.social.instagram, label: "Instagram", Icon: Instagram },
  { href: COMPANY.social.facebook, label: "Facebook", Icon: Facebook },
  { href: COMPANY.social.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: COMPANY.social.youtube, label: "YouTube", Icon: Youtube },
];

export function Footer() {
  return (
    <footer className="surface-deep mt-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <img src={logoDark.url} alt={`Logotipo ${COMPANY.name}`} className="h-14 w-auto" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-primary-foreground/70">
            Integradora de energia solar fotovoltaica: engenharia própria, homologação junto à
            concessionária e monitoramento contínuo da sua geração.
          </p>
          <div className="mt-6 flex gap-3">
            {SOCIAL.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="rounded-full border border-primary-foreground/20 p-2.5 text-primary-foreground/80 transition-colors hover:border-sun hover:text-sun"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Navegação do rodapé">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-sun">Navegação</h3>
          <ul className="mt-5 space-y-3">
            {LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-sm text-primary-foreground/75 transition-colors hover:text-primary-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-sun">Contato</h3>
          <ul className="mt-5 space-y-4 text-sm text-primary-foreground/75">
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-leaf" />
              <a href={COMPANY.phoneHref} className="hover:text-primary-foreground">
                {COMPANY.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-leaf" />
              <a href={`mailto:${COMPANY.email}`} className="hover:text-primary-foreground">
                {COMPANY.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-leaf" />
              <span>{COMPANY.hours}</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-sun">Endereço</h3>
          <address className="mt-5 flex gap-3 text-sm not-italic text-primary-foreground/75">
            <MapPin className="mt-0.5 size-4 shrink-0 text-leaf" />
            <a
              href={COMPANY.address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-foreground"
            >
              {COMPANY.address.line1}
              <br />
              {COMPANY.address.line2}
            </a>
          </address>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-primary-foreground/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {COMPANY.name}. Todos os direitos reservados.
          </p>
          <p>CNPJ 00.000.000/0001-00</p>
        </div>
      </div>
    </footer>
  );
}
