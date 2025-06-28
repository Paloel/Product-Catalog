import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/" className={styles.logoLink}>Catálogo de Produtos</Link>
      </div>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link to="/" className={styles.navLink}>Início</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/favorites" className={styles.navLink}>Favoritos</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;