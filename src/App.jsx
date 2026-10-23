import { useState } from "react";
import Auth from "./pages/Auth";
import Landing from "./pages/Landing";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Collection from "./pages/Collection"

export default function App() {
  const [page, setPage] = useState('landing')
  const [user, setUser] = useState('')
  const [isNew, setIsNew] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  function enter(name, New) {
    setUser(name)
    setIsNew(New)
    if(New){
      setPage('welcome')
    }
    else{
      setPage('home')
    }
    }

  if (page === 'welcome') {
    return (
      <Welcome user={user} isNew={isNew} onContinue={(genre) => {setIsNew(false); setPage('home')}}></Welcome>
    )
  }

  if (page === 'login') {
    return (
      <Auth startingMode="login" onReturn={() => setPage('landing')} onEnter={enter}></Auth>
    )
  }

  if (page === 'register') {
    return (
      <Auth startingMode="register" onReturn={() => setPage('landing')} onEnter={enter}></Auth>
    )
  }

  if (page === 'home') {
    return (
      <Home user={user} isAdmin={isAdmin} onLoad={(p) => setPage(p)}></Home>
    )
  }

  if (page === 'collection') {
    return (
      <Collection user={user} isAdmin={isAdmin} onLoad={(p) => setPage(p)}></Collection>
    )
  }

  return <Landing onLogin={() => setPage('login')} onRegister={() => setPage('register')} />
}


