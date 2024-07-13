import { useState, useEffect } from "react";
import { saveFilter } from "../utils/saveFilter";
import { filterProducts, sortProducts } from "../utils/utils";
import mockData from "../../mock.json";
import { CustomInput } from "../ui/CustomInput";
import { SortProducts } from "../ui/SortProducts";
import { ProductCard } from "../ui/ProductCard";
import { Button, styled } from "@mui/material";
import { ProductCardSceleton } from "../ui/ProductCardSceleton";

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
  const [filterBy, setFilterBy] = useState<string>(initialFilterBy);
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

  const filteredProducts = filterBy
    ? filterProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(inputValue.toLowerCase())
        ),
        filterBy
      )
    : products;

  const sortedAndFilteredProducts = sortProducts(filteredProducts, sortBy);

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
      <CustomInput
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
      <SortProducts onChange={handleSortingChange} sortBy={sortBy} />
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
