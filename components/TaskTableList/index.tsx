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
  Input,
  debounce,
} from "@mui/material";
import {
  addTaskSelector,
  getEmailForAssigneeFnInSlice,
  getTaskFnSlice,
  searchByEmail,
  sendtEmailsFnInSlice,
  updateTaskFnSlice,
} from "@/redux/addTaskSlice";
import { useDispatch, useSelector } from "react-redux";
import { loginSelector } from "@/redux/signUpSlice";
import { statusColumns, TaskListEditable } from "@/lib/config";
import { AppDispatch, RootState } from "@/redux/store";
import axios from "axios";
import { formatEmailMessage } from "@/lib/utils";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import Loader from "../Loader";

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

export type AddTaskWithEdit = AddTaskList & { isEdit: boolean };
function TaskTableList({ tasks }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const tasksVal: AddTaskWithEdit[] = tasks.map((task) => ({
    ...task,
    isEdit: true,
  }));
  const [taskList, setTaskList] = useState<AddTaskWithEdit[]>(tasksVal);
  const [searchTerm, setSearchTerm] = useState("");
  const { loading } = useSelector(addTaskSelector);
  const { isOpen, loadingNavBar } = useSelector(
    (state: RootState) => state.navbar
  );
  // Access data and loading state from Redux store
  const { priorities, emails } = useSelector(addTaskSelector);
  const emailArray = emails?.map((item) => item.email);

  const priorityList =
    priorities &&
    priorities?.length > 0 &&
    priorities?.map((item) => item?.value);

  const user =
    typeof window !== "undefined" ? localStorage.getItem("Username") : null;
  const getLocalStorageValue = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("LoginUserPermission");
    }
    return null;
  };

  const permission = getLocalStorageValue();
  console.log("permission", permission);
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditChange = async (
    taskId: string,
    field: string,
    value: string
  ) => {
    if (field === "email") {
      const res = await dispatch(getEmailForAssigneeFnInSlice(value));
      const assigneeName = res?.payload[0]?.username;
      const updatedTasks =
        taskList?.map((task) => {
          return task.id === taskId
            ? { ...task, email: value, assignee: assigneeName }
            : task;
        }) || [];
      setTaskList(updatedTasks);
    } else {
      const updatedTasks =
        taskList?.map((task) => {
          return task.id === taskId ? { ...task, [field]: value } : task;
        }) || [];
      setTaskList(updatedTasks);
    }
  };

  const handleSubmitBtn = async (id: string, isEditVal: boolean) => {
    const updatedTasks: AddTaskWithEdit[] = taskList.map((task) =>
      task.id === id ? { ...task, isEdit: !isEditVal } : task
    );
    setTaskList(updatedTasks);
    if (isEditVal === false) {
      const updatedTask = taskList.find((task) => task.id === id);
      if (updatedTask) {
        const { isEdit, ...taskWithoutIsEdit } = updatedTask;
        await dispatch(updateTaskFnSlice(taskWithoutIsEdit)).then(
          async (res) => {
            const data = formatEmailMessage(updatedTask, user || "");

            if (res?.meta?.requestStatus !== "rejected") {
              window.location.href = `mailto:${updatedTask?.email}
            ?subject=Action Required: [${updatedTask.tasktitle}]&body=${data}
            &cc=cc@example.com&bcc=bcc@example.com`;
              await dispatch(getTaskFnSlice()).then((res: any) => {
                if (res?.payload && res.payload.length > 0) {
                  const updatedPayload = res.payload.map((task: any) => ({
                    ...task,
                    isEdit: true,
                  }));
                  setTaskList(updatedPayload);
                }
              });
            }
          }
        );
      }
    }
  };

  const handleCancel = (id: string) => {
    const updatedTasks = taskList?.map((task) => {
      return task.id === id ? { ...task, isEdit: true } : task;
    });
    setTaskList(updatedTasks);
  };

  const handleStatus = useCallback(
    (id: string, value: string, field: string) => {
      return (
        <>
          {permission == "1" ? (
            <input
              className="inputStyleinTable"
              type="text"
              value={value}
              onChange={(e) => handleEditChange(id, field, e.target.value)}
            />
          ) : (
            value
          )}
        </>
      );
    },
    [permission, taskList]
  );

  const handleStatusEdit = useCallback(
    (id: string, value: string, isEdit: boolean, field: string) => {
      const fieldVal = () => {
        if (field === "status") {
          return statusColumns;
        } else if (field === "priority") {
          return priorityList || [];
        } else if (field === "email") {
          return emailArray;
        }
      };
      const cols = fieldVal();
      return (
        <>
          {permission == "1" && isEdit === false ? (
            <select
              className="inputStyleinTable"
              value={value}
              onChange={(e) =>
                handleEditChange(id || "", field, e.target.value)
              }
            >
              {cols?.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
          ) : (
            value
          )}
        </>
      );
    },
    [taskList, tasks]
  );

  const handleEmailClick = async (msg: any) => {
    const data = {
      to: "bibelor814@bankrau.com",
      subject: "Test Email from Next.js",
      message: formatEmailMessage(msg, user || ""),
    };
    dispatch(sendtEmailsFnInSlice(data)).then((res: any) => {
      console.log(res, "ressssss");
    });
  };

  const handleSearch = async (value: string) => {
    await dispatch(searchByEmail(value)).then((res: any) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        setTaskList(res?.payload);
      } else {
        toast.error("oops! something went wrong. Please try again later");
      }
    });
  };

  const debouncedSearch = useCallback(debounce(handleSearch, 300), []);

  const handleClose = async () => {
    setSearchTerm("");
    await dispatch(getTaskFnSlice()).then((res: any) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        setTaskList(res?.payload);
      } else {
        toast.error("oops! something went wrong. Please try again later");
      }
    });
  };

  if (!taskList || taskList.length === 0) {
    return <p>No tasks available</p>;
  }

  if (loading || loadingNavBar) return <Loader />;

  console.log(tasks, "tttttttttttt in child", taskList);

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
                <TableCell colSpan={2}>
                  <div className="flex items-center border border-gray-300 rounded-md px-3 py-1.5 bg-white shadow-sm gap-2 w-full max-w-md">
                    <Input
                      type="text"
                      placeholder="Search Email..."
                      value={searchTerm}
                      className="flex-1 text-sm bg-transparent border-none outline-none focus:ring-0 placeholder-gray-400"
                      onChange={(e) => {
                        debouncedSearch(e.target.value);
                        setSearchTerm(e.target.value);
                      }}
                      disableUnderline
                    />
                    <X
                      size={16}
                      className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
                      onClick={handleClose}
                    />
                    <button
                      onClick={() => handleSearch(searchTerm)}
                      className="text-sm px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                    >
                      Search
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {taskList && taskList.length > 0 ? (
                taskList
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((task, index) => (
                    <TableRow key={index}>
                      <TableCell>{task.id}</TableCell>
                      <TableCell>{task.tasktitle}</TableCell>
                      <TableCell>{task.description}</TableCell>
                      <TableCell>
                        {new Date(task.startdate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(task.enddate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {handleStatusEdit(
                          task.id || "",
                          task.priority,
                          task.isEdit ?? true,
                          "priority"
                        )}
                      </TableCell>
                      <TableCell>{task.assignee}</TableCell>
                      <TableCell>
                        {handleStatusEdit(
                          task.id || "",
                          task.email,
                          task.isEdit ?? true,
                          "email"
                        )}
                      </TableCell>
                      <TableCell>
                        {handleStatusEdit(
                          task.id || "",
                          task.status || "",
                          task.isEdit ?? true,
                          "status"
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() =>
                            handleSubmitBtn(task.id ?? "", task.isEdit ?? true)
                          }
                        >
                          {task.isEdit ? "Edit" : "Submit"}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleCancel(task.id || "")}
                          disabled={task.isEdit}
                        >
                          Cancel
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={10} align="center">
                    No task available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={taskList?.length}
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
