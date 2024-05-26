import './App.css'
import Articles from './components/articles.js';
import CreateArticle from './components/createArticle.js';
import Header from './components/header.js';
//import Register from './components/register'
import Login from './components/login.js';
import { Route, Routes } from 'react-router-dom';
import Logout from './components/logout.js';


function App() {

  return (
    <>
      <Header />
      <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/articles" element={<Articles /> } />
          <Route path="/createArticle" element={<CreateArticle /> } />
          <Route path="/logout" element={<Logout /> } />
      </Routes>
    </>
  )
}

export default App
