import { howItWorks } from "@/data/events";

export function HowItWorks() {
  return (
    <section className="section-padding bg-brown text-cream">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold-light">
            Cómo funciona
          </p>
          <h2 className="font-serif text-3xl font-semibold sm:text-4xl lg:text-5xl">
            Simple, claro y con acompañamiento de principio a fin
          </h2>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {howItWorks.map((step) => (
            <article
              key={step.step}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:rounded-[2rem] sm:p-8"
            >
              <p className="font-serif text-5xl text-gold-light">{step.step}</p>
              <h3 className="mt-4 text-2xl font-semibold">{step.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-cream/80">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
