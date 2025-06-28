import React from 'react';
import { type Product } from '../../types/Product';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductList.module.css';

interface ProductListProps {
  products: Product[];
  favorites: number[];
  onToggleFavorite: (productId: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, favorites, onToggleFavorite }) => {
  return (
    <div className={styles.productList}>
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          isFavorite={favorites.includes(product.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

export default ProductList;