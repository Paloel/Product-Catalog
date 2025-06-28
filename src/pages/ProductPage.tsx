import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { type Product } from '../types/Product';
import { getProductById } from '../API/productsApi';
import ProductDetail from '../components/ProductDetail/ProductDetail';
import { getFavorites, addFavorite, removeFavorite } from '../utils/localStorageUtils';
import styles from './Pages.module.css';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        setLoading(true);
        try {
          const data = await getProductById(id);
          setProduct(data);
        } catch (err) {
          setError("Não foi possível carregar os detalhes do produto.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id]);

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

  if (loading) {
    return <div className={styles.loading}>Carregando detalhes do produto...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!product) {
    return <div className={styles.notFound}>Produto não encontrado.</div>;
  }

  return (
    <div className={styles.pageContainer}>
      <ProductDetail
        product={product}
        isFavorite={favorites.includes(product.id)}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
};

export default ProductPage;