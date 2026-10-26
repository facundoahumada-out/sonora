import { useState, useEffect } from "react";
import Auth from "./pages/Auth";
import Landing from "./pages/Landing";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Collection from "./pages/Collection"
import Reproductor from "./components/Reproductor";
import Profile from "./pages/Profile";
import Terms from "./pages/Terms";
import { toList } from "./utils";

export default function App() {
  const [page, setPage] = useState('landing')
  const [user, setUser] = useState('')
  const [isNew, setIsNew] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [currentSong, setCurrentSong]=useState(null);
  const [playing, setPlaying]=useState(false);
  const [termsFrom, setTermsFrom] = useState('landing')
  const [likes, setLikes] = useState([])
  const [playlists, setPlaylists] = useState([])
  const [history, setHistory] = useState([])
  const [playList, setPlayList] = useState([])
  const [position, setPosition] = useState(0)
  const queue = playList.slice(position + 1)

  function startSong(song) {
    setCurrentSong(song)
    setPlaying(true)
    setHistory(prev => [{ song: song, playedAt: new Date() }, ...prev].slice(0, 50))
  }

  function playSong(song, list) {
    startSong(song)
    setPlayList(list)
    setPosition(list.findIndex(tmp => tmp.id === song.id))
  }

  function playNext() {
    if (position + 1 < playList.length) {
      startSong(playList[position + 1])
      setPosition(position + 1)
    } else {
      setPlaying(false)
    }
  }

  function playPrevious() {
    if (position > 0) {
      startSong(playList[position - 1])
      setPosition(position - 1)
    }
  }

  useEffect(() => {
    if (!user) {
      setLikes([])
      return
    }
    fetch(`http://localhost:3000/user/likes/${user}`)
      .then(res => res.json())
      .then(data => setLikes(toList(data).map(item => String(item.song_id))))
      .catch(() => setLikes([]))
  }, [user])

  async function toggleLike(songId) {
    if (!user) return
    const id = String(songId)
    const isLiked = likes.includes(id)
    let method = 'POST'
    if (isLiked) {
      method = 'DELETE'
      setLikes(prev => prev.filter(tmp => tmp !== id))
    } else {
      setLikes(prev => [...prev, id])
    }
    await fetch('http://localhost:3000/user/likes', {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_mail: user, song_id: songId })
    })
  }

  function goToStart() {
    if (user) {
      setPage('home')
    } else {
      setPage('landing')
    }
  }

  function openTerms() {
    setTermsFrom(page)
    setPage('terms')
  }

  function enter(name, New) {
    setUser(name)
    setIsNew(New)
    setPage('welcome')
  }

  function logout() {
    localStorage.removeItem('token')
    setUser('')
    setIsNew(false)
    setIsAdmin(false)
    setCurrentSong(null)
    setPlaying(false)
    setHistory([])
    setPlayList([])
    setPosition(0)
    setPage('landing')
  }

function loadPlaylists() {
  fetch(`http://localhost:3000/user/playlists/${user}`)
    .then(res => res.json())
    .then(data => setPlaylists(toList(data)))
}

useEffect(() => { if (user) loadPlaylists(); else setPlaylists([]) }, [user])

  if (page === 'welcome') {
    return (
      <Welcome user={user} isNew={isNew} onContinue={(genre) => {setIsNew(false); setPage('home')}}></Welcome>
    )
  }

  if (page === 'login') {
    return (
      <Auth startingMode="login" onReturn={() => setPage('landing')} onEnter={enter} onTerms={openTerms}></Auth>
    )
  }

  if (page === 'terms') {
    return (
      <Terms onReturn={() => setPage(termsFrom)} onLogo={goToStart}></Terms>
    )
  }

  if (page === 'register') {
    return (
      <Auth startingMode="register" onReturn={() => setPage('landing')} onEnter={enter} onTerms={openTerms}></Auth>
    )
  }

  const pagesWithPlayer = ['home', 'collection', 'profile']

  let content
  if (page === 'home') {
    content = <Home user={user} isAdmin={isAdmin} onLoad={(p) => setPage(p)} currentSong={currentSong} onPlaySong={playSong} history={history} likes={likes} onToggleLike={toggleLike}></Home>
  } else if (page === 'collection') {
    content = <Collection user={user} isAdmin={isAdmin} playlists={playlists} reloadPlaylists={loadPlaylists} onLoad={(p) => setPage(p)} currentSong={currentSong} onPlaySong={playSong} history={history} likes={likes}></Collection>
  } else if (page === 'profile') {
    content = <Profile user={user} isAdmin={isAdmin} onLoad={(p) => setPage(p)} onLogout={logout}></Profile>
  }

  if (pagesWithPlayer.includes(page)) {
    return (
      <div>
        {content}
        <Reproductor currentSong={currentSong} playing={playing} setPlaying={setPlaying} user={user} likes={likes} onToggleLike={toggleLike} queueSongs={queue} onPlaySong={playSong} onNext={playNext} onPrevious={playPrevious} hasPrevious={position > 0} playlists={playlists} reloadPlaylists={loadPlaylists}></Reproductor>
      </div>
    )
  }

  return <Landing onLogin={() => setPage('login')} onRegister={() => setPage('register')} onTerms={openTerms} />
}


