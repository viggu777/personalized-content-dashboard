export {
  default as favoritesReducer,
  addFavorite,
  removeFavorite,
  setFavorites,
  selectFavorites,
  selectIsFavorite,
} from "./favoritesSlice";
export type { FavoritesState } from "./favoritesSlice";
export { FavoritesHydrator } from "./FavoritesHydrator";
export { FavoritesList } from "./FavoritesList";
