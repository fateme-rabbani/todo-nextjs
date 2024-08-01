"use client";

import { FC } from "react";

export interface EditButtonProps {
  onRequestBoardEdit(des: string): void;
}

export const EditButton: FC<EditButtonProps> = ({ onRequestBoardEdit }) => (
  <button
    className="border border-slate-950 bg-violet-900 text-base text-slate-50 p-3 text-center rounded-md hover:bg-violet-600 transition-all duration-300"
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
