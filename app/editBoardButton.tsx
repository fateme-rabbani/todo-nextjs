"use client";

import { FC } from "react";

export interface EditButtonProps {
  onRequestBoardEdit(des: string): void;
}

export const EditButton: FC<EditButtonProps> = ({ onRequestBoardEdit }) => (
  <button
    className="border border-[#000] bg-[#3b3bb1] text-[14px] text-[#fff] p-3 text-center rounded-md hover:bg-[#9090DE] transition-all duration-300"
    onClick={async (e) => {
      e.stopPropagation();
      const newDes = prompt("new name:");
      if (!newDes) return;
      await onRequestBoardEdit(newDes);
    }}
  >
    edit
  </button>
);
