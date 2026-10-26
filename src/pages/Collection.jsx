import { useState, useEffect } from "react";
import Navbar from "../components/Navbar"
import Tabs from "../components/Tabs";
import SongRow from "../components/SongRow";
import { toList, songCountText } from "../utils";

const sections = [
    { id: 'playlists', name: 'Playlists'},
    { id: 'favoritos', name: 'Favoritos' },
    { id: 'historial', name: 'Historial'},
]

export default function Collection ({ user, isAdmin, onLoad, currentSong, onPlaySong, history, likes, playlists, reloadPlaylists }) {
    const [section, setSection] = useState('playlists')
    const [newName, setNewName] = useState('')
    const [nameError, setNameError] = useState('')
    const [allSongs, setAllSongs] = useState([])
    const [openId, setOpenId] = useState(null)
    const openPlaylist=playlists.find(pl => pl._id === openId)
    useEffect(() => {
        if (!user) return;
        fetch('http://localhost:3000/songs')
            .then(res => res.json())
            .then(data => setAllSongs(toList(data)))
            .catch(() => setAllSongs([]))   ;
    }, [user]);

    const createPlaylist = async () => {
        const name =newName.trim();
        if (!name) {
            setNameError('El nombre de la playlist es requerido');
            return;
        }
        if(name.length>40){
            setNameError('El nombre de la playlist no puede superar los 40 caracteres');
            return;
        }
        setNameError('');
        setNewName('');

        const res = await fetch('http://localhost:3000/user/playlists', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, user_mail: user })
        });

        if (res.ok) {
            reloadPlaylists();
        }
    };

    const removeFromPlaylist = async (e, song) => {
        e.stopPropagation();
        await fetch('http://localhost:3000/user/playlists/remove-song', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ playlist_id: openPlaylist._id, song_id: song.id })
        });
        reloadPlaylists();
    };

   const favoriteSongs = allSongs.filter(song => likes.includes(String(song.id)))

    let openSongs = []
    if (openPlaylist) {
        openSongs = allSongs.filter(s => openPlaylist.songs.includes(s.id))
    }

    function isCurrent(song) {
        if (currentSong) {
            return currentSong.id === song.id;
        }
        return false;
    }

    function playedTime(date) {
        return date.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
    }

    return (
        <div className="min-h-screen bg-white pb-24 text-sm text-neutral-900">
            <Navbar user={user} active="collection" onLoad={onLoad}></Navbar>

            <main className="mx-auto w-full max-w-[720px] px-6 pt-16">
                <h1 className="mb-6 text-2xl font-semibold tracking-tight">Tu biblioteca</h1>

                <Tabs sections={sections} active={section} onChange={setSection} className="mb-5"></Tabs>

                {section === 'playlists' && openPlaylist && (
                    <div>
                        <button onClick={() => setOpenId(null)} className="cursor-pointer mb-4 text-neutral-500 hover:text-neutral-900">← Volver</button>
                        <h2 className="mb-3 text-lg font-semibold">{openPlaylist.name}</h2>
                        {openSongs.map(song => (
                            <SongRow key={song.id} song={song} active={isCurrent(song)} onPlay={() => onPlaySong(song, openSongs)}>
                                <button onClick={(e) => removeFromPlaylist(e, song)} className="cursor-pointer rounded-md p-1.5 hover:text-red-500">
                                    Quitar
                                </button>
                            </SongRow>
                        ))}
                    </div>
                )}

                {section === 'playlists' && !openPlaylist && (
                    <div>
                        <div className="mb-5 flex flex-wrap gap-2">
                            <form onSubmit={(e) => { e.preventDefault(); createPlaylist(); }} className="px-2 py-1">
                                <label className="text-xs text-neutral-500">Nombre de la playlist
                                    <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Nueva playlist" className="ml-2 rounded-md border border-neutral-200 px-2 py-1 text-sm outline-none focus:border-neutral-900"></input>
                                </label>
                            {nameError && <p className="mt-1 text-xs text-red-500">{nameError}</p>}
                            <button type="submit" className="cursor-pointer rounded-md bg-neutral-900 px-3 py-1 text-sm text-white hover:bg-neutral-700">Crear playlist</button>
                            </form>
                        </div>

                        {playlists.length === 0 && (
                            <p className="py-10 text-center text-neutral-400">Aún no tienes playlists.</p>
                        )}
                        {playlists.length > 0 && (
                            <div className="grid gap-3 sm:grid-cols-2">
                                {playlists.map((pl) => (
                                    <button key={pl._id} onClick={() => setOpenId(pl._id)} className="cursor-pointer text-left rounded-lg border border-neutral-100 p-4 shadow-sm hover:border-neutral-200">
                                        <p className="font-medium">{pl.name}</p>
                                        <p className="text-xs text-neutral-400">{songCountText(pl)}</p>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {section === 'favoritos' && (
                    <div>
                        {favoriteSongs.length === 0 && (
                            <p className="py-10 text-center text-neutral-400">Aún no tienes canciones favoritas.</p>
                        )}
                        {favoriteSongs.length > 0 && (
                            <div className="flex flex-col gap-1">
                                {favoriteSongs.map((song) => (
                                    <SongRow key={song.id} song={song} active={isCurrent(song)} onPlay={() => onPlaySong(song, favoriteSongs)}></SongRow>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {section === 'historial' && history.length === 0 && (
                    <p className="py-10 text-center text-neutral-400">Aún no has escuchado canciones.</p>
                )}
                {section === 'historial' && history.map((item) => (
                    <SongRow key={item.playedAt.getTime() + '-' + item.song.id} song={item.song} active={isCurrent(item.song)} onPlay={() => onPlaySong(item.song, [item.song])}>
                        <div>{playedTime(item.playedAt)}</div>
                    </SongRow>
                ))}
            </main>
        </div>
    )
}
