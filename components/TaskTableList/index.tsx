"use client";
import React, { useCallback, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
} from "@mui/material";
import {
  AddTask,
  addTaskFnSlice,
  setTasks,
  updateTaskFnSlice,
} from "@/redux/addTaskSlice";
import { useDispatch, useSelector } from "react-redux";
import { loginSelector } from "@/redux/signUpSlice";
import { TaskListEditable } from "@/lib/config";
import { AppDispatch } from "@/redux/store";

export type AddTaskList = {
  id?: string;
  tasktitle: string;
  description: string;
  startdate: string;
  enddate: string;
  priority: string;
  assignee: string;
  email: string;
  status?: string;
  isEdit?: boolean;
};

interface Props {
  tasks: AddTaskList[];
}

function TaskTableList({ tasks }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const permission = localStorage.getItem("LoginUserPermission");
  console.log("pppp in component", permission);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [taskList, setTaskList] = useState(tasks);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (!tasks || tasks.length === 0) {
    return <p>No tasks available</p>;
  }

  const handleEditChange = (taskId: string, field: string, value: string) => {
    console.log(field, "taskid", taskId, "val", value);
    const updatedTasks = tasks.map((task) => {
      console.log("ttttttttt", task);
      return task.id === taskId ? { ...task, [field]: value } : task;
    });
    // NEED TO CHANGE TO SUBMIT BUTTON
    // // Extract the updated task
    // const updatedTaskVal = updatedTasks.find((task) => task.id === taskId);

    //   // Dispatch updates
    //   dispatch(setTasks(updatedTasks));
    //   if (updatedTaskVal) {
    //     dispatch(updateTaskFnSlice(updatedTaskVal));
    //   }
  };

  const handleSubmitBtn = (id: string, isEditVal: boolean) => {
    const updatedTasks = tasks.map((task) => {
      return task.id === id ? { ...task, isEdit: !isEditVal } : task;
    });
    setTaskList(updatedTasks);
    if (isEditVal === false) {
      const updatedTask = taskList.find((task) => task.id === id);
      if (updatedTask) {
        const { isEdit, ...taskWithoutIsEdit } = updatedTask;
        dispatch(updateTaskFnSlice(taskWithoutIsEdit));
      }
    }
  };

  const handleStatus = useCallback(
    (id: string, status: string, field: string) => {
      console.log("id", id, "status", status);
      return (
        <>
          {permission == "1" ? (
            <input
              className="inputStyleinTable"
              type="text"
              value={status}
              onChange={(e) => handleEditChange(id, field, e.target.value)}
            />
          ) : (
            status
          )}
        </>
      );
    },
    [permission, taskList, TaskListEditable]
  );

  return (
    <div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader aria-label="task table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Task Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Assignee</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {taskList
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>{task.id}</TableCell>
                    <TableCell>{task.tasktitle}</TableCell>
                    <TableCell>{task.description}</TableCell>
                    <TableCell>
                      {new Date(task.startdate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(task.enddate).toLocaleDateString()}
                    </TableCell>
                    {/* Call handleStatus for each status in taskStatus */}
                    {TaskListEditable?.map((field: string, index: number) => (
                      <TableCell key={index}>
                        {handleStatus(
                          task?.id || "wwd",
                          task[field as keyof AddTask] || "Draft",
                          field
                        )}
                      </TableCell>
                    ))}
                    {/* <TableCell>{task.priority}</TableCell>
                    <TableCell>{task.assignee}</TableCell>
                    <TableCell>{task.email}</TableCell>
                    {handleStatus(task?.id || "wwd", task?.status || "Draft")} */}
                    <TableCell>
                      <Button
                        onClick={() =>
                          handleSubmitBtn(task.id ?? "", task.isEdit ?? true)
                        }
                      >
                        {task.isEdit ? "Edit" : "Submit"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={tasks.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default TaskTableList;
