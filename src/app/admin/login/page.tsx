import { Suspense } from "react";
import { AdminLoginPage } from "./AdminLoginPage";

export default function Page() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-cream">Cargando...</div>}>
      <AdminLoginPage />
    </Suspense>
  );
}
