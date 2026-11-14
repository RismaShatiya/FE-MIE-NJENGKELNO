import { CartRecommendation } from "../types/cart.type";

export const getCartRecommendations = async (
  menuIds: number[]
): Promise<CartRecommendation[]> => {
  // TODO:
  // Integrasikan dengan endpoint rekomendasi Apriori
  // setelah model tersedia di backend.

  if (menuIds.length === 0) {
    return [];
  }

  return [];
};