import { Camera, LogOut } from "lucide-react"
import Logo from "../components/Logo"

export default function Profile({ user, isAdmin, onLoad, onLogout }) {
    return (
        <div className="min-h-screen bg-white pb-24 text-sm text-neutral-900">
            <nav className="flex h-16 items-center px-6">
                <Logo onClick={() => onLoad('home')}></Logo>
                <div className="ml-auto flex items-center gap-5">
                    <button onClick={() => onLoad('home')} className="cursor-pointer text-neutral-500 hover:text-neutral-900">Inicio</button>
                    <button onClick={() => onLoad('collection')} className="cursor-pointer text-neutral-500 hover:text-neutral-900">Biblioteca</button>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-900 text-xs font-semibold text-white">
                        {user.charAt(0).toUpperCase()}
                    </span>
                </div>
            </nav>

            <main className="mx-auto w-full max-w-[460px] px-6 pt-16">
                <h1 className="mb-8 text-2xl font-semibold tracking-tight">Tu perfil</h1>

                <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
                    <label className="flex flex-col gap-1.5">
                        <span className="text-xs font-medium text-neutral-500">Nombre de usuario</span>
                        <input name="user" defaultValue={user} className="h-9 rounded-md border border-neutral-200 px-3 outline-none focus:border-neutral-900"></input>
                    </label>

                    <label className="flex flex-col gap-1.5">
                        <span className="text-xs font-medium text-neutral-500">Correo electrónico</span>
                        <input name="mail" type="email" placeholder="tu@correo.cl" className="h-9 rounded-md border border-neutral-200 px-3 outline-none placeholder:text-neutral-400 focus:border-neutral-900"></input>
                    </label>

                    <label className="flex flex-col gap-1.5">
                        <span className="text-xs font-medium text-neutral-500">Antigua contraseña</span>
                        <input name="oldpass" type="password" placeholder="********" className="h-9 rounded-md border border-neutral-200 px-3 outline-none placeholder:text-neutral-400 focus:border-neutral-900"></input>
                    </label>

                    <label className="flex flex-col gap-1.5">
                        <span className="text-xs font-medium text-neutral-500">Nueva contraseña</span>
                        <input name="newpass" type="password" placeholder="********" className="h-9 rounded-md border border-neutral-200 px-3 outline-none placeholder:text-neutral-400 focus:border-neutral-900"></input>
                    </label>

                    <button type="submit" className="cursor-pointer mt-2 h-9 self-start rounded-md bg-neutral-900 px-4 font-medium text-white">Guardar cambios</button>
                </form>

                <div className="mt-10 flex flex-col gap-1 border-t border-neutral-100 pt-6">
                    <button onClick={onLogout} className="cursor-pointer flex h-9 items-center gap-2 self-start rounded-md px-2 font-medium text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"><LogOut size={14}></LogOut>Cerrar sesión</button>
                    <button className="cursor-pointer flex h-9 items-center self-start rounded-md px-2 font-medium text-red-500 hover:bg-red-50">Eliminar cuenta</button>
                </div>
            </main>
        </div>
    )
}