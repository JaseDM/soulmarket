"use client"; // si usas app router

import Link from "next/link";

export default function ComingSoon() {
  return (
    <section className="flex items-center justify-center min-h-[70vh] bg-gray-50 dark:bg-gray-900">
      <div className="text-center max-w-lg px-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-white mb-4">
          🚧 Próximamente
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Estamos trabajando para traerte una experiencia increíble.  
          Vuelve pronto para descubrir todas las novedades.
        </p>
        <div className="flex justify-center">
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </section>
  );
}