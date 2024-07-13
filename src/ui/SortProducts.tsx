import { useEffect } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
} from "@mui/material";

type SortProductsProps = {
  onChange: (value: string) => void;
  sortBy: string;
};

const StyledFormControl = styled(FormControl)({
  minWidth: 200,
  marginRight: "auto",
  marginBottom: 15,
});

const StyledInputLabel = styled(InputLabel)({
  fontSize: 16,
  borderColor: "rgba(176, 176, 176, 0.87)",
});

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  cursor: "default",
  fontWeight: "bold",
  "&.Mui-disabled": {
    opacity: 1,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.common.white,
  },
}));
const StyledSelect = styled(Select)({
  borderRadius: "10px",
});

export function SortProducts({
  onChange,
  sortBy,
}: SortProductsProps): JSX.Element {
  useEffect(() => {
    localStorage.setItem("savedFilter", sortBy);
  }, [sortBy]);

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const selectedValue = event.target.value as string;
    onChange(selectedValue);
    localStorage.setItem("sortBy", selectedValue);
  };

  return (
    <StyledFormControl>
      <StyledInputLabel id="sorting-label">Сортировка</StyledInputLabel>
      <StyledSelect
        labelId="sorting-label"
        id="sorting-select"
        value={sortBy}
        onChange={handleChange}
        label="Сортировка"
      >
        <StyledMenuItem disabled value="">
          Сортировать
        </StyledMenuItem>
        <MenuItem value={"min"}>По минимальной сумме</MenuItem>
        <MenuItem value={"max"}>По максимальной сумме</MenuItem>
      </StyledSelect>
    </StyledFormControl>
  );
}
