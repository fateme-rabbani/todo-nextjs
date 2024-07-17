import { Box } from "@mui/material";
import { FC } from "react";

import { TasksListProps } from "@/app/[boardNumber]/page";
import TaskCard from "../TaskCard";

interface ColumnProps extends TasksListProps {}

const TasksColumn: FC<ColumnProps> = ({ status, tasks, boardId }) => (
  <Box
    sx={{
      background: "#9090de",
      padding: 2,
      borderRadius: 1,
      minWidth: 250,
      display: "flex",
      flexDirection: "column",
      gap: 2,
    }}
  >
    <Box
      component="h1"
      sx={{
        color: "#fff",
        background: "#3b3bb1",
        padding: 2,
        borderRadius: 1,
      }}
    >
      {status}
    </Box>
    <TaskCard tasks={tasks} status={status} boardId={boardId} />
  </Box>
);

export default TasksColumn;
