"use client";

import { FC } from "react";

export interface RemoveButtonProps {
  onRequestBoardRemove(): void;
}

export const RemoveButton: FC<RemoveButtonProps> = ({
  onRequestBoardRemove,
}) => (
  <button
    className="border border-slate-950 bg-violet-900 text-base text-slate-50 p-3 text-center rounded-md hover:bg-violet-600 transition-all duration-300"
    onClick={async (e) => {
      e.stopPropagation();
      if (!confirm("are you sure?")) return;
      await onRequestBoardRemove();
    }}
  >
    delete
  </button>
);
