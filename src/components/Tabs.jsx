export default function Tabs({ sections, active, onChange, className }) {
    return (
        <div className={className + ' flex gap-5 border-b border-neutral-100'}>
            {sections.map((tmp) => {
                if (tmp.id === active) {
                    return (
                        <button key={tmp.id} className="cursor-pointer border-b-2 border-neutral-900 pb-2 font-medium">{tmp.name}</button>
                    )
                } else {
                    return (
                        <button key={tmp.id} onClick={() => onChange(tmp.id)} className="cursor-pointer pb-2 text-neutral-400 hover:text-neutral-900">{tmp.name}</button>
                    )
                }
            })}
        </div>
    )
}
