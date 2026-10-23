import { useState } from "react";
import Logo from "../components/Logo";

const inputClase = 'h-9 w-full rounded-md border border-neutral-200 px-3 text-sm outline-none placeholder:text-neutral-400 focus:border-neutral-900'
const botonPrincipal = 'h-9 w-full rounded-md bg-neutral-900 font-medium text-white mt-4'

export default function Auth({ startingMode, onReturn, onEnter}) {
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
                    <button type="button" onClick={onReturn} aria-label="Volver al inicio" className="mb-7 block">
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
                        <input name="user" required type="text" placeholder="Nombre de usuario" className={inputClase} />
                        <input name="mail" required type="email" placeholder="Correo electrónico" className={inputClase} />
                        <input name="pass" required type="password" placeholder="Contraseña (mín. 8 caracteres)" className={inputClase} />
                        <p className="flex h-5 items-center text-sm text-neutral-500">Al registrarte aceptas los <a href="#" className="text-neutral-900 underline px-1">Términos</a>.</p>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                        <button type="submit" className={botonPrincipal}>Crear cuenta</button>
                    </form>
                    
                    <p className="mt-4 h-[18px] text-xs text-neutral-500">
                        ¿Ya tienes cuenta?
                        <button type="button" onClick={() => setMode('login')} className="text-neutral-900 underline px-1">
                            Inicia sesión
                        </button>
                    </p>
                </div>

                <footer className="absolute inset-x-0 bottom-0 mx-auto flex h-14 w-full max-w-[880px] items-center justify-between px-6 text-xs text-neutral-400">
                    <span>© Sonora · Proyecto educativo CIT2308</span>
                    <span>Términos · Privacidad</span>
                </footer>
            </div>
        )
    } else if (mode === 'login') {
        return (
            <div className="relative flex min-h-screen items-center justify-center bg-white text-sm text-neutral-900">
                <div className="w-[300px]">
                    <button type="button" onClick={onReturn} aria-label="Volver al inicio" className="mb-7 block">
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
                        <input name="mail" type="email" placeholder="Correo electrónico" className={inputClase} />
                        <input name="pass" type="password" placeholder="Contraseña" className={inputClase} />
                        <p className="flex h-5 items-center justify-end text-sm text-neutral-500">
                            <a href="#" className="text-neutral-900 px-1">¿Olvidaste tu contraseña?</a>
                        </p>
                        <div className="h-9" aria-hidden="true"></div>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                        <button type="submit" className={botonPrincipal}>Iniciar sesión</button>
                    </form>
                    
                    <p className="mt-4 h-[18px] text-xs text-neutral-500">
                        ¿No tienes cuenta?
                        <button type="button" onClick={() => setMode('register')} className="text-neutral-900 underline px-1">
                            Regístrate
                        </button>
                    </p>
                </div>

                <footer className="absolute inset-x-0 bottom-0 mx-auto flex h-14 w-full max-w-[880px] items-center justify-between px-6 text-xs text-neutral-400">
                    <span>© Sonora · Proyecto educativo CIT2308</span>
                    <span>Términos · Privacidad</span>
                </footer>
            </div>
        )
    }
}