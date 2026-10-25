import Logo from "./Logo"

const links = [
    { id: 'home', name: 'Inicio' },
    { id: 'collection', name: 'Biblioteca' },
]

export default function Navbar({ user, active, onLoad }) {
    const initial = user.charAt(0).toUpperCase()

    return (
        <nav className="flex h-16 items-center px-6">
            <Logo onClick={() => onLoad('home')}></Logo>
            <div className="ml-auto flex items-center gap-5">
                {links.map((tmp) => (
                    <button key={tmp.id} onClick={() => onLoad(tmp.id)} className={'cursor-pointer ' + (tmp.id === active ? 'font-medium' : 'text-neutral-500 hover:text-neutral-900')}>{tmp.name}</button>
                ))}
                {active === 'profile' ? (
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-900 text-xs font-semibold text-white">{initial}</span>
                ) : (
                    <button onClick={() => onLoad('profile')} className="cursor-pointer flex h-7 w-7 items-center justify-center rounded-full bg-neutral-100 text-xs font-semibold">{initial}</button>
                )}
            </div>
        </nav>
    )
}
