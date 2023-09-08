import { useState } from 'react'

import Header from './components/Header'
import Home from './components/Home'
import Topics from './components/Topics'
import Articles from './components/Articles'
import SingleArticle from './components/SingleArticle'
import { Routes, Route } from 'react-router-dom';
import './App.css'

function App() {
  const [user, setUser] = useState('tickle122')

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:topic/:article_id" element={<SingleArticle user={user}/>} />
      </Routes>
    </>
  )
}

export default App
