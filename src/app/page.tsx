export default function HomePage() {
  return (
    <section className="space-y-20">
      <div className="py-24 text-center">
        <h1 className="text-4xl font-bold mb-4">Bienvenido a SoulMarket</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Esta es la página de inicio. Desplázate para ver cómo el contenido pasa por debajo del header.
        </p>
      </div>

      <div className="h-[100vh] bg-gradient-to-b from-gray-100 to-gray-200 dark:from-background-7 dark:to-background-9 flex items-center justify-center">
        <p className="text-xl">Sección larga 1</p>
      </div>

      <div className="h-[100vh] bg-gradient-to-b from-gray-200 to-gray-300 dark:from-background-6 dark:to-background-8 flex items-center justify-center">
        <p className="text-xl">Sección larga 2</p>
      </div>

      <div className="h-[100vh] bg-gradient-to-b from-gray-300 to-gray-400 dark:from-background-5 dark:to-background-7 flex items-center justify-center">
        <p className="text-xl">Sección larga 3</p>
      </div>
    </section>
  )
}