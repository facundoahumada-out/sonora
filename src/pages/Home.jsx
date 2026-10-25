import { useState, useEffect } from "react";
import { Search, Heart, ListPlus, Play } from "lucide-react";
import Logo from "../components/Logo"

const sections = [
    { id: 'busqueda', name: 'Búsqueda'},
    { id: 'tendencias', name: 'Tendencias' },
    { id: 'novedades', name: 'Novedades'},
    { id: 'reciente', name: 'Recientes'},
]


export default function Home ({ user, isAdmin, onLoad, setCurrentSong, setPlaying }) {
    const [section, setSection] = useState('busqueda')
    const [songs, setSongs]= useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
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
    
    return (
        <div className="min-h-screen bg-white pb-24 text-sm text-neutral-900">
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

                {loading && (
                    <p className="py-10 text-center text-neutral-400">Cargando canciones…</p>
                )}
                {error && (
                    <p role="alert" className="py-10 text-center text-red-500">{error}</p>
                )}
                {!loading && !error && songs.length === 0 && (
                    <p className="py-10 text-center text-neutral-400">No hay canciones disponibles por ahora.</p>
                )}

                {section === 'busqueda' &&songs.map((tmp, i) => (
                    <div key={i}  onClick={()=>{setCurrentSong(tmp); setPlaying(true);}}className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-neutral-50">
                        <img src={tmp.cover_image} alt={tmp.title} className="h-10 w-10 rounded-md object-cover bg-neutral-100" />
                        <div>
                            <p className="font-medium">{tmp.title}</p>
                            <p className="text-xs text-neutral-400">{tmp.artist_name} · {tmp.album_name}</p>
                        </div>
                        <div className="ml-auto flex items-center gap-1 text-neutral-400">
                            <button className="rounded-md p-1.5 hover:text-red-500"><Heart size={16}></Heart></button>
                        </div>
                    </div>
                ))}
                {section === 'tendencias' && songs.map((tmp, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-neutral-50">
                        <img src={tmp.cover_image} alt={tmp.title} className="h-10 w-10 rounded-md object-cover bg-neutral-100" />
                        <div>
                            <p className="font-medium">{tmp.title}</p>
                            <p className="text-xs text-neutral-400">{tmp.artist_name}</p>
                        </div>
                        <div className="ml-auto flex items-center gap-1 text-neutral-400">
                            <div>{tmp.plays} reproducciones</div>
                        </div>
                    </div>
                ))}
                {section === 'novedades' && songs.map((tmp, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-neutral-50">
                        <img src={tmp.cover_image} alt={tmp.title} className="h-10 w-10 rounded-md object-cover bg-neutral-100"/>
                        <div>
                            <p className="font-medium">{tmp.title}</p>
                            <p className="text-xs text-neutral-400">{tmp.artist_name}</p>
                        </div>
                        <div className="ml-auto flex items-center gap-1 text-neutral-400">
                            <div>{tmp.year}</div>
                        </div>
                    </div>
                ))}
                {section === 'reciente' && songs.map((tmp, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-neutral-50">
                        <img src={tmp.cover_image} alt={tmp.title} className="h-10 w-10 rounded-md object-cover bg-neutral-100" />
                        <div>
                            <p className="font-medium">{tmp.title}</p>
                            <p className="text-xs text-neutral-400">{tmp.artist_name}</p>
                        </div>
                        <div className="ml-auto flex items-center gap-1 text-neutral-400">
                            <div>{tmp.time}</div>
                        </div>
                    </div>
                ))}
            </main>
        </div>
    )
}