import { useState, useEffect } from "react";
import { Search, Heart } from "lucide-react";
import Navbar from "../components/Navbar"
import Tabs from "../components/Tabs";
import SongRow from "../components/SongRow";

const sections = [
    { id: 'busqueda', name: 'Búsqueda'},
    { id: 'tendencias', name: 'Tendencias' },
    { id: 'novedades', name: 'Novedades'},
    { id: 'reciente', name: 'Recientes'},
]

export default function Home ({ user, isAdmin, onLoad, currentSong, onPlaySong, history, likes, onToggleLike }) {
    const [section, setSection] = useState('busqueda')
    const [songs, setSongs]= useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [query, setQuery] = useState('');
    useEffect(()=>{
        fetch('http://localhost:3000/songs')
        .then(res=> {
            if (!res.ok) throw new Error('Respuesta ' + res.status);
            return res.json();
        })
        .then(data=>setSongs(data))
        .catch((err)=> {
            console.error('Error al cargar canciones', err);
            setError('No se pudieron cargar las canciones. Recarga la página para intentarlo de nuevo.');
        })
        .finally(()=>setLoading(false));
    }, []);
    
    const trending = [...songs].sort((a, b) => b.plays - a.plays).slice(0, 20);
    const newest = songs.filter((tmp) => tmp.release_date).sort((a, b) => b.release_date.localeCompare(a.release_date)).slice(0, 20);

    const search = query.trim().toLowerCase();
    const results = songs.filter((tmp) => {
        let genres = '';
        if (tmp.genres) {
            genres = tmp.genres.join(' ');
        }
        const text = (tmp.title + ' ' + tmp.artist_name + ' ' + tmp.album_name + ' ' + genres).toLowerCase();
        return text.includes(search);
    });

    function changeQuery(e) {
        setQuery(e.target.value);
        setSection('busqueda');
    }

    const recent = [];
    for (const item of history) {
        if (!recent.some((tmp) => tmp.id === item.song.id)) {
            recent.push(item.song);
        }
        if (recent.length === 10) {
            break;
        }
    }

    function play(song, list) {
        onPlaySong(song, list);
    }

    function isCurrent(song) {
        if (currentSong) {
            return currentSong.id === song.id;
        }
        return false;
    }

    function playsText(plays) {
        if (plays === 1) {
            return '1 reproducción';
        }
        return plays.toLocaleString('es-CL') + ' reproducciones';
    }

    return (
        <div className="min-h-screen bg-white pb-24 text-sm text-neutral-900">
            <Navbar user={user} active="home" onLoad={onLoad}></Navbar>

            <main className="mx-auto w-full max-w-[720px] px-6 pt-16">
                <h1 className="mb-4 text-2xl font-semibold tracking-tight">Hola, {user}</h1>

                <label className="flex h-11 items-center gap-3 rounded-lg border border-neutral-200 px-3 focus-within:border-neutral-900">
                    <Search size={16} className="text-neutral-400"></Search>
                    <input aria-label="Buscar canciones, álbumes, artistas o géneros" value={query} onChange={changeQuery} placeholder="Canciones, álbumes, artistas o géneros" className="flex-1 bg-transparent outline-none placeholder:text-neutral-400"></input>
                </label>

                <Tabs sections={sections} active={section} onChange={setSection} className="mt-7 mb-2"></Tabs>

                {loading && (
                    <p className="py-10 text-center text-neutral-400">Cargando canciones…</p>
                )}
                {error && (
                    <p role="alert" className="py-10 text-center text-red-500">{error}</p>
                )}
                {!loading && !error && songs.length === 0 && (
                    <p className="py-10 text-center text-neutral-400">No hay canciones disponibles por ahora.</p>
                )}

                {section === 'busqueda' && songs.length > 0 && results.length === 0 && (
                    <p className="py-10 text-center text-neutral-400">No hay canciones que coincidan con "{query.trim()}".</p>
                )}
                {section === 'busqueda' && results.map((tmp) => {
                    const isLiked = likes.includes(String(tmp.id));
                    let likeLabel = 'Agregar ' + tmp.title + ' a favoritos';
                    let likeClass = 'cursor-pointer rounded-md p-1.5 hover:text-red-500';
                    let likeFill = 'none';
                    if (isLiked) {
                        likeLabel = 'Quitar ' + tmp.title + ' de favoritos';
                        likeClass = 'cursor-pointer rounded-md p-1.5 text-red-500';
                        likeFill = 'currentColor';
                    }
                    return (
                        <SongRow key={tmp.id} song={tmp} subtitle={tmp.artist_name + ' · ' + tmp.album_name} active={isCurrent(tmp)} onPlay={() => play(tmp, results)}>
                        <button onClick={(e) => { e.stopPropagation(); onToggleLike(tmp.id) }} aria-label={likeLabel} aria-pressed={isLiked} className={likeClass}><Heart size={16} fill={likeFill}></Heart></button>
                        </SongRow>);
                })}
                {section === 'tendencias' && trending.map((tmp) => (
                    <SongRow key={tmp.id} song={tmp} active={isCurrent(tmp)} onPlay={() => play(tmp, trending)}>
                        <div>{playsText(tmp.plays)}</div>
                    </SongRow>
                ))}
                {section === 'novedades' && newest.map((tmp) => (
                    <SongRow key={tmp.id} song={tmp} active={isCurrent(tmp)} onPlay={() => play(tmp, newest)}>
                        <div>{new Date(tmp.release_date + 'T00:00:00').toLocaleDateString('es-CL', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                    </SongRow>
                ))}
                {section === 'reciente' && recent.length === 0 && (
                    <p className="py-10 text-center text-neutral-400">Aún no has escuchado canciones.</p>
                )}
                {section === 'reciente' && recent.map((tmp) => (
                    <SongRow key={tmp.id} song={tmp} active={isCurrent(tmp)} onPlay={() => play(tmp, recent)}></SongRow>
                ))}
            </main>
        </div>
    )
}