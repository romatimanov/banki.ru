import React, { useState, useEffect } from "react";
import { TextField, styled } from "@mui/material";

const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "rgba(176, 176, 176, 0.87)",
      borderRadius: "10px",
    },
    "&:hover fieldset": {
      borderColor: "skyblue",
    },
    "&.Mui-focused fieldset": {
      borderColor: "skyblue",
    },
  },
});

const InputBox = styled("div")({
  width: "100%",
  padding: "20px",
  backgroundColor: "#fff",
  borderRadius: "15px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 15,
});

type CustomInputProps = {
  onChange: (value: string) => void;
  initialValue: string;
  resetInput: boolean;
  onResetComplete: () => void;
};

export function CustomInput({
  onChange,
  initialValue,
  resetInput,
  onResetComplete,
}: CustomInputProps): JSX.Element {
  const [inputValue, setInputValue] = useState(initialValue);

  useEffect(() => {
    if (resetInput) {
      setInputValue("");
      onChange("");
      onResetComplete();
    }
  }, [resetInput, onChange, onResetComplete]);

  useEffect(() => {
    const storedValue = localStorage.getItem("savedFilter");
    if (storedValue !== null) {
      setInputValue(storedValue);
      onChange(storedValue);
    }
  }, [onChange]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
    if (value.trim() !== "") {
      localStorage.setItem("savedFilter", value);
    } else {
      localStorage.removeItem("savedFilter");
    }
    onChange(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // оставляем только цифры для ввода
    const allowedCharacters = /^[0-9\b]+$/;
    if (!allowedCharacters.test(event.key) && event.key !== "Backspace") {
      event.preventDefault();
    }
  };

  return (
    <InputBox>
      <CustomTextField
        id="outlined-secondary"
        placeholder="Сумма кредита"
        variant="outlined"
        color="secondary"
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        value={inputValue}
        fullWidth
      />
    </InputBox>
  );
}
