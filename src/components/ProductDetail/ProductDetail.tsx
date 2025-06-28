import React from 'react';
import { type Product } from '../../types/Product';
import styles from './ProductDetail.module.css';

interface ProductDetailProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (productId: number) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, isFavorite, onToggleFavorite }) => {
  return (
    <div className={styles.detailContainer}>
      <img src={product.image} alt={product.title} className={styles.image} />
      <div className={styles.info}>
        <h1 className={styles.title}>{product.title}</h1>
        <p className={styles.price}>R$ {product.price.toFixed(2)}</p>
        <p className={styles.category}>Categoria: {product.category}</p>
        <p className={styles.description}>{product.description}</p>
        <p className={styles.rating}>Avaliação: {product.rating.rate} ({product.rating.count} avaliações)</p>
        <button
          className={`${styles.favoriteButton} ${isFavorite ? styles.favorite : ''}`}
          onClick={() => onToggleFavorite(product.id)}
        >
          {isFavorite ? '❤️ Remover dos Favoritos' : '🤍 Adicionar aos Favoritos'}
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;