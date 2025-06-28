const FAVORITES_KEY = 'productFavorites';

export const getFavorites = (): number[] => {
  const favorites = localStorage.getItem(FAVORITES_KEY);
  return favorites ? JSON.parse(favorites) : [];
};

export const addFavorite = (productId: number): void => {
  const favorites = getFavorites();
  if (!favorites.includes(productId)) {
    favorites.push(productId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
};

export const removeFavorite = (productId: number): void => {
  let favorites = getFavorites();
  favorites = favorites.filter(id => id !== productId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export const isFavorite = (productId: number): boolean => {
  const favorites = getFavorites();
  return favorites.includes(productId);
};