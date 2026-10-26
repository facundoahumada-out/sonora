// Devuelve la respuesta de la API si es una lista; si no, una lista vacía
export function toList(data) {
    if (Array.isArray(data)) {
        return data
    }
    return []
}

export function songCount(playlist) {
    if (playlist.songs) {
        return playlist.songs.length
    }
    return 0
}

export function songCountText(playlist) {
    const count = songCount(playlist)
    if (count === 1) {
        return '1 canción'
    }
    return count + ' canciones'
}
