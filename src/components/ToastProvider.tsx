"use client"; // 👈 ¡Esta es la directiva clave!

import { Toaster } from "sonner";

// Puedes personalizar las opciones por defecto del Toaster aquí
const ToasterProvider = () => {
  return <Toaster position="bottom-center" richColors theme="light" />;
};

export default ToasterProvider;