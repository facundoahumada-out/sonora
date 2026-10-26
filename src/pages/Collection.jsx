import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import Navbar from "../components/Navbar"
import Tabs from "../components/Tabs";
import SongRow from "../components/SongRow";
import { toList, songCount } from "../utils";

const sections = [
    { id: 'playlists', name: 'Playlists'},
    { id: 'favoritos', name: 'Favoritos' },
    { id: 'historial', name: 'Historial'},
]

export default function Collection ({ user, isAdmin, onLoad, currentSong, onPlaySong, history, likes, onToggleLike }) {
    const [section, setSection] = useState('playlists')
    const [playlists, setPlaylists] = useState([])
    const [allSongs, setAllSongs] = useState([])
    useEffect(() => {
        if (!user) return;
        fetch(`http://localhost:3000/user/playlists/${user}`)
            .then(res => res.json())
            .then(data => setPlaylists(toList(data)))
            .catch(() => setPlaylists([]));


        fetch('http://localhost:3000/songs')
            .then(res => res.json())
            .then(data => setAllSongs(toList(data)))
            .catch(() => setAllSongs([]))   ;
    }, [user]);

    const createPlaylist = async () => {
        const name = prompt("Nombre de la nueva playlist:");
        if (!name) return;

        const res = await fetch('http://localhost:3000/user/playlists', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, user_mail: user })
        });

        if (res.ok) {
            fetch(`http://localhost:3000/user/playlists/${user}`)
                .then(res => res.json())
                .then(data => setPlaylists(toList(data)));
        }
    };

   const favoriteSongs = allSongs.filter(song => likes.includes(String(song.id)))

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

                {section === 'playlists' && (
                    <div>
                        <div className="mb-5 flex flex-wrap gap-2">
                            <button onClick={createPlaylist} className="cursor-pointer flex h-8 items-center gap-1.5 rounded-md border border-dashed border-neutral-300 px-3 text-neutral-500 hover:text-neutral-900">
                            <Plus size={16} /> Nueva playlist
                            </button>
                        </div>

                        {playlists.length === 0 && (
                            <p className="py-10 text-center text-neutral-400">Aún no tienes playlists.</p>
                        )}
                        {playlists.length > 0 && (
                            <div className="grid gap-3 sm:grid-cols-2">
                                {playlists.map((pl) => (
                                    <div key={pl._id} className="rounded-lg border border-neutral-100 p-4 shadow-sm hover:border-neutral-200">
                                        <p className="font-medium">{pl.name}</p>
                                        <p className="text-xs text-neutral-400">{songCount(pl)} canciones</p>
                                    </div>
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