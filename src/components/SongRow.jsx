import SongCover from "./SongCover";

export default function SongRow({ song, subtitle, active, onPlay, children }) {
    let shownSubtitle = song.artist_name
    if (subtitle) {
        shownSubtitle = subtitle
    }

    function playWithKeyboard(e) {
        if (e.target === e.currentTarget && e.key === 'Enter') {
            e.preventDefault();
            onPlay();
        }
    }

    return (
        <div role="button" tabIndex={0} aria-label={'Reproducir ' + song.title + ' de ' + song.artist_name} onClick={onPlay} onKeyDown={playWithKeyboard} className="group flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 hover:bg-neutral-50 focus-visible:bg-neutral-50">
            <SongCover song={song} playable active={active}></SongCover>
            <div>
                <p className="font-medium">{song.title}</p>
                <p className="text-xs text-neutral-400">{shownSubtitle}</p>
            </div>
            <div className="ml-auto flex items-center gap-1 text-neutral-400">
                {children}
            </div>
        </div>
    )
}
