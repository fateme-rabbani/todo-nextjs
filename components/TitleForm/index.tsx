import { Input, Button } from "@mui/material";
import { FC, useState } from "react";

interface InputProps {
  handleSubmit: (value: string) => void;
}

const TitleForm: FC<InputProps> = ({ handleSubmit }) => {
  const [value, setValue] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!value) return;
        handleSubmit(value);
        setValue("");
      }}
    >
      <Input
        sx={{ height: 27, border: 1, "& input": { height: 27, padding: 0 } }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        sx={{
          width: 50,
          borderRadius: 5,
          background: "#9090de",
          color: "#000",
          fontSize: 12,
          border: 1,
          borderColor: "#3B3BB1",
        }}
        type="submit"
        disabled={!value}
      >
        add
      </Button>
    </form>
  );
};
export default TitleForm;
