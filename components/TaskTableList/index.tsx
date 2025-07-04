"use client";
import React, { useCallback, useEffect, useState } from "react";
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
  Box,
  debounce,
} from "@mui/material";
import {
  addTaskSelector,
  getEmailForAssigneeFnInSlice,
  getTaskFnSlice,
  getTaskForOtherUsersSlice,
  searchByEmail,
  sendtEmailsFnInSlice,
  updateTaskFnSlice,
} from "@/redux/addTaskSlice";
import { useDispatch, useSelector } from "react-redux";
import { statusColumns, TaskListEditable } from "@/lib/config";
import { AppDispatch, RootState } from "@/redux/store";
import { formatEmailMessage } from "@/lib/utils";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import Cookies from "js-cookie";
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
  // Access data and loading state from Redux store
  const { priorities, emails, loading, tasksWithCount } =
    useSelector(addTaskSelector);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const updatedTasks =
    tasksWithCount?.data?.map((task) => ({
      ...task,
      isEdit: true,
    })) || [];

  const tasksVal: AddTaskWithEdit[] = updatedTasks?.map((task) => ({
    ...task,
    isEdit: true,
  }));
  console.log("11tasksWithCount?.data", tasksVal);
  const [taskList, setTaskList] = useState<AddTaskWithEdit[]>(tasksVal);
  const [searchTerm, setSearchTerm] = useState("");
  const { isOpen, loadingNavBar } = useSelector(
    (state: RootState) => state.navbar
  );

  const emailArray = emails?.map((item) => item?.email);

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

  const handleChangePage = async (_event: unknown, newPage: number) => {
    const p = newPage + 1;
    await dispatch(getTaskFnSlice(p?.toString())).then((res) => {
      console.log(res, "ressss");
      if (res?.payload && res?.payload?.data) {
        const updatedTasksWithEdit = res.payload.data.map((task: any) => ({
          ...task,
          isEdit: true,
        }));
        console.log("Updated Tasks with isEdit:", updatedTasksWithEdit);
        setTaskList(updatedTasksWithEdit);
      } else {
        toast.error("oops! something went wrong. Please try again later");
      }
    });
    setPage(newPage);
  };

  // after your useState
useEffect(() => {
  console.log("taskList changed: ", taskList);
}, [taskList]);

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
              const username = Cookies.get("UserEmail") || "";
              let res1;
              if (permission === "1") {
                const p = page?.toString();
                res1 = await dispatch(getTaskFnSlice(p));
              } else {
                res1 = await dispatch(getTaskForOtherUsersSlice(username));
              }
              if (res1?.payload && res.payload.length > 0) {
                const updatedPayload = res.payload.map((task: any) => ({
                  ...task,
                  isEdit: true,
                }));
                setTaskList(updatedPayload);
              }
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
          {isEdit === false ? (
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
    [taskList]
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

  // const debouncedSearch = useCallback(debounce(handleSearch, 300), []);

  const handleClose = async () => {
    setSearchTerm("");
    const p = page?.toString();
    console.log("pppp", page);
    await dispatch(getTaskFnSlice(p)).then((res: any) => {
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

  return (
    <div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Box sx={{ overflowX: "auto" }}>
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
                  {permission === "1" ? (
                    <TableCell colSpan={2}>
                      <div className="flex items-center border border-gray-300 rounded-md px-3 py-1.5 bg-white shadow-sm gap-2 w-full max-w-md">
                        <Input
                          type="text"
                          placeholder="Search Email..."
                          value={searchTerm}
                          className="flex-1 text-sm bg-transparent border-none outline-none focus:ring-0 placeholder-gray-400"
                          onChange={(e) => {
                            // debouncedSearch(e.target.value);
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
                  ) : null}
                </TableRow>
              </TableHead>
              <TableBody>
                {taskList && taskList.length > 0 ? (
                  taskList
                    ?.map((task, index) => (
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
                              handleSubmitBtn(
                                task.id ?? "",
                                task.isEdit ?? true
                              )
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
        </Box>
        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={tasksWithCount?.totalCount || 8}
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
