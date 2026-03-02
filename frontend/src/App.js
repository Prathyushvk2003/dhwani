import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Events from './pages/Events';
import Results from './pages/Results';
import Gallery from './pages/Gallery';
import Brochure from './pages/Brochure';
import Admin from './pages/Admin';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import './styles/themes.css';

const MainScrollPage = () => {
  return (
    <>
      <Home />
      <Events />
      <Results />
      <Gallery />
      <Brochure />
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<MainScrollPage />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;