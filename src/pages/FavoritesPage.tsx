import React, { useEffect, useState } from 'react';
import { type Product } from '../types/Product';
import { getProducts } from '../API/productsApi';
import ProductList from '../components/ProductList/ProductList';
import { getFavorites, addFavorite, removeFavorite } from '../utils/localStorageUtils';
import styles from './Pages.module.css';

const FavoritesPage: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [favoriteProductIds, setFavoriteProductIds] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);
      try {
        const data = await getProducts();
        setAllProducts(data);
      } catch (err) {
        setError("Não foi possível carregar os produtos para exibir os favoritos.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  useEffect(() => {
     setFavoriteProductIds(getFavorites());
  }, []);

  const favoriteProducts = allProducts.filter(product => favoriteProductIds.includes(product.id));

  const handleToggleFavorite = (productId: number) => {
    if (favoriteProductIds.includes(productId)) {
      removeFavorite(productId);
    } else {
      addFavorite(productId);
    }
    setFavoriteProductIds(getFavorites());
  };

  if (loading) {
    return <div className={styles.loading}>Carregando favoritos...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.pageTitle}>Meus Produtos Favoritos</h2>
      {favoriteProducts.length === 0 ? (
        <p className={styles.noResults}>Você ainda não adicionou nenhum produto aos favoritos.</p>
      ) : (
        <ProductList
          products={favoriteProducts}
          favorites={favoriteProductIds}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
    </div>
  );
};

export default FavoritesPage;