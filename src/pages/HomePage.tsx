import React, { useEffect, useState } from 'react';
import { type Product } from '../types/Product';
import { getProducts } from '../API/productsApi';
import ProductList from '../components/ProductList/ProductList';
import { getFavorites, addFavorite, removeFavorite } from '../utils/localStorageUtils';
import styles from './Pages.module.css';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError("Não foi possível carregar os produtos. Tente novamente mais tarde.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleToggleFavorite = (productId: number) => {
    if (favorites.includes(productId)) {
      removeFavorite(productId);
    } else {
      addFavorite(productId);
    }
    setFavorites(getFavorites());
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className={styles.loading}>Carregando produtos...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.pageTitle}>Todos os Produtos</h2>
      <input
        type="text"
        placeholder="Buscar produtos..."
        className={styles.searchBar}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredProducts.length === 0 && !loading && !error ? (
        <p className={styles.noResults}>Nenhum produto encontrado.</p>
      ) : (
        <ProductList
          products={filteredProducts}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
    </div>
  );
};

export default HomePage;