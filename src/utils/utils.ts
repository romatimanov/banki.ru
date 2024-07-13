import { CardUiProps } from "../ui/ProductCard";

// Функция для сортировки по сумме от мин до макс
export const sortProducts = <T extends CardUiProps>(
  products: T[],
  sortBy: string
): T[] => {
  if (sortBy === "min") {
    return [...products].sort((a, b) => a.amount - b.amount);
  } else if (sortBy === "max") {
    return [...products].sort((a, b) => b.amount - a.amount);
  } else {
    return products;
  }
};

// Функция для сортировки по сумме
export const filterProducts = <T extends CardUiProps>(
  products: T[],
  searchTerm: string
): T[] => {
  const searchTermNumber = parseFloat(searchTerm);

  return products.filter((product) => {
    const productAmount = product.amount;
    return !isNaN(searchTermNumber) && productAmount >= searchTermNumber;
  });
};
