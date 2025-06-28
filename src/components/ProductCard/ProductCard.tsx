import React from 'react';
import { type Product } from '../../types/Product';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isFavorite, onToggleFavorite }) => {
  return (
    <div className={styles.card}>
      <Link to={`/product/${product.id}`} className={styles.imageLink}>
        <img src={product.image} alt={product.title} className={styles.image} />
      </Link>
      <div className={styles.info}>
        <Link to={`/product/${product.id}`} className={styles.titleLink}>
          <h3 className={styles.title}>{product.title}</h3>
        </Link>
        <p className={styles.price}>R$ {product.price.toFixed(2)}</p>
        <button
          className={`${styles.favoriteButton} ${isFavorite ? styles.favorite : ''}`}
          onClick={() => onToggleFavorite(product.id)}
        >
          {isFavorite ? '❤️ Favorito' : '🤍 Favoritar'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;