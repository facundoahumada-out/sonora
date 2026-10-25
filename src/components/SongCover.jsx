import { Play } from "lucide-react";

export default function SongCover({ song, playable, active }) {
    return (
        <div className="relative h-10 w-10 shrink-0">
            <img src={song.cover_image} alt={song.title} className="h-10 w-10 rounded-md object-cover bg-neutral-100" />
            {playable && !active && (
                <div className="absolute inset-0 flex items-center justify-center rounded-md bg-black/40 text-white opacity-0 transition-opacity group-hover:opacity-100">
                    <Play size={16} fill="currentColor"></Play>
                </div>
            )}
        </div>
    )
}
