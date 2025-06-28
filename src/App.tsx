import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import FavoritesPage from './pages/FavoritesPage';

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="*" element={<h2>404 - Página Não Encontrada</h2>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;