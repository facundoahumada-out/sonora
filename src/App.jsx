import { useState, useEffect } from "react";
import Auth from "./pages/Auth";
import Landing from "./pages/Landing";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Collection from "./pages/Collection"
import Reproductor from "./components/Reproductor";
import Profile from "./pages/Profile";
import Terms from "./pages/Terms";

export default function App() {
  const [page, setPage] = useState('landing')
  const [user, setUser] = useState('')
  const [isNew, setIsNew] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [currentSong, setCurrentSong]=useState(null);
  const [playing, setPlaying]=useState(false);
  const [termsFrom, setTermsFrom] = useState('landing')
  const [likes, setLikes] = useState([])

  useEffect(() => {
    if (!user) {
      setLikes([])
      return
    }
    fetch(`http://localhost:3000/user/likes/${user}`)
      .then(res => res.json())
      .then(data => setLikes(Array.isArray(data) ? data.map(item => String(item.song_id)) : []))
      .catch(() => setLikes([]))
  }, [user])

  async function toggleLike(songId) {
    if (!user) return
    const id = String(songId)
    const isLiked = likes.includes(id)
    setLikes(prev => isLiked ? prev.filter(tmp => tmp !== id) : [...prev, id])
    await fetch('http://localhost:3000/user/likes', {
      method: isLiked ? 'DELETE' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_mail: user, song_id: songId })
    })
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
    setPage('landing')
  }

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
      <Terms onReturn={() => setPage(termsFrom)} onLogo={() => setPage(user ? 'home' : 'landing')}></Terms>
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
    content = <Home user={user} isAdmin={isAdmin} onLoad={(p) => setPage(p)} currentSong={currentSong} setCurrentSong={setCurrentSong} setPlaying={setPlaying} likes={likes} onToggleLike={toggleLike}></Home>
  } else if (page === 'collection') {
    content = <Collection user={user} isAdmin={isAdmin} onLoad={(p) => setPage(p)} currentSong={currentSong} onSelectSong={setCurrentSong} setPlaying={setPlaying} likes={likes} onToggleLike={toggleLike}></Collection>
  } else if (page === 'profile') {
    content = <Profile user={user} isAdmin={isAdmin} onLoad={(p) => setPage(p)} onLogout={logout}></Profile>
  }

  if (pagesWithPlayer.includes(page)) {
    return (
      <div>
        {content}
        <Reproductor currentSong={currentSong} playing={playing} setPlaying={setPlaying} user={user} likes={likes} onToggleLike={toggleLike}></Reproductor>
      </div>
    )
  }

  return <Landing onLogin={() => setPage('login')} onRegister={() => setPage('register')} onTerms={openTerms} />
}


