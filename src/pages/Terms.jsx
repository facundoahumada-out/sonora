import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Logo from "../components/Logo";

const terms = [
  { titulo: 'Proyecto educativo', texto: 'Sonora es una plataforma ficticia creada para el curso CIT2308 Desarrollo Web de la Universidad Diego Portales. No es un servicio comercial: no ofrece suscripciones, publicidad ni pagos.' },
  { titulo: 'Tu cuenta', texto: 'Para usar Sonora debes crear una cuenta con un nombre de usuario, un correo y una contraseña. Eres responsable de mantener tu contraseña en privado y de la actividad que se realice con tu cuenta.' },
  { titulo: 'Contenido musical', texto: 'Las canciones provienen de Jamendo y se publican bajo licencias. Solo puedes escucharlas dentro de la plataforma; no está permitido descargarlas ni redistribuirlas fuera de lo que indique su licencia.' },
  { titulo: 'Uso adecuado', texto: 'No uses Sonora para intentar acceder a cuentas ajenas, alterar el funcionamiento de la plataforma o publicar contenido ofensivo en nombres de usuario o playlists.' },
]

const privacy = [
  { titulo: 'Qué datos guardamos', texto: 'Tu nombre de usuario, tu correo, tu contraseña y los géneros musicales que eliges al registrarte.' },
  { titulo: 'Tu contraseña', texto: 'Se guarda cifrada. Nadie, ni siquiera el equipo del proyecto, puede leerla.' },
  { titulo: 'Tu sesión', texto: 'Al iniciar sesión, tu navegador guarda un código temporal para mantenerte conectado. Se borra al cerrar sesión y expira a las 2 horas.' },
  { titulo: 'Para qué los usamos', texto: 'Solo para que puedas entrar a tu cuenta y para mostrarte música según tus gustos. No compartimos tus datos con terceros ni los usamos con fines comerciales.' },
]

export default function Terms({ onReturn, onLogo }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-white text-sm text-neutral-900">
      <nav className="mx-auto flex h-16 w-full max-w-[880px] items-center px-6">
        <Logo onClick={onLogo}></Logo>
        <button onClick={onReturn} className="ml-auto flex items-center gap-1.5 text-neutral-500 hover:text-neutral-900">
          <ArrowLeft size={14}></ArrowLeft>Volver
        </button>
      </nav>

      <main className="mx-auto w-full max-w-[880px] flex-1 px-6 pb-16 pt-10">
        <h1 className="mb-2 text-4xl font-bold tracking-tight">Términos y privacidad</h1>
        <p className="mb-10 text-neutral-500">Última actualización: octubre de 2026</p>

        <section className="mb-12">
          <h2 className="mb-3 text-lg font-semibold">Términos de uso</h2>
          <div className="border-t border-neutral-100">
            {terms.map((t) => (
              <div key={t.titulo} className="grid gap-1 border-b border-neutral-100 py-4 md:grid-cols-[180px_1fr] md:gap-4">
                <span className="font-medium">{t.titulo}</span>
                <span className="text-neutral-500">{t.texto}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold">Privacidad</h2>
          <div className="border-t border-neutral-100">
            {privacy.map((p) => (
              <div key={p.titulo} className="grid gap-1 border-b border-neutral-100 py-4 md:grid-cols-[180px_1fr] md:gap-4">
                <span className="font-medium">{p.titulo}</span>
                <span className="text-neutral-500">{p.texto}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="mx-auto flex h-14 w-full max-w-[880px] items-center justify-between px-6 text-xs text-neutral-400">
        <span>© Sonora · Proyecto educativo CIT2308</span>
        <span>Términos · Privacidad</span>
      </footer>
    </div>
  )
}
