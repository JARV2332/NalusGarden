"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { BRAND, buildWhatsAppMessage } from "@/lib/constants";

const links = [
  { href: "#inicio", label: "Inicio" },
  { href: "#eventos", label: "Eventos" },
  { href: "#paquetes", label: "Paquetes" },
  { href: "#galeria", label: "Galería" },
  { href: "#cotizar", label: "Cotizar" },
  { href: "#contacto", label: "Contacto" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-brown-dark/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#inicio" className="flex items-center gap-3">
          <Logo className="h-11 w-11" />
          <div>
            <p className="font-serif text-lg font-semibold text-cream">{BRAND.name}</p>
            <p className="hidden text-xs text-gold-light sm:block">{BRAND.nameEn}</p>
          </div>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-cream/85 transition hover:text-gold-light"
            >
              {link.label}
            </a>
          ))}
          <a
            href={buildWhatsAppMessage("Hola, me gustaría información sobre sus eventos.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp px-5 py-2.5"
          >
            WhatsApp
          </a>
        </nav>

        <button
          type="button"
          className="rounded-full p-2 text-cream lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-brown-dark px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-xl px-3 py-2 text-cream/90 hover:bg-white/5"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href={buildWhatsAppMessage("Hola, me gustaría información sobre sus eventos.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp mt-2"
            >
              WhatsApp {BRAND.whatsappDisplay}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
