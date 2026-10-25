import { useState } from "react";
import { Plus } from "lucide-react";
import Logo from "../components/Logo"

const sections = [
    { id: 'playlists', name: 'Playlists'},
    { id: 'favoritos', name: 'Favoritos' },
    { id: 'historial', name: 'Historial'},
]

export default function Collection ({ user, isAdmin, onLoad }) {
    const [section, setSection] = useState('playlists')

    return (
        <div className="min-h-screen bg-white pb-24 text-sm text-neutral-900">
            <nav className="flex h-16 items-center px-6">
                <Logo></Logo>
                <div className="ml-auto flex items-center gap-5">
                    <button onClick={() => onLoad('home')} className="text-neutral-500 hover:text-neutral-900">Inicio</button>
                    <button onClick={() => onLoad('collection')} className="font-medium">Biblioteca</button>
                    {isAdmin && (
                        <button onClick={() => onLoad('admin')}className="text-neutral-500 hover:text-neutral-900">Admin</button>
                    )}
                    <button onClick={() => onLoad('profile')} className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-100 text-xs font-semibold">
                        {user.charAt(0).toUpperCase()}
                    </button>
                </div>
            </nav>

            <main className="mx-auto w-full max-w-[720px] px-6 pt-16">
                <h1 className="mb-6 text-2xl font-semibold tracking-tight">Tu biblioteca</h1>

                <div className="mb-5 flex gap-5 border-b border-neutral-100">
                    {sections.map((tmp) => {
                        if (tmp.id === section) {
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

                {section === 'playlists' && (
                    <div>
                        <div className="mb-5 flex flex-wrap gap-2">
                            <button className="flex h-8 items-center gap-1.5 rounded-md border border-dashed border-neutral-300 px-3 text-neutral-500 hover:text-neutral-900">
                                <Plus size={16} /> Nueva Playlist
                            </button>
                        </div>
                        <p className="py-10 text-center text-neutral-400">Renato conecta API para playlists, please.</p>
                    </div>
                )}

                {section === 'favoritos' && (
                    <p className="py-10 text-center text-neutral-400">Renato hacer función de favoritos, please.</p>
                )}

                {section === 'historial' && (
                    <p className="py-10 text-center text-neutral-400">Renato hacer función de historial, please..</p>
                )}
            </main> 
        </div>
    )
}