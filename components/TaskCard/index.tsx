import { Box } from "@mui/material";
import { FC, useContext } from "react";

import { TasksListProps } from "@/app/[boardNumber]/page";
import StatusDropDown from "../StatusDropDown";
import { BoardContext } from "@/app/layout";

export const TaskCard: FC<TasksListProps> = ({ tasks, status, boardId }) => {
  const { handleEditTaskTitle } = useContext(BoardContext);

  return tasks
    ?.filter((task) => task.status === status)
    .map((task, i) => (
      <Box
        sx={{
          background: "#5f5fc2",
          padding: 1,
          borderRadius: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
        key={i}
      >
        <Box
          component="h3"
          sx={{ color: "#fff" }}
          onClick={() => handleEditTaskTitle(boardId, task.id, task.taskDes)}
        >
          {task.taskDes}
        </Box>
        <StatusDropDown status={task.status} id={task.id} boardId={boardId} />
      </Box>
    ));
};
export default TaskCard;
