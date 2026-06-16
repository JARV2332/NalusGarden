const galleryItems = [
  {
    title: "Entrada y jardín principal",
    subtitle: "Jardín de Nalu",
    className: "md:col-span-2 md:row-span-2 min-h-[420px]",
    gradient: "from-[#6b4f3a] via-[#4a3728] to-[#2f2118]",
  },
  {
    title: "Recepción con telas vintage",
    subtitle: "Luces y elegancia",
    className: "min-h-[200px]",
    gradient: "from-[#8b6914] via-[#4a3728] to-[#2f2118]",
  },
  {
    title: "Estación de pastel",
    subtitle: "Detalles dulces",
    className: "min-h-[200px]",
    gradient: "from-[#c9a86c] via-[#6b4f3a] to-[#2f2118]",
  },
  {
    title: "Ceremonia con vista al lago",
    subtitle: "Nalu's Lake",
    className: "md:col-span-2 min-h-[220px]",
    gradient: "from-[#3d6b8a] via-[#4a3728] to-[#2f2118]",
  },
  {
    title: "Atardecer en Amatitlán",
    subtitle: "Ambientes para fotografías",
    className: "min-h-[220px]",
    gradient: "from-[#b87333] via-[#6b4f3a] to-[#2f2118]",
  },
];

export function Gallery() {
  return (
    <section id="galeria" className="section-padding bg-cream-dark/50">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">Galería</p>
          <h2 className="section-title">Un vistazo al lugar de los mejores eventos</h2>
          <p className="section-subtitle">
            Momentos reales de bodas, quince años y celebraciones en nuestros espacios.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {galleryItems.map((item) => (
            <article
              key={item.title}
              className={`relative overflow-hidden rounded-[2rem] border border-gold/20 shadow-lg ${item.className}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`} />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.15),transparent_45%)]" />
              <div className="relative flex h-full flex-col justify-end p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-gold-light">{item.subtitle}</p>
                <h3 className="mt-2 font-serif text-2xl text-cream">{item.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
