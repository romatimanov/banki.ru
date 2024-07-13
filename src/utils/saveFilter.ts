import { useEffect } from "react";

type SaveFilterProps = {
  filterBy: string;
  sortBy: string;
};

// Функция для сохранения фильтра и сортировки в локальном хранилище и в адресной строке браузера для возможности поделиться данными

export function saveFilter({ filterBy, sortBy }: SaveFilterProps) {
  useEffect(() => {
    const searchParams = new URLSearchParams();
    if (filterBy) searchParams.set("filterBy", filterBy);
    if (sortBy) searchParams.set("sortBy", sortBy);

    const newUrl = `${window.location.pathname}${
      searchParams.toString() ? `?${searchParams.toString()}` : ""
    }`;
    window.history.pushState({}, "", newUrl);

    localStorage.setItem("savedFilter", filterBy);
  }, [filterBy, sortBy]);
}
