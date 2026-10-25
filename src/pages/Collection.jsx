import { useState } from "react";
import { Plus } from "lucide-react";
import Navbar from "../components/Navbar"
import Tabs from "../components/Tabs";

const sections = [
    { id: 'playlists', name: 'Playlists'},
    { id: 'favoritos', name: 'Favoritos' },
    { id: 'historial', name: 'Historial'},
]

export default function Collection ({ user, isAdmin, onLoad }) {
    const [section, setSection] = useState('playlists')

    return (
        <div className="min-h-screen bg-white pb-24 text-sm text-neutral-900">
            <Navbar user={user} active="collection" onLoad={onLoad}></Navbar>

            <main className="mx-auto w-full max-w-[720px] px-6 pt-16">
                <h1 className="mb-6 text-2xl font-semibold tracking-tight">Tu biblioteca</h1>

                <Tabs sections={sections} active={section} onChange={setSection} className="mb-5"></Tabs>

                {section === 'playlists' && (
                    <div>
                        <div className="mb-5 flex flex-wrap gap-2">
                            <button className="cursor-pointer flex h-8 items-center gap-1.5 rounded-md border border-dashed border-neutral-300 px-3 text-neutral-500 hover:text-neutral-900">
                                <Plus size={16} /> Nueva playlist
                            </button>
                        </div>
                        <p className="py-10 text-center text-neutral-400">Aún no tienes playlists.</p>
                    </div>
                )}

                {section === 'favoritos' && (
                    <p className="py-10 text-center text-neutral-400">Aún no tienes canciones favoritas.</p>
                )}

                {section === 'historial' && (
                    <p className="py-10 text-center text-neutral-400">Aún no has escuchado canciones.</p>
                )}
            </main> 
        </div>
    )
}