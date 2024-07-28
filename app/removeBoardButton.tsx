"use client";

import { FC } from "react";

export interface RemoveButtonProps {
  onRequestBoardRemove(): void;
}

export const RemoveButton: FC<RemoveButtonProps> = ({
  onRequestBoardRemove,
}) => (
  <button
    className="border border-[#000] bg-[#3b3bb1] text-[14px] text-[#fff] p-3 text-center rounded-md hover:bg-[#9090DE] transition-all duration-300"
    onClick={async (e) => {
      e.stopPropagation();
      if (!confirm("are you sure?")) return;
      await onRequestBoardRemove();
    }}
  >
    delete
  </button>
);
