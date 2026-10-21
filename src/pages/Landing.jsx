import Logo from "../components/Logo";

const funciones = [
  { titulo: 'Busca', texto: 'Canciones, artistas y álbumes en una sola barra.' },
  { titulo: 'Organiza', texto: 'Crea listas para cada momento de tu día.' },
  { titulo: 'Continúa', texto: 'Tu última canción te espera cada vez que entras.' }
]

export default function Landing( {onLogin, onRegister} ) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-[13px] text-neutral-900">
      <nav className="mx-auto flex h-16 w-full max-w-[880px] items-center px-6">
        <Logo></Logo>
        <div className="ml-auto flex items-center gap-5">
          <button onClick={ onLogin } className="cursor-pointer text-sm text-neutral-500 hover:text-neutral-900">Iniciar sesión</button>
          <button onClick={ onRegister } className="cursor-pointer h-8 rounded-md bg-neutral-900 text-white px-4 font-medium text-sm">Registrarse</button>
        </div>
      </nav>

      <main className="mx-auto flex w-full max-w-[880px] flex-1 flex-col justify-center px-6">
        <section className="pb-16 pt-10">
          <h1 className="mb-2 text-4xl font-bold tracking-tight">Sonora</h1>
          <p className="mb-6 max-w-[300px] text-sm text-neutral-500">Un reproductor de música simple. Escucha, ordena y guarda tus canciones desde el navegador.</p>
          <div className="flex gap-2">
            <button onClick={ onRegister } className="cursor-pointer h-8 rounded-md bg-neutral-900 text-white px-4 font-medium text-sm">Crear cuenta</button>
            <button onClick={ onLogin } className="cursor-pointer h-8 rounded-md border border-neutral-200 px-3.5 font-medium text-sm">Iniciar sesión</button>
          </div>
        </section>
        <section className="border-t border-neutral-100">
          { funciones.map((f) => (
            <div key={f.titulo} className="grid grid-cols-[100px_1fr] border-b border-neutral-100 py-4">
              <span className="font-medium text-base">{f.titulo}</span>
              <span className="text-neutral-500 text-base">{f.texto}</span>
            </div>
          ))}
        </section>
      </main>

      <footer className="mx-auto flex h-14 w-full max-w-[880px] items-center justify-between px-6 text-xs text-neutral-400">
        <span className="text-xs text-neutral-400 cursor-pointer">© Sonora · Proyecto educativo CIT2308</span>
        <span className="text-xs text-neutral-400 cursor-pointer">Términos · Privacidad</span>
      </footer>
    </div>
  )
}