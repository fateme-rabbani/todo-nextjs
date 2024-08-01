"use client";

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
        className="rounded"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        className="w-16 bg-violet-500 text-slate-950 text-xl rounded-full border border-violet-900"
        type="submit"
        disabled={!value}
      >
        add
      </button>
    </form>
  );
};
export default TitleForm;
