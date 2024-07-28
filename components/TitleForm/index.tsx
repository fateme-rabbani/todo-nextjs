"use client";
import { Input, Button, Box } from "@mui/material";

import { FC, useState } from "react";

interface InputProps {
  handleSubmit: (value: string) => void;
}

const TitleForm: FC<InputProps> = ({ handleSubmit }) => {
  const [value, setValue] = useState("");
  return (
    <form
      className="flex gap-3 items-center"
      onSubmit={(e) => {
        e.preventDefault();
        if (!value) return;
        handleSubmit(value);
        setValue("");
      }}
    >
      <input
        className="min-w-[150px] height-[27px] rounded "
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        className="min-w-[70px] bg-[#9090de] text-[#000] text-[20px] rounded-full border bprder-[#3B3BB1]"
        type="submit"
        disabled={!value}
      >
        add
      </button>
    </form>
  );
};
export default TitleForm;
