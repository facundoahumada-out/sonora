import { useState } from "react";
import Logo from "../components/Logo";

const inputClase = 'h-9 w-full rounded-md border border-neutral-200 px-3 text-sm outline-none placeholder:text-neutral-400 focus:border-neutral-900'
const botonPrincipal = 'h-9 w-full rounded-md bg-neutral-900 font-medium text-white mt-4 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50'

export default function Auth({ startingMode, onReturn, onEnter, onTerms}) {
    const [mode, setMode] = useState(startingMode)
    const [error, setError ]= useState('');
    const [loading, setLoading]= useState(false);
    async function send(e) {
        e.preventDefault();
        setError('');
        setLoading(true);
        const data = new FormData(e.target);
        const name=data.get('user');
        const mail=data.get('mail');
        const password=data.get('pass');
        
        if (mode === 'register') {
            try{
                const response=await fetch('http://localhost:3000/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ mail, password, rol: 'Oyente', name })
                });
                const data=await response.json();
                if (response.ok) {
                    localStorage.setItem('token', data.token);
                    onEnter(name, true);
                } else {
                    setError(data.error || 'Error durante el registro');
                }
            }
            catch(error){
                console.error ('Error durante el registro', error);
                setError('No se pudo conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.');
            } 
            finally{
                setLoading(false);
            }
        } else {
            try{
                const response=await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mail, password })
            });
            
            const data=await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                onEnter(data.name, false);
            } else {
                setError(data.error || 'Credenciales incorrectas');
            }
        } catch (error) {
            console.error('Error durante el login', error);
            setError('No se pudo conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.');
        } 
        finally {
            setLoading(false);
        }
            }
            
        }
    

    if (mode === 'register') {
        return (
            <div className="relative flex min-h-screen items-center justify-center bg-white text-sm text-neutral-900">
                <div className="w-[300px]">
                    <button type="button" onClick={onReturn} aria-label="Volver al inicio" className="mb-7 block cursor-pointer">
                        <Logo></Logo>
                    </button>
                    <h1 className="text-lg font-semibold">Crear cuenta en Sonora</h1>
                    <p className="mb-5 mt-1 text-neutral-500">Tu música sin interrupciones y justo donde la dejaste.</p>
                    <div className="mb-5 grid grid-cols-2 rounded-md bg-neutral-100 p-1">
                        <button type="button" onClick={() => setMode('login')} className="cursor-pointer h-7 rounded text-sm text-neutral-500">
                            Iniciar sesión
                        </button>
                        <button type="button" onClick={() => setMode('register')} className="cursor-pointer h-7 rounded bg-white text-sm font-medium text-neutral-900 shadow-sm ring-1 ring-neutral-200">
                            Registrarse
                        </button>
                    </div>
                    <form onSubmit={ send } className="flex flex-col gap-3">
                        <label className="flex flex-col gap-1.5">
                            <span className="text-xs font-medium text-neutral-500">Nombre de usuario</span>
                            <input name="user" required type="text" autoComplete="username" placeholder="Ej: marin" className={inputClase} />
                        </label>
                        <label className="flex flex-col gap-1.5">
                            <span className="text-xs font-medium text-neutral-500">Correo electrónico</span>
                            <input name="mail" required type="email" autoComplete="email" placeholder="tu@correo.cl" className={inputClase} />
                        </label>
                        <label className="flex flex-col gap-1.5">
                            <span className="text-xs font-medium text-neutral-500">Contraseña</span>
                            <input name="pass" required minLength={8} type="password" autoComplete="new-password" placeholder="Mínimo 8 caracteres" className={inputClase} />
                        </label>
                        <p className="flex h-5 items-center text-sm text-neutral-500">Al registrarte aceptas los <button type="button" onClick={onTerms} className="cursor-pointer text-neutral-900 underline px-1">Términos</button>.</p>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                        <button type="submit" disabled={loading} className={botonPrincipal}>{loading ? 'Creando cuenta…' : 'Crear cuenta'}</button>
                    </form>
                    
                    <p className="mt-4 h-[18px] text-xs text-neutral-500">
                        ¿Ya tienes cuenta?
                        <button type="button" onClick={() => setMode('login')} className="cursor-pointer text-neutral-900 underline px-1">
                            Inicia sesión
                        </button>
                    </p>
                </div>

                <footer className="absolute inset-x-0 bottom-0 mx-auto flex h-14 w-full max-w-[880px] items-center justify-between px-6 text-xs text-neutral-400">
                    <span>© Sonora · Proyecto educativo CIT2308</span>
                    <button type="button" onClick={onTerms} className="cursor-pointer hover:text-neutral-900">Términos · Privacidad</button>
                </footer>
            </div>
        )
    } else if (mode === 'login') {
        return (
            <div className="relative flex min-h-screen items-center justify-center bg-white text-sm text-neutral-900">
                <div className="w-[300px]">
                    <button type="button" onClick={onReturn} aria-label="Volver al inicio" className="mb-7 block cursor-pointer">
                        <Logo></Logo>
                    </button>
                    <h1 className="text-lg font-semibold">Entrar a Sonora</h1>
                    <p className="mb-5 mt-1 text-neutral-500">Tu música sin interrupciones y justo donde la dejaste.</p>
                    <div className="mb-5 grid grid-cols-2 rounded-md bg-neutral-100 p-1">
                        <button type="button" onClick={() => setMode('login')} className="cursor-pointer h-7 rounded bg-white text-sm font-medium text-neutral-900 shadow-sm ring-1 ring-neutral-200">
                            Iniciar sesión
                        </button>
                        <button type="button" onClick={() => setMode('register')} className="cursor-pointer h-7 rounded text-sm text-neutral-500">
                            Registrarse
                        </button>
                    </div>
                    <form onSubmit={ send } className="flex flex-col gap-3">
                        <label className="flex flex-col gap-1.5">
                            <span className="text-xs font-medium text-neutral-500">Correo electrónico</span>
                            <input name="mail" required type="email" autoComplete="email" placeholder="tu@correo.cl" className={inputClase} />
                        </label>
                        <label className="flex flex-col gap-1.5">
                            <span className="text-xs font-medium text-neutral-500">Contraseña</span>
                            <input name="pass" required type="password" autoComplete="current-password" placeholder="********" className={inputClase} />
                        </label>
                        <div className="h-5" aria-hidden="true"></div>
                        <div className="h-[58px]" aria-hidden="true"></div>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                        <button type="submit" disabled={loading} className={botonPrincipal}>{loading ? 'Entrando…' : 'Iniciar sesión'}</button>
                    </form>
                    
                    <p className="mt-4 h-[18px] text-xs text-neutral-500">
                        ¿No tienes cuenta?
                        <button type="button" onClick={() => setMode('register')} className="cursor-pointer text-neutral-900 underline px-1">
                            Regístrate
                        </button>
                    </p>
                </div>

                <footer className="absolute inset-x-0 bottom-0 mx-auto flex h-14 w-full max-w-[880px] items-center justify-between px-6 text-xs text-neutral-400">
                    <span>© Sonora · Proyecto educativo CIT2308</span>
                    <button type="button" onClick={onTerms} className="cursor-pointer hover:text-neutral-900">Términos · Privacidad</button>
                </footer>
            </div>
        )
    }
}