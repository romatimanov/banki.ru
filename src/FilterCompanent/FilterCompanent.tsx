import { useState, useEffect } from "react";
import { saveFilter } from "../utils/saveFilter";
import { filterProducts, sortProducts } from "../utils/utils";
import mockData from "../../mock.json";
import { ProductCard } from "../ui/ProductCard";
import { Button, styled } from "@mui/material";
import { ProductCardSceleton } from "../ui/ProductCardSceleton";
import { SearchInput } from "../SearcInput/SearchInput";
import { SortCompanent } from "../SortCompanent/SortCompanent";

const Products = styled("div")({
  width: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gridGap: "15px",
});

export function FilterCompanent() {
  const queryParams = new URLSearchParams(window.location.search);
  const initialFilterBy = queryParams.get("filterBy") || "";
  const initialSortBy = queryParams.get("sortBy") || "";
  const [sortBy, setSortBy] = useState<string>(initialSortBy);
  // если в моковых данных есть значение то присваиваем его, если нет то присваиваем свое значение
  const [filterBy, setFilterBy] = useState<string>(
    mockData.filter &&
      typeof mockData.filter.amount !== "undefined" &&
      mockData.filter.amount !== null
      ? String(mockData.filter.amount)
      : initialFilterBy
  );

  const [inputValue, setInputValue] = useState<string>("");
  const [resetInput, setResetInput] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<any[]>([]);
  const arrNumber = [1, 2, 3, 4, 5];

  // имитация загрузки карточек
  useEffect(() => {
    setTimeout(() => {
      setProducts(mockData.products);
      setLoading(false);
    }, 2000);
  }, []);

  const handleSortingChange = (value: string) => {
    setSortBy(value);
  };

  const handleFilterChange = (value: string) => {
    setFilterBy(value);
  };

  saveFilter({ filterBy, sortBy });

  // фильтрация и сортировка

  const filteredProducts = filterBy
    ? filterProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(inputValue.toLowerCase())
        ),
        filterBy
      )
    : products;

  const sortedAndFilteredProducts = sortProducts(filteredProducts, sortBy);

  // сброс фильтров

  const resetFilter = () => {
    localStorage.removeItem("savedFilter");
    localStorage.removeItem("sortBy");
    setFilterBy("");
    setSortBy("");
    setResetInput(true);
    setInputValue("");
  };

  return (
    <>
      <SearchInput
        onChange={handleFilterChange}
        initialValue={inputValue}
        resetInput={resetInput}
        onResetComplete={() => setResetInput(false)}
      />
      <Button
        onClick={resetFilter}
        sx={{
          marginLeft: "auto",
          marginBottom: "15px",
          "@media (max-width: 500px)": {
            fontSize: "10px",
          },
        }}
      >
        Сброс фильтров
      </Button>
      <SortCompanent sortBy={sortBy} onChange={handleSortingChange} />
      {loading ? (
        <Products>
          {arrNumber.map((item) => (
            <ProductCardSceleton key={item} />
          ))}
        </Products>
      ) : (
        <Products>
          {sortedAndFilteredProducts.map((product) => (
            <ProductCard
              key={product.name}
              amount={product.amount}
              name={product.name}
              logo={product.logo}
            />
          ))}
        </Products>
      )}
    </>
  );
}
