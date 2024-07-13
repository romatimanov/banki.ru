import { useState } from "react";
import { saveFilter } from "../utils/saveFilter";
import { filterProducts, sortProducts } from "../utils/utils";
import mockData from "../../mock.json";
import { CustomInput } from "../ui/CustomInput";
import { SortProducts } from "../ui/SortProducts";
import { ProductCard } from "../ui/ProductCard";
import { Button } from "@mui/material";
export function FilterCompanent() {
  const queryParams = new URLSearchParams(window.location.search);
  const initialFilterBy = queryParams.get("filterBy") || "";
  const initialSortBy = queryParams.get("sortBy") || "";
  const [sortBy, setSortBy] = useState<string>(initialSortBy);
  const [filterBy, setFilterBy] = useState<string>(initialFilterBy);
  const [inputValue, setInputValue] = useState<string>("");
  const [resetInput, setResetInput] = useState<boolean>(false);

  const handleSortingChange = (value: string) => {
    setSortBy(value);
  };

  const handleFilterChange = (value: string) => {
    setFilterBy(value);
  };

  saveFilter({ filterBy, sortBy });

  // филтрация из селетка или из инпута

  const filteredProducts = filterBy
    ? filterProducts(
        mockData.products.filter((product) =>
          product.name.toLowerCase().includes(inputValue.toLowerCase())
        ),
        filterBy
      )
    : mockData.products;
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
            marginRight: "auto",
          },
        }}
      >
        Сброс фильтров
      </Button>
      <SortProducts onChange={handleSortingChange} sortBy={sortBy} />
      {sortedAndFilteredProducts.map((product) => (
        <ProductCard
          key={product.name}
          amount={product.amount}
          name={product.name}
          logo={product.logo}
        />
      ))}
    </>
  );
}
