import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import logoDark from "@/assets/SA_sistemas_FV_horizontal_escuro.svg.asset.json";
import { COMPANY } from "@/lib/company";

const NAV = [
  { to: "/", label: "Início" },
  { to: "/sobre", label: "Sobre" },
  { to: "/servicos", label: "Serviços" },
  { to: "/projetos", label: "Projetos" },
  { to: "/contato", label: "Contato" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-primary-foreground/10 bg-primary/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3.5">
        <Link to="/" className="flex items-center" aria-label={`${COMPANY.name} — início`}>
          <img src={logoDark.url} alt={`Logotipo ${COMPANY.name}`} className="h-11 w-auto" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-md px-3 py-2 text-sm font-medium text-primary-foreground/75 transition-colors hover:text-primary-foreground"
              activeProps={{ className: "text-sun" }}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={COMPANY.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 inline-flex items-center gap-2 rounded-full bg-sun px-5 py-2.5 text-sm font-semibold text-sun-foreground transition-transform hover:-translate-y-0.5"
          >
            <Phone className="size-4" /> Simular economia
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menu"
          className="rounded-md p-2 text-primary-foreground md:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-primary-foreground/10 bg-primary px-5 pb-5 md:hidden">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block border-b border-primary-foreground/5 py-3 text-sm font-medium text-primary-foreground/80"
              activeProps={{ className: "text-sun" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={COMPANY.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-sun px-5 py-3 text-sm font-semibold text-sun-foreground"
          >
            <Phone className="size-4" /> Simular economia
          </a>
        </nav>
      )}
    </header>
  );
}
