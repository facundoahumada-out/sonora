import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, ListMusic, Volume2, Heart, ListPlus, Plus } from "lucide-react";

export default function Reproductor ({currentSong, playing, setPlaying}) {
    const [queue, setQueue] = useState(false)
    const [liked, setLiked] = useState(false)
    const [playlists, setPlaylists] = useState(false)
    const [controls, setControls] = useState(false)
    const audioRef=useRef(null);

    useEffect(() => {
        if(!audioRef.current) return;
        if (playing&&currentSong){
            audioRef.current.play();
        }
        else{
            audioRef.current.pause();
        }

    },[playing,currentSong]);
    return (
        <div>
            <audio ref={audioRef} src={currentSong?.audio_url}/>
            {queue && (
                <div>
                    <div onClick={() => setQueue(false)} className="fixed inset-0 z-20 bg-black/20 md:hidden"></div>
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

            {controls && (
                <div className="md:hidden">
                    <div onClick={() => setControls(false)} className="fixed inset-0 z-20 bg-black/20"></div>
                    <div className="fixed inset-x-2 bottom-[72px] z-30 rounded-2xl border border-neutral-100 bg-white px-4 pb-4 pt-2 text-sm shadow-xl">
                        <div className="mx-auto mb-3 h-1 w-9 rounded-full bg-neutral-200"></div>
                        <p className="text-center font-medium">{currentSong? currentSong.title: "Nada sonando"}</p>
                        
                        <p className="text-center text-xs text-neutral-400">{currentSong ? currentSong.artist_name : "Elige una canción"}</p>
                        <div className="mt-4 flex items-center gap-2 text-[10px] text-neutral-400">
                            <span>0:00</span>
                            <div className="h-1 flex-1 rounded-full bg-neutral-100">
                            <div className="h-1 w-0 rounded-full bg-neutral-900"></div>
                            </div>
                            <span>0:00</span>
                        </div>
                        <div className="mt-4 flex items-center justify-between px-4">
                            <button className="text-neutral-400"><Shuffle size={14}></Shuffle></button>
                            <button><SkipBack size={14} fill="currentColor"></SkipBack></button>

                            {playing && (
                                <button onClick={() => setPlaying(false)} className="flex h-12 w-12 items-center justify-center"><Pause size={16} fill="currentColor"></Pause></button>
                            )}
                            {!playing && (
                                <button onClick={() => setPlaying(true)} className="flex h-12 w-12 items-center justify-center"><Play size={16} fill="currentColor"></Play></button>
                            )}

                            <button><SkipForward size={14} fill="currentColor"></SkipForward></button>
                            <button className="text-neutral-400"><Repeat size={14}></Repeat></button>
                        </div>
                    </div>
                </div>
            )}

            <div className="fixed inset-x-0 bottom-0 z-30 flex h-16 items-center gap-3 border-t border-neutral-100 bg-white px-4 text-sm text-neutral-900">
                <div className="absolute inset-x-0 top-0 h-1 bg-neutral-100 md:hidden">
                    <div className="h-1 w-0 bg-neutral-900"></div>
                </div>

                <div className="flex flex-1 items-center gap-3">
                    <div className="h-10 w-10 rounded-md bg-neutral-100"></div>
                    <button onClick={() => {setControls(true); setQueue(false); setPlaylists(false)}} className="text-left md:pointer-events-none">
                        <p className="font-medium">{currentSong ? currentSong.title: "Nada sonando"}</p>
                        <p className="text-xs text-neutral-400">{currentSong ? currentSong.artist_name : "Elige una canción"}</p>
                    </button>

                    {liked && (
                        <button onClick={() => setLiked(false)} className="ml-2 text-red-400"><Heart size={14} fill="currentColor"></Heart></button>
                    )}
                    {!liked && (
                        <button onClick={() => setLiked(true)} className="ml-2 text-neutral-400 hover:text-red-400"><Heart size={14}></Heart></button>
                    )}
                    
                    {playlists && (
                        <button onClick={() => setPlaylists(false)} className="flex h-7 w-7 items-center justify-center rounded-md bg-neutral-100 text-neutral-900"><ListPlus size={14}></ListPlus></button>
                    )}
                    {!playlists && (
                        <button onClick={() => { setPlaylists(true); setQueue(false); setControls(false) }} className="flex h-7 w-7 items-center justify-center rounded-md text-neutral-400 hover:text-neutral-900"><ListPlus size={14}></ListPlus></button>
                    )}
                </div>

                <div className="hidden flex-[2] flex-col items-center gap-1 md:flex">
                    <div className="flex items-center gap-5">
                        <button className="text-neutral-400 hover:text-neutral-900"><Shuffle size={14}></Shuffle></button>
                        <button className="hover:text-neutral-600"><SkipBack size={14} fill="currentColor"></SkipBack></button>
                        {playing && (
                            <button onClick={() => setPlaying(false)} className="flex items-center justify-center"><Pause size={16} fill="currentColor"></Pause></button>
                        )}
                        {!playing && (
                            <button onClick={() => setPlaying(true)} className="flex items-center justify-center"><Play size={16} fill="currentColor"></Play></button>
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
                    {queue && (
                        <button onClick={() => setQueue(false)} className="flex h-8 w-8 items-center justify-center rounded-md bg-neutral-100 text-neutral-900"><ListMusic size={14}></ListMusic></button>
                    )}
                    {!queue && (
                        <button onClick={() => { setQueue(true); setPlaylists(false); setControls(false) }} className="flex h-8 w-8 items-center justify-center rounded-md hover:text-neutral-900"><ListMusic size={14}></ListMusic></button>
                    )}
                    <div className="hidden items-center gap-2 md:flex">
                        <Volume2 size={14}></Volume2>
                        <input type="range" min="0" max="100" defaultValue="70" className="w-24 accent-neutral-900" />
                    </div>
                    {playing && (
                        <button onClick={() => setPlaying(false)} className="flex h-9 w-9 items-center justify-center text-neutral-900 md:hidden"><Pause size={16} fill="currentColor"></Pause></button>
                    )}
                    {!playing && (
                        <button onClick={() => setPlaying(true)} className="flex h-9 w-9 items-center justify-center text-neutral-900 md:hidden"><Play size={16} fill="currentColor"></Play></button>
                    )}
                </div>
            </div>
        </div>
    )
}