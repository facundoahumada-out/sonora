import { useState } from "react";
import Logo from "../components/Logo";

const inputClase = 'h-9 w-full rounded-md border border-neutral-200 px-3 text-sm outline-none placeholder:text-neutral-400 focus:border-neutral-900'
const botonPrincipal = 'h-9 w-full rounded-md bg-neutral-900 font-medium text-white mt-4'

export default function Auth({ modoInicial, onVolver, onEntrar }) {
    const [modo, setModo] = useState(modoInicial)

    function enviar(e) {
        e.preventDefault()
        const datos = new FormData(e.target)

        // Provisional, Renato vincular backend de forma correcta
        if (modo === 'register') {
            onEntrar(datos.get('user'), true)
        } else {
            onEntrar(datos.get('mail').split('@')[0], false)
        }
    }

    if (modo === 'register') {
        return (
            <div className="relative flex min-h-screen items-center justify-center bg-white text-sm text-neutral-900">
                <div className="w-[300px]">
                    <button type="button" onClick={onVolver} aria-label="Volver al inicio" className="mb-7 block">
                        <Logo></Logo>
                    </button>
                    <h1 className="text-lg font-semibold">Crear cuenta en Sonora</h1>
                    <p className="mb-5 mt-1 text-neutral-500">Tu música sin interrupciones y justo donde la dejaste.</p>
                    <div className="mb-5 grid grid-cols-2 rounded-md bg-neutral-100 p-1">
                        <button type="button" onClick={() => setModo('login')} className="cursor-pointer h-7 rounded text-sm text-neutral-500">
                            Iniciar sesión
                        </button>
                        <button type="button" onClick={() => setModo('register')} className="cursor-pointer h-7 rounded bg-white text-sm font-medium text-neutral-900 shadow-sm ring-1 ring-neutral-200">
                            Registrarse
                        </button>
                    </div>
                    <form onSubmit={ enviar } className="flex flex-col gap-3">
                        <input name="user" required type="text" placeholder="Nombre de usuario" className={inputClase} />
                        <input name="mail" required type="email" placeholder="Correo electrónico" className={inputClase} />
                        <input name="pass" required type="password" placeholder="Contraseña (mín. 8 caracteres)" className={inputClase} />
                        <p className="flex h-5 items-center text-sm text-neutral-500">Al registrarte aceptas los <a href="#" className="text-neutral-900 underline px-1">Términos</a>.</p>
                        <button type="submit" className={botonPrincipal}>Crear cuenta</button>
                    </form>
                    
                    <p className="mt-4 h-[18px] text-xs text-neutral-500">
                        ¿Ya tienes cuenta?
                        <button type="button" onClick={() => setModo('login')} className="text-neutral-900 underline px-1">
                            Inicia sesión
                        </button>
                    </p>
                </div>

                <footer className="absolute inset-x-0 bottom-0 mx-auto flex h-14 w-full max-w-[880px] items-center justify-between px-6 text-xs text-neutral-400">
                    <span>© Sonora · Proyecto educativo CIT2308</span>
                    <span>Términos · Privacidad</span>
                </footer>
            </div>
        )
    } else if (modo === 'login') {
        return (
            <div className="relative flex min-h-screen items-center justify-center bg-white text-sm text-neutral-900">
                <div className="w-[300px]">
                    <button type="button" onClick={onVolver} aria-label="Volver al inicio" className="mb-7 block">
                        <Logo></Logo>
                    </button>
                    <h1 className="text-lg font-semibold">Entrar a Sonora</h1>
                    <p className="mb-5 mt-1 text-neutral-500">Tu música sin interrupciones y justo donde la dejaste.</p>
                    <div className="mb-5 grid grid-cols-2 rounded-md bg-neutral-100 p-1">
                        <button type="button" onClick={() => setModo('login')} className="cursor-pointer h-7 rounded bg-white text-sm font-medium text-neutral-900 shadow-sm ring-1 ring-neutral-200">
                            Iniciar sesión
                        </button>
                        <button type="button" onClick={() => setModo('register')} className="cursor-pointer h-7 rounded text-sm text-neutral-500">
                            Registrarse
                        </button>
                    </div>
                    <form onSubmit={ enviar } className="flex flex-col gap-3">
                        <input name="mail" type="email" placeholder="Correo electrónico" className={inputClase} />
                        <input name="pass" type="password" placeholder="Contraseña" className={inputClase} />
                        <p className="flex h-5 items-center justify-end text-sm text-neutral-500">
                            <a href="#" className="text-neutral-900 px-1">¿Olvidaste tu contraseña?</a>
                        </p>
                        <div className="h-9" aria-hidden="true"></div>
                        <button type="submit" className={botonPrincipal}>Iniciar sesión</button>
                    </form>
                    
                    <p className="mt-4 h-[18px] text-xs text-neutral-500">
                        ¿No tienes cuenta?
                        <button type="button" onClick={() => setModo('register')} className="text-neutral-900 underline px-1">
                            Regístrate
                        </button>
                    </p>
                </div>

                <footer className="absolute inset-x-0 bottom-0 mx-auto flex h-14 w-full max-w-[880px] items-center justify-between px-6 text-xs text-neutral-400">
                    <span>© Sonora · Proyecto educativo CIT2308</span>
                    <span>Términos · Privacidad</span>
                </footer>
            </div>
        )
    }
}