"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "../../css/addTask.css";
import {
  AddTask,
  addTaskFnSlice,
  addTaskSelector,
  getEmailForAssigneeFnInSlice,
  getEmailsFnInSlice,
  getPrioritiesFnInSlice,
} from "@/redux/addTaskSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

// Updated validation schema
const schema = yup.object({
  tasktitle: yup.string().required("Title is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  priority: yup.string().required("Priority is required"),
  startdate: yup.string().required("Start date is required"),
  enddate: yup.string().required("End date is required"),
  description: yup.string().required("Description is required"),
  assignee: yup.string().required("Assignee is required"),
});

export default function Page() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch<AppDispatch>();
  const [selectedStartDate, setSelectedStartDate] = useState<Date>();
  const [selectedEndDate, setSelectedEndDate] = useState<Date>();

  useEffect(() => {
    // dispatch(getPrioritiesFnInSlice("priority")).then((res) => {
    //   if (res?.payload?.length > 0) {
    //     setPrioritiesList(res?.payload);
    //   }
    // });
    dispatch(getPrioritiesFnInSlice());
    dispatch(getEmailsFnInSlice());
  }, [dispatch]);

  // Access data and loading state from Redux store
  const { priorities, emails, loading, error, username } =
    useSelector(addTaskSelector);
  const { isOpen } = useSelector((state: RootState) => state.navbar);

  const priorityList =
    priorities &&
    priorities?.length > 0 &&
    priorities?.map((item) => item?.value);

  const onSubmit: SubmitHandler<AddTask> = (data: AddTask) => {
    dispatch(
      addTaskFnSlice({
        ...data,
        status: "Draft",
        startdate: new Date(data.startdate).toISOString(),
        enddate: new Date(data.enddate).toISOString(),
      })
    );
  };

  const emailArray = emails?.map((item) => item.email);

    const handleAssigneName = async (value:string) => {
      // const value = watch("email");
      if (value) {
        const res = await dispatch(getEmailForAssigneeFnInSlice(value));
        const assigneeName = res?.payload[0]?.username || username;
        setValue("assignee", assigneeName);
        setValue("email", value);
      }
    };

  return (
    <div
      className={
        isOpen ? "mainConatainerForAddTask" : "mainConatainerForAddTaskClosed"
      }
    >
      <div className="container" style={{ maxWidth: "850px" }}>
        <h1>Task Management</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <div className="form-group">
              <label>📌 Title</label>
              <input
                type="text"
                className="inputStyle"
                placeholder="Enter task title"
                {...register("tasktitle")}
              />
              <p className="error">{errors.tasktitle?.message}</p>
            </div>
            <div className="form-group">
              <label>🔥 Priority</label>
              <select className="selectStyle" {...register("priority")}>
                <option value="">Select Priority</option>
                {priorityList &&
                  priorityList?.length > 0 &&
                  priorityList?.map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
              </select>
              <p className="error">{errors.priority?.message}</p>
            </div>
          </div>

          <div className="form-group">
            <label>📝 Description</label>
            <textarea
              className="inputStyle"
              placeholder="Describe the task..."
              {...register("description")}
            />
            <p className="error">{errors.description?.message}</p>
          </div>

          <div className="form-row">
            <div
              className="form-group"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <label>⏳ Start Date</label>
              <DayPicker
                style={{
                  position: "inherit",
                  maxWidth: "380px",
                  display: "flex",
                  justifyContent: "center",
                }}
                className="inputStyle border p-2 rounded"
                mode="single"
                selected={selectedStartDate}
                timeZone="UTC"
                onSelect={(date) => {
                  setSelectedStartDate(date);
                  setValue("startdate", date?.toString() || "");
                }}
                {...register("startdate")}
              />
              {selectedStartDate && (
                <p>Selected Date: {getValues("startdate").slice(3, 15)}</p>
              )}

              <p className="error">{errors.startdate?.message}</p>
            </div>
            <div
              className="form-group"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <label>📅 End Date</label>
              <DayPicker
                style={{
                  position: "inherit",
                  maxWidth: "380px",
                  display: "flex",
                  justifyContent: "center",
                }}
                className="inputStyle border p-2 rounded"
                mode="single"
                timeZone="UTC"
                disabled={(date) =>
                  selectedStartDate ? date < selectedStartDate : true
                }
                selected={selectedEndDate}
                onSelect={(date) => {
                  setSelectedEndDate(date);
                  setValue("enddate", date?.toString() || "");
                }}
                {...register("enddate")}
              />
              {selectedEndDate && (
                <p>Selected Date: {getValues("enddate").slice(3, 15)}</p>
              )}
              <p className="error">{errors.enddate?.message}</p>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>👤 Assignee</label>
              <input
                type="text"
                className="inputStyle"
                placeholder="Enter Assignee Name"
                disabled
                {...register("assignee")}
              />
              <p className="error">{errors.assignee?.message}</p>
            </div>
            <div className="form-group">
              <label>🔥 Email</label>
              <select
                className="selectStyle"
                {...register("email")}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  handleAssigneName(e.target.value)
                }
              >
                <option value="">Select Email</option>
                {emailArray &&
                  emailArray?.length > 0 &&
                  emailArray?.map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
              </select>
              <p className="error">{errors.email?.message}</p>
            </div>
          </div>

          <button type="submit">➕ Add Task</button>
        </form>
      </div>
    </div>
  );
}
