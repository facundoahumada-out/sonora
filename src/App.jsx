import { useState } from "react";
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
    content = <Home user={user} isAdmin={isAdmin} onLoad={(p) => setPage(p)} currentSong={currentSong} setCurrentSong={setCurrentSong} setPlaying={setPlaying}></Home>
  } else if (page === 'collection') {
    content = <Collection user={user} isAdmin={isAdmin} onLoad={(p) => setPage(p)}></Collection>
  } else if (page === 'profile') {
    content = <Profile user={user} isAdmin={isAdmin} onLoad={(p) => setPage(p)} onLogout={logout}></Profile>
  }

  if (pagesWithPlayer.includes(page)) {
    return (
      <div>
        {content}
        <Reproductor currentSong={currentSong} playing={playing} setPlaying={setPlaying}></Reproductor>
      </div>
    )
  }

  return <Landing onLogin={() => setPage('login')} onRegister={() => setPage('register')} onTerms={openTerms} />
}


