import { MenuItem, SelectChangeEvent } from "@mui/material";
import { useEffect } from "react";
import { SelectCustom } from "../ui/SelectCustom";

type SortCompanentType = {
  sortBy: string;
  onChange: (value: string) => void;
};

export function SortCompanent({ sortBy, onChange }: SortCompanentType) {
  useEffect(() => {
    localStorage.setItem("savedFilter", sortBy);
  }, [sortBy]);

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const selectedValue = event.target.value as string;
    onChange(selectedValue);
    localStorage.setItem("sortBy", selectedValue);
  };

  return (
    <>
      <SelectCustom
        value={sortBy}
        handleChange={handleChange}
        title="Сортировка"
        text="Сортировать"
      >
        <MenuItem value={"min"}>По минимальной сумме</MenuItem>
        <MenuItem value={"max"}>По максимальной сумме</MenuItem>
      </SelectCustom>
    </>
  );
}
