import { useState, useEffect } from "react";
import { Tag, Guitar, Sparkles, Disc3, Zap, Piano, MicVocal, Coffee, Music, Flame, Moon, ArrowRight } from "lucide-react";
import Logo from "../components/Logo";

const genres = [
    { name: 'Rock', icon: <Guitar size={16} />, color: 'bg-orange-50 text-orange-700 ring-orange-200' },
    { name: 'Pop', icon: <Sparkles size={16} />, color: 'bg-pink-50 text-pink-700 ring-pink-200' },
    { name: 'Indie', icon: <Disc3 size={16} />, color: 'bg-violet-50 text-violet-700 ring-violet-200' },
    { name: 'Electrónica', icon: <Zap size={16} />, color: 'bg-sky-50 text-sky-700 ring-sky-200' },
    { name: 'Jazz', icon: <Piano size={16} />, color: 'bg-amber-50 text-amber-700 ring-amber-200' },
    { name: 'Hip-hop', icon: <MicVocal size={16} />, color: 'bg-blue-100 text-blue-700 ring-blue-300' },
    { name: 'Lo-fi', icon: <Coffee size={16} />, color: 'bg-emerald-50 text-emerald-700 ring-emerald-200' },
    { name: 'Clásica', icon: <Music size={16} />, color: 'bg-stone-100 text-stone-700 ring-stone-300' },
    { name: 'Reggaetón', icon: <Flame size={16} />, color: 'bg-red-50 text-red-700 ring-red-200' },
    { name: 'Ambient', icon: <Moon size={16} />, color: 'bg-indigo-50 text-indigo-700 ring-indigo-200' },
]

export default function Welcome({ user, isNew, onContinue }) {
    const [chosen, setChosen] = useState([])

    useEffect(() => {
        if(isNew === false) {
            const timer = setTimeout(() => {
                onContinue([])
            }, 2000)

            return () => clearTimeout(timer)
        }
    }, [])

    function alternate(name) {
        if (chosen.includes(name)) {
            setChosen(chosen.filter((tmp) => tmp !== name))
        } else {
            // Nota para Renato: Los (...) hace que se acumulen los géneros elegidos.
            setChosen([...chosen, name])
        }
    }
    async function save(){
        const response=await fetch('http://localhost:3000/user/preferences', {
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json','Authorization': 'Bearer '+localStorage.getItem('token')},
                body: JSON.stringify({genres: chosen})});
            if (response.ok){
                onContinue(chosen);
            }else{
                console.error('No se pudieron guardar los géneros')
            }
        }
    

    if (isNew) {
        return (
            <div className="relative flex min-h-screen flex-col items-center justify-center bg-neutral-50 text-sm text-neutral-900">
                <div className="absolute left-6 top-5">
                    <Logo></Logo>
                </div>
                <div className="flex items-center gap-5">
                    <h1 className="text-5xl font-bold tracking-tighter">Hola,</h1>
                    <span className="rounded-2xl border-2 border-dashed border-blue-500 px-5 py-2 text-2xl font-medium text-blue-600">{user}</span>
                </div>

                <div className="mt-12 w-full max-w-[560px] rounded-2xl border border-neutral-200 bg-white">
                    <div className="flex items-center gap-2 border-b border-neutral-200 px-5 py-3 text-neutral-500">
                        <Tag size={16}></Tag>
                        ¿Qué te gusta escuchar?
                    </div>

                    <div className="flex flex-wrap gap-2 p-5">
                        {genres.map((tmp) => {
                            if (chosen.includes(tmp.name)) {
                                return (
                                    <button key={tmp.name} onClick={() => alternate(tmp.name)} className={'flex h-9 items-center gap-2 rounded-lg px-3 font-medium ring-1 ' + tmp.color}>
                                        {tmp.icon} {tmp.name}
                                    </button>
                                )
                            } else {
                                return (
                                    <button key={tmp.name} onClick={() => alternate(tmp.name)} className="flex h-9 items-center gap-2 rounded-lg px-3 font-medium text-neutral-500 ring-1 ring-neutral-200">
                                        {tmp.icon} {tmp.name}
                                    </button>
                                )
                            }
                        })}
                    </div>

                    <div className="flex items-center justify-between border-t border-neutral-100 px-5 py-3">
                        <span className="text-xs text-neutral-500">{chosen.length} de 3 mínimo</span>
                        <button disabled={chosen.length < 3} onClick={save} className="flex h-8 items-center gap-2 rounded-md bg-neutral-900 px-4 font-medium text-white disabled:opacity-30">
                        Continuar <ArrowRight size={16}></ArrowRight>
                        </button>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="relative flex min-h-screen flex-col items-center justify-center bg-neutral-50 text-sm text-neutral-900">
                <div className="absolute left-6 top-5">
                    <Logo></Logo>
                </div>

                <div className="flex items-center gap-5">
                    <h1 className="text-6xl font-bold tracking-tighter">Hola,</h1>
                    <span className="rounded-2xl border-2 border-dashed border-blue-500 px-5 py-2 text-2xl font-medium text-blue-600">{user}</span>
                </div>
            </div>
        )
    }
}