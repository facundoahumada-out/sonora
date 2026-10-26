import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, ListMusic, Volume2, VolumeX, Heart, ListPlus, Plus } from "lucide-react";
import SongCover from "./SongCover";
import { toList, songCount } from "../utils";

export default function Reproductor ({currentSong, playing, setPlaying, user, likes, onToggleLike}) {
    const [queue, setQueue] = useState(false)
    let liked = false
    let title = 'Nada sonando'
    let artist = 'Elige una canción'
    let audioUrl = undefined
    if (currentSong) {
        liked = likes.includes(String(currentSong.id))
        title = currentSong.title
        artist = currentSong.artist_name
        audioUrl = currentSong.audio_url
    }
    const [playlists, setPlaylists] = useState(false)
    const [controls, setControls] = useState(false)
    const audioRef=useRef(null);
    const [userPlaylists, setUserPlaylists] = useState([]);
    const [time, setTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(70);
    const [muted, setMuted] = useState(false);
    const silent = muted || volume === 0;

    let muteLabel = 'Silenciar';
    if (silent) {
        muteLabel = 'Activar sonido';
    }

    let shownVolume = volume;
    if (muted) {
        shownVolume = 0;
    }

    useEffect(() => {
        if (!audioRef.current) return;
        if (muted) {
            audioRef.current.volume = 0;
        } else {
            audioRef.current.volume = volume / 100;
        }
    }, [volume, muted]);

    function changeVolume(e) {
        setVolume(Number(e.target.value));
        setMuted(false);
    }

    function toggleMute() {
        if (volume === 0) {
            setVolume(70);
            setMuted(false);
        } else {
            setMuted(!muted);
        }
    }
    let progress = 0;
    if (duration) {
        progress = (time / duration) * 100;
    }

    function formatTime(seconds) {
        const total = Math.floor(seconds || 0);
        return Math.floor(total / 60) + ':' + String(total % 60).padStart(2, '0');
    }

    function seek(e) {
        const value = Number(e.target.value);
        audioRef.current.currentTime = value;
        setTime(value);
    }

    useEffect(() => {
        setTime(0);
        if (currentSong) {
            setDuration(currentSong.duration || 0);
        } else {
            setDuration(0);
        }
    }, [currentSong]);

    useEffect(() => {
        if(!audioRef.current) return;
        if (playing&&currentSong){
            audioRef.current.play();
        }
        else{
            audioRef.current.pause();
        }

    },[playing,currentSong]);

    useEffect(() => {
        function handleSpace(e) {
            if (e.code !== 'Space' || e.repeat || !currentSong) return;
            if (e.target.closest('input, textarea, select, button, [contenteditable="true"]')) return;
            e.preventDefault();
            setPlaying(!playing);
        }
        window.addEventListener('keydown', handleSpace);
        return () => window.removeEventListener('keydown', handleSpace);
    }, [currentSong, playing, setPlaying]);


    useEffect(() => {
        if (playlists && user) {
            fetch(`http://localhost:3000/user/playlists/${user}`)
                .then(res => res.json())
                .then(data => setUserPlaylists(toList(data)));
        }
    }, [playlists, user]);

    const addToPlaylist = async (playlistId) => {
        if (!currentSong) return;
        await fetch('http://localhost:3000/user/playlists/add-song', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ playlist_id: playlistId, song_id: currentSong.id })
        });
        setPlaylists(false);
    };

    const createPlaylist = async () => {
        const name = prompt("Nombre de la nueva playlist:");
        if (!name || !user) return;

        const res = await fetch('http://localhost:3000/user/playlists', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, user_mail: user })
        });

        if (res.ok) {
            fetch(`http://localhost:3000/user/playlists/${user}`)
                .then(res => res.json())
                .then(data => setUserPlaylists(toList(data)));
        }
    };
    return (
        <div>
            <audio ref={audioRef} src={audioUrl}onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)} onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)} onEnded={() => setPlaying(false)}/>
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
                        <button onClick={createPlaylist} className="cursor-pointer flex w-full items-center gap-2 rounded-md px-2 py-2 text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"><Plus size={14}></Plus>Nueva playlist</button>
                        {userPlaylists.length === 0 && (
                            <p className="py-6 text-center text-neutral-400">Aún no tienes playlists.</p>
                        )}
                        {userPlaylists.length > 0 && (
                            <div className="mt-1 flex flex-col gap-1 max-h-48 overflow-y-auto">
                                {userPlaylists.map(pl => (
                                    <button key={pl._id} onClick={() => addToPlaylist(pl._id)} className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left hover:bg-neutral-50">
                                        <span className="font-medium">{pl.name}</span>
                                        <span className="text-xs text-neutral-400">{songCount(pl)} p.</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {controls && (
                <div className="md:hidden">
                    <div onClick={() => setControls(false)} className="fixed inset-0 z-20 bg-black/20"></div>
                    <div className="fixed inset-x-2 bottom-[72px] z-30 rounded-2xl border border-neutral-100 bg-white px-4 pb-4 pt-2 text-sm shadow-xl">
                        <div className="mx-auto mb-3 h-1 w-9 rounded-full bg-neutral-200"></div>
                        <p className="text-center font-medium">{title}</p>
                        
                        <p className="text-center text-xs text-neutral-400">{artist}</p>
                        <div className="mt-4 flex items-center gap-2 text-[10px] text-neutral-400">
                            <span>{formatTime(time)}</span>
                            <input type="range" aria-label="Progreso de la canción" min="0" max={duration || 0} step="any" value={time} onChange={seek} disabled={!currentSong} className="h-1 flex-1 cursor-pointer accent-neutral-900 disabled:cursor-default" />
                            <span>{formatTime(duration)}</span>
                        </div>
                        <div className="mt-4 flex items-center justify-between px-4">
                            <button aria-label="Reproducción aleatoria" className="cursor-pointer text-neutral-400"><Shuffle size={14}></Shuffle></button>
                            <button aria-label="Canción anterior" className="cursor-pointer"><SkipBack size={14} fill="currentColor"></SkipBack></button>

                            {playing && (
                                <button aria-label="Pausar" onClick={() => setPlaying(false)} className="cursor-pointer flex h-12 w-12 items-center justify-center"><Pause size={16} fill="currentColor"></Pause></button>
                            )}
                            {!playing && (
                                <button aria-label="Reproducir" onClick={() => setPlaying(true)} className="cursor-pointer flex h-12 w-12 items-center justify-center"><Play size={16} fill="currentColor"></Play></button>
                            )}

                            <button aria-label="Canción siguiente" className="cursor-pointer"><SkipForward size={14} fill="currentColor"></SkipForward></button>
                            <button aria-label="Repetir" className="cursor-pointer text-neutral-400"><Repeat size={14}></Repeat></button>
                        </div>
                    </div>
                </div>
            )}

            <div className="fixed inset-x-0 bottom-0 z-30 flex h-16 items-center gap-3 border-t border-neutral-100 bg-white px-4 text-sm text-neutral-900">
                <div className="absolute inset-x-0 top-0 h-1 bg-neutral-100 md:hidden">
                    <div className="h-1 bg-neutral-900" style={{ width: progress + '%' }}></div>
                </div>

                <div className="flex flex-1 items-center gap-3">
                    {currentSong && (
                        <SongCover song={currentSong}></SongCover>
                    )}
                    {!currentSong && (
                        <div className="h-10 w-10 rounded-md bg-neutral-100"></div>
                    )}
                    <button onClick={() => {setControls(true); setQueue(false); setPlaylists(false)}} className="cursor-pointer text-left md:pointer-events-none">
                        <p className="font-medium">{title}</p>
                        <p className="text-xs text-neutral-400">{artist}</p>
                    </button>

                    {liked && (
                        <button aria-label="Quitar de favoritos" onClick={() => currentSong&&onToggleLike(currentSong.id)} className="cursor-pointer ml-2 text-red-400"><Heart size={14} fill="currentColor"></Heart></button>
                    )}
                    {!liked && (
                        <button aria-label="Agregar a favoritos" onClick={() => currentSong&&onToggleLike(currentSong.id)} className="cursor-pointer ml-2 text-neutral-400 hover:text-red-400"><Heart size={14}></Heart></button>
                    )}
                    
                    {playlists && (
                        <button aria-label="Cerrar panel de playlists" onClick={() => setPlaylists(false)} className="cursor-pointer flex h-7 w-7 items-center justify-center rounded-md bg-neutral-100 text-neutral-900"><ListPlus size={14}></ListPlus></button>
                    )}
                    {!playlists && (
                        <button aria-label="Agregar a playlist" onClick={() => { setPlaylists(true); setQueue(false); setControls(false) }} className="cursor-pointer flex h-7 w-7 items-center justify-center rounded-md text-neutral-400 hover:text-neutral-900"><ListPlus size={14}></ListPlus></button>
                    )}
                </div>

                <div className="hidden flex-[2] flex-col items-center gap-1 md:flex">
                    <div className="flex items-center gap-5">
                        <button aria-label="Reproducción aleatoria" className="cursor-pointer text-neutral-400 hover:text-neutral-900"><Shuffle size={14}></Shuffle></button>
                        <button aria-label="Canción anterior" className="cursor-pointer hover:text-neutral-600"><SkipBack size={14} fill="currentColor"></SkipBack></button>
                        {playing && (
                            <button aria-label="Pausar" onClick={() => setPlaying(false)} className="cursor-pointer flex items-center justify-center"><Pause size={16} fill="currentColor"></Pause></button>
                        )}
                        {!playing && (
                            <button aria-label="Reproducir" onClick={() => setPlaying(true)} className="cursor-pointer flex items-center justify-center"><Play size={16} fill="currentColor"></Play></button>
                        )}
                        <button aria-label="Canción siguiente" className="cursor-pointer hover:text-neutral-600"><SkipForward size={14} fill="currentColor"></SkipForward></button>
                        <button aria-label="Repetir" className="cursor-pointer text-neutral-400 hover:text-neutral-900"><Repeat size={14}></Repeat></button>
                    </div>

                    <div className="flex w-full max-w-[420px] items-center gap-2 text-[10px] text-neutral-400">
                        <span>{formatTime(time)}</span>
                        <input type="range" aria-label="Progreso de la canción" min="0" max={duration || 0} step="any" value={time} onChange={seek} disabled={!currentSong} className="h-1 flex-1 cursor-pointer accent-neutral-900 disabled:cursor-default" />
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>

                <div className="flex flex-1 items-center justify-end gap-3 text-neutral-400">
                    {queue && (
                        <button aria-label="Cerrar cola de reproducción" onClick={() => setQueue(false)} className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-md bg-neutral-100 text-neutral-900"><ListMusic size={14}></ListMusic></button>
                    )}
                    {!queue && (
                        <button aria-label="Ver cola de reproducción" onClick={() => { setQueue(true); setPlaylists(false); setControls(false) }} className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-md hover:text-neutral-900"><ListMusic size={14}></ListMusic></button>
                    )}
                    <div className="hidden items-center gap-2 md:flex">
                        <button aria-label={muteLabel} onClick={toggleMute} className="cursor-pointer hover:text-neutral-900">
                            {silent && <VolumeX size={14}></VolumeX>}
                            {!silent && <Volume2 size={14}></Volume2>}
                        </button>
                        <input aria-label="Volumen" type="range" min="0" max="100" value={shownVolume} onChange={changeVolume} className="w-24 cursor-pointer accent-neutral-900" />
                    </div>
                    {playing && (
                        <button aria-label="Pausar" onClick={() => setPlaying(false)} className="cursor-pointer flex h-9 w-9 items-center justify-center text-neutral-900 md:hidden"><Pause size={16} fill="currentColor"></Pause></button>
                    )}
                    {!playing && (
                        <button aria-label="Reproducir" onClick={() => setPlaying(true)} className="cursor-pointer flex h-9 w-9 items-center justify-center text-neutral-900 md:hidden"><Play size={16} fill="currentColor"></Play></button>
                    )}
                </div>
            </div>
        </div>
    )
}