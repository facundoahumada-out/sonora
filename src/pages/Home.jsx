import { useState } from "react";
import { Search} from "lucide-react";
import Logo from "../components/Logo"

const sections = [
    { id: 'parati', name: 'Para ti'},
    { id: 'tendencias', name: 'Tendencias' },
    { id: 'novedades', name: 'Novedades'},
    { id: 'reciente', name: 'Recientes'},
]

export default function Home ({ user, isAdmin, onLoad }) {
    const [section, setSection] = useState('parati')

    return (
        <div className="min-h-screen bg-white text-sm text-neutral-900">
            <nav className="flex h-16 items-center px-6">
                <Logo></Logo>
                <div className="ml-auto flex items-center gap-5">
                    <button onClick={() => onLoad('home')} className="font-medium">Inicio</button>
                    <button onClick={() => onLoad('collection')} className="text-neutral-500 hover:text-neutral-900">Biblioteca</button>
                    {isAdmin && (
                        <button onClick={() => onLoad('admin')}className="text-neutral-500 hover:text-neutral-900">Admin</button>
                    )}
                    <button onClick={() => onLoad('profile')} className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-100 text-xs font-semibold">
                        {user.charAt(0).toUpperCase()}
                    </button>
                </div>
            </nav>

            <main className="mx-auto w-full max-w-[720px] px-6 pt-16">
                <h1 className="mb-4 text-2xl font-semibold tracking-tight">Hola, {user}</h1>

                <label className="flex h-11 items-center gap-3 rounded-lg border border-neutral-200 px-3">
                    <Search size={16} className="text-neutral-400"></Search>
                    <input placeholder="Canciones, álbumes, artistas o géneros" className="flex-1 bg-transparent outline-none placeholder:text-neutral-400"></input>
                </label>

                <div className="mt-7 mb-2 flex gap-5 border-b border-neutral-100">
                    {sections.map((tmp) => {
                        if(tmp.id === section) {
                            return (
                                <button key={tmp.id} className="border-b-2 border-neutral-900 pb-2 font-medium">{tmp.name}</button>
                            )
                        } else {
                            return (
                                <button key={tmp.id} onClick={() => setSection(tmp.id)} className="pb-2 text-neutral-400 hover:text-neutral-900">{tmp.name}</button>
                            )
                        }
                    })}
                </div>

                <p className="py-10 text-center text-neutral-400">Renato conecta el backend jaja.</p>
            </main>
        </div>
    )
}