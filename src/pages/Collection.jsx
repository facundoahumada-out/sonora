import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import Navbar from "../components/Navbar"
import Tabs from "../components/Tabs";

const sections = [
    { id: 'playlists', name: 'Playlists'},
    { id: 'favoritos', name: 'Favoritos' },
    { id: 'historial', name: 'Historial'},
]

export default function Collection ({ user, isAdmin, onLoad, currentSong, setPlaying, onSelectSong, likes, onToggleLike }) {
    const [section, setSection] = useState('playlists')
    const [playlists, setPlaylists] = useState([])
    const [allSongs, setAllSongs] = useState([])
    useEffect(() => {
        if (!user) return;
        fetch(`http://localhost:3000/user/playlists/${user}`)
            .then(res => res.json())
            .then(data => setPlaylists(Array.isArray(data) ? data : []))
            .catch(() => setPlaylists([]));


        fetch('http://localhost:3000/songs')
            .then(res => res.json())
            .then(data => setAllSongs(Array.isArray(data) ? data : []))
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
                .then(data => setPlaylists(Array.isArray(data) ? data : []));
        }
    };

   const favoriteSongs = allSongs.filter(song => likes.includes(String(song.id)))

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

                        {playlists.length === 0 ? (
                            <p className="py-10 text-center text-neutral-400">Aún no tienes playlists.</p>
                        ) : (
                            <div className="grid gap-3 sm:grid-cols-2">
                                {playlists.map((pl) => (
                                    <div key={pl._id} className="rounded-lg border border-neutral-100 p-4 shadow-sm hover:border-neutral-200">
                                        <p className="font-medium">{pl.name}</p>
                                        <p className="text-xs text-neutral-400">{pl.songs?.length || 0} canciones</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {section === 'favoritos' && (
                    <div>
                        {favoriteSongs.length === 0 ? (
                            <p className="py-10 text-center text-neutral-400">Aún no tienes canciones favoritas.</p>
                        ) : (
                            <div className="flex flex-col gap-1">
                                {favoriteSongs.map((song) => (
                                    <div 
                                        key={song.id} 
                                        onClick={() => { if(onSelectSong) onSelectSong(song); if(setPlaying) setPlaying(true); }}
                                        className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 hover:bg-neutral-50"
                                    >
                                        <img src={song.cover_image} alt={song.title} className="h-10 w-10 rounded-md object-cover bg-neutral-100" />
                                        <div>
                                            <p className="font-medium">{song.title}</p>
                                            <p className="text-xs text-neutral-400">{song.artist_name}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {section === 'historial' && (
                    <p className="py-10 text-center text-neutral-400">Aún no has escuchado canciones.</p>
                )}
            </main> 
        </div>
    )
}