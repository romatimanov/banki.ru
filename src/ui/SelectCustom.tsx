import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
} from "@mui/material";

export type SelectCustomType = {
  handleChange: (event: SelectChangeEvent<unknown>) => void;
  value: string;
  children: React.ReactNode;
  title: string;
  text: string;
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

export function SelectCustom({
  handleChange,
  value,
  children,
  title,
  text,
}: SelectCustomType): JSX.Element {
  return (
    <StyledFormControl>
      <StyledInputLabel id="sorting-label">{title}</StyledInputLabel>
      <StyledSelect
        labelId="sorting-label"
        id="sorting-select"
        value={value}
        onChange={handleChange}
        label={title}
      >
        <StyledMenuItem disabled value="">
          {text}
        </StyledMenuItem>
        {children}
      </StyledSelect>
    </StyledFormControl>
  );
}
