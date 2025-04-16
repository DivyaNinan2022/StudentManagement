"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  LabelList,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  AddTask,
  getTaskFnSlice,
  getTaskForOtherUsersSlice,
} from "@/redux/addTaskSlice";
import Loader from "@/components/Loader";
import Cookies from "js-cookie";
import "../../css/dashboard.css";
import DraggableComponents from "@/components/Dashboard/DraggbleComponents";
import { setLoadingNavBar } from "@/redux/navbarSlice";

export type modifiedDataType = {
  name: string;
  Draft: string;
  Pending: string;
  inProgress: string;
};
export type groupedDataType = {
  id: string;
  assignee: string;
  tasktitle: string;
};

export default function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const username = Cookies.get("UserEmail") || "";
  const permission = Cookies.get("LoginUserPermission") || "";

  useEffect(() => {
    if (permission == "1") {
      dispatch(getTaskFnSlice());
    } else {
      dispatch(getTaskForOtherUsersSlice(username));
    }
  }, []);

  const { tasks, loading } = useSelector((state: RootState) => state.addTask);
  const [taskValues, setTaskValues] = useState(tasks);
  const [modifiedData, setModifiedData] = useState<
    Record<string, { id: string; assignee: string; tasktitle: string }[]>
  >({});
  const [draftValues, setDraftValues] = useState<any[]>([]);
  const [pendingValues, setPendingValues] = useState<any[]>([]);
  const [progressValues, setProgressValues] = useState<any[]>([]);
  const [completedValues, setCompletedValues] = useState<any[]>([]);
  const { loadingNavBar } = useSelector((state: RootState) => state.navbar);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(setLoadingNavBar(false));
    };
    fetchData();
  }, []);

  useEffect(() => {
    setTaskValues(tasks);
    const groupedData = tasks?.reduce((acc, item: AddTask) => {
      if (item.status && item.assignee) {
        if (!acc[item.status]) {
          acc[item.status] = []; // Initialize an array for the status
        }
        acc[item.status].push({
          id: item.id || "",
          assignee: item.assignee,
          tasktitle: item.tasktitle,
        });
      }
      return acc;
    }, {} as Record<string, { id: string; assignee: string; tasktitle: string }[]>);
    // const draftvalues = groupedData?.Draft?.map((item) => {
    //   return item?.tasktitle;
    // });
    const draftvalues = groupedData?.Draft;
    const uniqueDraftValues = [...new Set(draftvalues)];
    const pendingvalues = groupedData?.Pending;
    const uniquePendingValues = [...new Set(pendingvalues)];
    const progressvalues = groupedData?.inProgress;
    const uniqueProgressValues = [...new Set(progressvalues)];
    const completedValues = groupedData?.Done || groupedData?.Completed;
    const uniqueCompletedValues = [...new Set(completedValues)];
    setDraftValues(uniqueDraftValues);
    setPendingValues(uniquePendingValues);
    setProgressValues(uniqueProgressValues);
    setCompletedValues(uniqueCompletedValues);
    setModifiedData(groupedData);
  }, [tasks]);

  const onDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    const activeTask = taskValues.find((task) => task.id === active.id);
    const newColumn = over.id;

    if (!activeTask || !newColumn || activeTask.status === newColumn) return;

    setTaskValues((prevTasks) =>
      prevTasks.map((task) =>
        task.id === activeTask.id ? { ...task, status: newColumn } : task
      )
    );
  };

  const lineChartData = Object.values(
    tasks.reduce(
      (
        acc: Record<
          string,
          { name: string; email: string; statuses: Record<string, number> }
        >,
        task
      ) => {
        if (!task.status) return acc;
        const key = task.email;
        if (!acc[key]) {
          acc[key] = { name: task.email, email: task.email, statuses: {} };
        }

        acc[key].statuses[task.status] =
          (acc[key].statuses[task.status] || 0) + 1;
        return acc;
      },
      {}
    )
  );

  const modifiedlineChartData = lineChartData.map((item) => {
    return {
      name: item.name,
      Draft: item?.statuses?.Draft,
      Pending: item?.statuses?.Pending,
      inProgress: item?.statuses?.inProgress,
      // ...item.statuses,
    };
  });

  const lineChartDataArray = Object.values(modifiedlineChartData);
  lineChartDataArray.push({
    name: "",
    Draft: 0,
    inProgress: 0,
    Pending: 0,
  });

  // function getStatusColor(status: string) {
  //   switch (status) {
  //     case "Draft":
  //       return "#111c99";
  //     case "inProgress":
  //       return "#ff0000";
  //     case "Pending":
  //       return "#dae330";
  //     case "Done":
  //       return "#10b981";
  //     default:
  //       return "#ff0000";
  //   }
  // }

  const handleDraggableComponent = useMemo(() => {
    const assignees = new Set<string>();

    Object.values(modifiedData).forEach((tasks) => {
      tasks.forEach((task: any) => {
        assignees.add(task.assignee);
      });
    });

    const getColorFromName = (name: string) => {
      let hash = 0;
      for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
      }
      const hue = hash % 360;
      return `hsl(${hue}, 70%, 85%)`;
    };

    const assigneeColorMap: Record<string, string> = {};
    assignees.forEach((assg) => {
      assigneeColorMap[assg] = getColorFromName(assg);
    });

    return (
      <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      {/* Top row: Assignee legend */}
      <div
        style={{
          maxHeight: "20vh",
          padding: "8px 12px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "10px",
          justifyContent: "center",
          overflowY: "auto",
        }}
      >
        {Object.entries(assigneeColorMap).map(([name, color]) => (
          <div
            key={name}
            style={{
              display: "flex",
              alignItems: "center",
              flex: "1 1 120px", // Grow to fill space but wrap
              maxWidth: "160px",
              minWidth: "100px",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: color,
                borderRadius: "50%",
                marginRight: "6px",
              }}
            />
            <span style={{ fontSize: "0.9rem", whiteSpace: "nowrap" }}>{name}</span>
          </div>
        ))}
      </div>
    
      {/* Bottom row: Draggable components */}
      <div style={{ flex: 1, overflow: "auto", padding: "12px" }}>
        <DraggableComponents
          taskValues={modifiedData ?? {}}
          setTaskValues={setModifiedData}
          draftValues={draftValues}
          progressValues={progressValues}
          pendingValues={pendingValues}
          completedValues={completedValues}
        />
      </div>
    </div>
    
    );
  }, [modifiedData, draftValues, progressValues, pendingValues]);
  console.log(loading, "loaderrrr", loadingNavBar);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Task Management Dashboard</h1>
        <div className="dashboard-stats">
          <div className="stat-card">
            <span className="stat-number">{taskValues.length}</span>
            <span className="stat-label">Total Tasks</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">
              {
                taskValues.filter(
                  (t) => t.status === "Done" || t.status === "Completed"
                ).length
              }
            </span>
            <span className="stat-label">Completed</span>
          </div>
        </div>
      </header>

      {loading || loadingNavBar ? (
        <div className="dashboard-loader">
          <Loader />
        </div>
      ) : (
        <>
          <section className="dashboard-analytics">
            <h2 className="section-title">Task Progress Over Time</h2>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                  // width={780}
                  height={250}
                  data={lineChartDataArray}
                  margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                >
                  <defs>
                    <linearGradient id="colorDraft" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="colorPending"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#ff4d4d" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#ff4d4d" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="colorInProgress"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="name"
                    interval={0}
                    dx={50}
                    angle={0}
                    textAnchor="start"
                    tick={{ fontSize: 14 }}
                    padding={{ right: 30 }}
                    domain={[0, "dataMax + 1"]}
                    // hide
                    allowDataOverflow
                  />
                  <YAxis tick={{ fontSize: 10 }} domain={[0, "dataMax + 1"]} />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Legend verticalAlign="top" height={36} />
                  <Area
                    type="monotone"
                    dataKey="Draft"
                    stroke="#111c99" // dark blue
                    fillOpacity={1}
                    fill="url(#colorDraft)"
                  >
                    <LabelList
                      dataKey="Draft"
                      content={(props) => {
                        const { x, y } = props;
                        return (
                          <text
                            x={(x as number) - 15}
                            y={(y as number) - 10}
                            dy={-5}
                            fill="#111c99" // dark blue
                            fontSize={10}
                            textAnchor="middle"
                          >
                            Draft
                          </text>
                        );
                      }}
                      position="insideTop"
                      dx={200}
                      // dy={50}
                      color="#111c99" // dark blue
                      fontSize={10}
                    />
                  </Area>
                  <Area
                    type="monotone"
                    dataKey="Pending"
                    stroke="#ff0000" // dark red
                    fillOpacity={1}
                    fill="url(#colorPending)"
                  >
                    {" "}
                    <LabelList
                      dataKey="Pending"
                      content={(props) => {
                        const { x, y } = props;
                        return (
                          <text
                            x={x}
                            y={y}
                            dy={-5}
                            fill="#ff0000" // dark red
                            fontSize={10}
                            textAnchor="middle"
                          >
                            Pending
                          </text>
                        );
                      }}
                      position="insideTop"
                      dx={200}
                      // dy={50}
                      color="#ff0000" // dark red
                      fontSize={10}
                    />
                  </Area>
                  <Area
                    type="monotone"
                    dataKey="inProgress"
                    stroke="#0c470a" // dark green
                    fillOpacity={1}
                    fill="url(#colorInProgress)"
                  >
                    {" "}
                    <LabelList
                      dataKey="inProgress"
                      content={(props) => {
                        const { x, y } = props;
                        return (
                          <text
                            x={(x as number) + 15}
                            y={(y as number) + 5}
                            dy={-5}
                            fill="#0c470a" // dark green
                            fontSize={10}
                            textAnchor="middle"
                          >
                            In Progress
                          </text>
                        );
                      }}
                      position="insideTop"
                      dx={200}
                      // dy={50}
                      color="#0c470a" // dark green
                      fontSize={10}
                    />
                  </Area>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="dashboard-kanban">
            <h2 className="section-title">Task Board</h2>

            {handleDraggableComponent}
            {/* <DndContext
              collisionDetection={closestCorners}
              onDragEnd={onDragEnd}
            >
              <div className="kanban-grid compact">
                {statusColumns.map((status) => (
                  <SortableContext
                    key={status}
                    id={status}
                    items={taskValues
                      ?.filter((task) => task.id !== undefined)
                      .map((task) => String(task.id))}
                    strategy={verticalListSortingStrategy}
                  >
                    <Column
                      title={status}
                      tasks={taskValues}
                      setTasks={setTaskValues}
                      color={getStatusColor(status)}
                      compact
                    />
                  </SortableContext>
                ))}
              </div>
            </DndContext> */}
          </section>
        </>
      )}
    </div>
  );
}
