export default function Page() {
  return (
    <section className="space-y-4 max-w-xl">
      <h1 className="text-2xl font-semibold">Contact Us</h1>
      <p>Escríbenos y te respondemos pronto.</p>
      <form className="space-y-3">
        <input className="w-full border rounded-md px-3 py-2" placeholder="Nombre" />
        <input className="w-full border rounded-md px-3 py-2" type="email" placeholder="Email" />
        <textarea className="w-full border rounded-md px-3 py-2" rows={4} placeholder="Mensaje" />
        <button className="px-4 py-2 rounded-md bg-gray-900 text-white">Enviar</button>
      </form>
    </section>
  )
}