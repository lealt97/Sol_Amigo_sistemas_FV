import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { COMPANY } from "@/lib/company";

/**
 * Espaço reservado para o formulário do CRM.
 * Defina `crmFormEmbedUrl` em src/lib/company.ts para exibir o embed real.
 */
export function CrmForm() {
  const [sending, setSending] = useState(false);

  if (COMPANY.crmFormEmbedUrl) {
    return (
      <div className="overflow-hidden rounded-2xl border border-border bg-card p-2 shadow-[var(--shadow-soft)]">
        <iframe
          src={COMPANY.crmFormEmbedUrl}
          title="Formulário de contato"
          className="h-[620px] w-full rounded-xl"
          loading="lazy"
        />
      </div>
    );
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    const data = new FormData(e.currentTarget);
    const msg = [
      `Nome: ${data.get("nome")}`,
      `E-mail: ${data.get("email")}`,
      `Telefone: ${data.get("telefone")}`,
      `Conta de luz: ${data.get("conta")}`,
      `Tipo: ${data.get("tipo")}`,
      `Mensagem: ${data.get("mensagem")}`,
    ].join("\n");
    window.open(`${COMPANY.whatsappUrl}?text=${encodeURIComponent(msg)}`, "_blank");
    toast.success("Recebemos seu pedido! Nossa equipe entra em contato em breve.");
    e.currentTarget.reset();
    setSending(false);
  }

  const field =
    "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring";

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium">Nome completo</span>
          <input name="nome" required className={field} placeholder="Seu nome" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">E-mail</span>
          <input type="email" name="email" required className={field} placeholder="voce@email.com" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">Telefone / WhatsApp</span>
          <input name="telefone" required className={field} placeholder="(00) 00000-0000" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">Média da conta de luz</span>
          <select name="conta" className={field} defaultValue="Até R$ 500">
            <option>Até R$ 500</option>
            <option>R$ 500 a R$ 1.500</option>
            <option>R$ 1.500 a R$ 5.000</option>
            <option>Acima de R$ 5.000</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">Tipo de instalação</span>
          <select name="tipo" className={field} defaultValue="Residencial">
            <option>Residencial</option>
            <option>Comercial</option>
            <option>Industrial</option>
            <option>Rural</option>
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium">Mensagem</span>
          <textarea
            name="mensagem"
            rows={4}
            className={field}
            placeholder="Conte um pouco sobre o seu projeto"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={sending}
        className="mt-6 w-full rounded-full bg-secondary px-6 py-3.5 text-sm font-semibold text-secondary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-60"
      >
        Quero minha simulação gratuita
      </button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Retorno em até 1 dia útil. Seus dados são tratados com confidencialidade.
      </p>
    </form>
  );
}
