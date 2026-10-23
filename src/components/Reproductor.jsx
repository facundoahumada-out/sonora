import { useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, ListMusic, Volume2, Heart, ListPlus, Plus } from "lucide-react";

export default function Reproductor () {
    const [sonando, setSonando] = useState(false)
    const [cola, setCola] = useState(false)
    const [meGusta, setMeGusta] = useState(false)
    const [playlists, setPlaylists] = useState(false)

    return (
        <div>
            {cola && (
                <div>
                    <div onClick={() => setCola(false)} className="fixed inset-0 x-20 bg-black/20 md:hidden"></div>
                    <div className="fixed inset-x-2 bottom-[72px] z-30 rounded-2xl border border-neutral-100 bg-white p-2 text-sm shadow-xl md:inset-x-auto md:right-4 md:w-80 md:rounded-xl">
                        <div className="mx-auto mb-1 h-1 w-9 rounded-full bg-neutral-200 md:hidden"></div>
                        <div className="flex items-center justify-between px-2 py-1.5">
                            <span className="font-medium">A continuación</span>
                            <span className="text-xs text-neutral-400">0 canciones</span>
                        </div>
                        <p className="py-8 text-center text-neutral-400">La cola está vacía.</p>
                    </div>
                </div>
            )}

            {playlists && (
                <div>
                    <div onClick={() => setPlaylists(false)} className="fixed inset-0 z-20 bg-black/20 md:hidden"></div>
                    <div className="fixed inset-x-2 bottom-[72px] z-30 rounded-2xl border border-neutral-100 bg-white p-2 text-sm shadow-xl md:inset-x-auto md:left-4 md:w-72 md:rounded-xl">
                        <div className="mx-auto mb-1 h-1 w-9 rounded-full bg-neutral-200 md:hidden"></div>
                        <div className="px-2 py-1.5 font-medium">Agregar a playlist</div>
                        <button className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"><Plus size={14}></Plus>Nueva playlist</button>
                        <p className="py-6 text-center text-neutral-400">Aún no tienes playlists.</p>
                    </div>
                </div>
            )}

            <div className="fixed inset-x-0 bottom-0 z-30 flex h-16 items-center gap-3 border-t border-neutral-100 bg-white px-4 text-sm text-neutral-900">
                <div className="absolute inset-x-0 top-0 h-1 bg-neutral-100 md:hidden">
                    <div className="h-1 w-0 bg-neutral-900"></div>
                </div>

                <div className="flex flex-1 items-center gap-3">
                    <div className="h-10 w-10 rounded-md bg-neutral-100"></div>
                    <div>
                        <p className="font-medium">Nada sonando</p>
                        <p className="text-xs text-neutral-400">Elige una canción</p>
                    </div>

                    {meGusta && (
                        <button onClick={() => setMeGusta(false)} className="ml-2 text-red-400"><Heart size={14} fill="currentColor"></Heart></button>
                    )}
                    {!meGusta && (
                        <button onClick={() => setMeGusta(true)} className="ml-2 text-red-400 hover:text-red-400"><Heart size={14}></Heart></button>
                    )}
                    
                    {playlists && (
                        <button onClick={() => setPlaylists(false)} className="flex h-7 w-7 items-center justify-center rounded-md bg-neutral-100 text-neutral-900"><ListPlus size={14}></ListPlus></button>
                    )}
                    {!playlists && (
                        <button onClick={() => { setPlaylists(true); setCola(false) }} className="flex h-7 w-7 items-center justify-center rounded-md text-neutral-400 hover:text-neutral-900"><ListPlus size={14}></ListPlus></button>
                    )}
                </div>

                <div className="hidden flex-[2] flex-col items-center gap-1 md:flex">
                    <div className="flex items-center gap-5">
                        <button className="text-neutral-400 hover:text-neutral-900"><Shuffle size={14}></Shuffle></button>
                        <button className="hover:text-neutral-600"><SkipBack size={14} fill="currentColor"></SkipBack></button>
                        {sonando && (
                            <button onClick={() => setSonando(false)} className="flex items-center justify-center"><Pause size={16} fill="currentColor"></Pause></button>
                        )}
                        {!sonando && (
                            <button onClick={() => setSonando(true)} className="flex items-center justify-center"><Play size={16} fill="currentColor"></Play></button>
                        )}
                        <button className="hover:text-neutral-600"><SkipForward size={14} fill="currentColor"></SkipForward></button>
                        <button className="text-neutral-400 hover:text-neutral-900"><Repeat size={14}></Repeat></button>
                    </div>

                    <div className="flex w-full max-w-[420px] items-center gap-2 text-[10px] text-neutral-400">
                        <span>0:00</span>
                        <div className="h-1 flex-1 rounded-full bg-neutral-100">
                            <div className="h-1 w-0 rounded-full bg-neutral-900"></div>
                        </div>
                        <span>0:00</span>
                    </div>
                </div>

                <div className="flex flex-1 items-center justify-end gap-3 text-neutral-400">
                    {cola && (
                        <button onClick={() => setCola(false)} className="flex h-8 w-8 items-center justify-center rounded-md bg-neutral-100 text-neutral-900"><ListMusic size={14}></ListMusic></button>
                    )}
                    {!cola && (
                        <button onClick={() => { setCola(true); setPlaylists(false) }} className="flex h-8 w-8 items-center justify-center rounded-md hover:text-neutral-900"><ListMusic size={14}></ListMusic></button>
                    )}
                    <div className="hidden items-center gap-2 md:flex">
                        <Volume2 size={14}></Volume2>
                        <input type="range" min="0" max="100" defaultValue="70" className="w-24 accent-neutral-900" />
                    </div>
                    {sonando && (
                        <button onClick={() => setSonando(false)} className="flex h-9 w-9 items-center justify-center text-neutral-900 md:hidden"><Pause size={16} fill="currentColor"></Pause></button>
                    )}
                    {!sonando && (
                        <button onClick={() => setSonando(true)} className="flex h-9 w-9 items-center justify-center text-neutral-900 md:hidden"><Play size={16} fill="currentColor"></Play></button>
                    )}
                </div>
            </div>
        </div>
    )
}