export type PackageItem = {
  icon: string;
  label: string;
};

export type EventPackage = {
  id: string;
  name: string;
  subtitle: string;
  pricePerPerson: number;
  minGuests: number;
  highlight?: string;
  features: PackageItem[];
  extras?: string[];
};

const sharedFeatures: PackageItem[] = [
  { icon: "garden", label: "Jardín techado para celebración" },
  { icon: "fabric", label: "Telas y luces vintage" },
  { icon: "dance", label: "Pista de baile con luces" },
  { icon: "room", label: "Salón para utilizar el día de tu evento" },
  { icon: "camera", label: "Hermosos ambientes para sesiones de fotografías" },
  { icon: "setup", label: "Acomodación del evento" },
  { icon: "furniture", label: "Mobiliario: mesas redondas, sillas Chaverri o Avant Garden" },
  { icon: "audio", label: "Discoteca y sonido para usos protocolarios" },
  { icon: "projector", label: "Video proyección" },
  { icon: "sign", label: "Rótulos personalizados" },
  { icon: "banquet", label: "Banquete con bebidas repuestas" },
  { icon: "toast", label: "Brindis con bebidas y cristalería en acrílico" },
  { icon: "cake", label: "Pastel hermoso y delicioso" },
  { icon: "coffee", label: "Estación de café" },
  { icon: "staff", label: "Personal profesional" },
  { icon: "mc", label: "Maestro de ceremonias y Discomóvil" },
  { icon: "memorial", label: "Mesa de homenaje para seres queridos" },
];

export const packages: EventPackage[] = [
  {
    id: "jardin-de-nalu",
    name: "Jardín de Nalu",
    subtitle: "Paquete todo incluido",
    pricePerPerson: 185,
    minGuests: 40,
    highlight: "Entrada especial con BMW descapotable o limosina",
    features: [
      ...sharedFeatures.slice(0, 3),
      { icon: "ceremony", label: "Jardín para ceremonias" },
      { icon: "parking", label: "Parqueo amplio interno con seguridad" },
      ...sharedFeatures.slice(3, 6),
      { icon: "car", label: "Vehículo especial de entrada (BMW descapotable o limosina)" },
      ...sharedFeatures.slice(6),
      { icon: "tasting", label: "Reunión previa para montaje y degustación" },
    ],
  },
  {
    id: "nalus-lake",
    name: "Nalu's Lake",
    subtitle: "Paquete todo incluido con vista al lago",
    pricePerPerson: 199.99,
    minGuests: 50,
    highlight: "Ceremonias con vista al Lago de Amatitlán",
    features: [
      ...sharedFeatures.slice(0, 2),
      { icon: "dance", label: "Pista de baile" },
      {
        icon: "lake",
        label: "Jardín para ceremonias con vista al lago de Amatitlán",
      },
      ...sharedFeatures.slice(3),
    ],
  },
];

export const paymentInfo = {
  invoiced: true,
  cards: true,
  visaCuotas: [3, 6, 10, 12],
  cashDiscount: true,
};
