"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { useBrand, useWhatsApp } from "./BrandProvider";

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#eventos", label: "Eventos" },
  { href: "#paquetes", label: "Paquetes" },
  { href: "#galeria", label: "Galería" },
  { href: "#cotizar", label: "Cotizar" },
  { href: "#contacto", label: "Contacto" },
  { href: "/admin", label: "Admin", isRoute: true },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const brand = useBrand();
  const whatsappHref = useWhatsApp("Hola, me gustaría información sobre sus eventos.");

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-brown-dark/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 xl:px-8">
        <a href="#inicio" className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          <Logo className="h-10 w-10 shrink-0 sm:h-11 sm:w-11" />
          <div className="min-w-0">
            <p className="truncate font-serif text-base font-semibold text-cream sm:text-lg">
              {brand.name}
            </p>
            <p className="truncate text-[11px] text-gold-light sm:text-xs">{brand.nameEn}</p>
          </div>
        </a>

        <nav className="hidden items-center gap-4 xl:flex 2xl:gap-6">
          {navLinks.map((link) =>
            link.isRoute ? (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-gold-light transition hover:text-gold"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-cream/85 transition hover:text-gold-light"
              >
                {link.label}
              </a>
            ),
          )}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp shrink-0 px-4 py-2.5 text-sm"
          >
            WhatsApp
          </a>
        </nav>

        <button
          type="button"
          className="shrink-0 rounded-full p-2 text-cream xl:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open ? (
        <div className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-white/10 bg-brown-dark px-4 py-4 xl:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) =>
              link.isRoute ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-3 py-3 font-semibold text-gold-light hover:bg-white/5"
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-3 py-3 text-cream/90 hover:bg-white/5"
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              ),
            )}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp mt-3 w-full"
              onClick={closeMenu}
            >
              WhatsApp {brand.whatsappDisplay}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
