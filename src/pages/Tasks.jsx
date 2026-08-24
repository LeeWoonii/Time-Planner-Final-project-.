import { useCallback, useEffect, useMemo, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { loadTasks, saveTasks, Task } from "../utils/Task";

function Tasks() {
  const [tasks, setTasks] = useState(() => loadTasks());
  const [filterCategory, setFilterCategory] = useState("All");
  const [notice, setNotice] = useState("");
  const [width, setWidth] = useState(window.innerWidth);
  const [reminded, setReminded] = useState(new Set());

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    const sync = (event) => {
      if (event.key === "tasks") {
        setTasks(loadTasks());
      }
    };

    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  useEffect(() => {
    const resize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();

      tasks.forEach((task) => {
        const due = new Date(`${task.date}T${task.time}`);

        if (now >= due && !reminded.has(task.id)) {
          alert(`Reminder: ${task.title} is due now.`);
          setReminded((previous) => new Set(previous).add(task.id));
        }
      });
    }, 30000);

    return () => clearInterval(timer);
  }, [tasks, reminded]);

  const add = useCallback((task) => {
    setTasks((previous) => [...previous, task]);
    setNotice("Task added successfully.");
    setTimeout(() => setNotice(""), 3000);
  }, []);

  const del = useCallback((id) => {
    setTasks((previous) => previous.filter((task) => task.id !== id));
  }, []);

  const edit = useCallback((id, updates) => {
    setTasks((previous) =>
      previous.map((task) => {
        if (task.id !== id) {
          return task;
        }

        const copy = new Task(
          task.title,
          task.description,
          task.date,
          task.time,
          task.category,
          task.id,
        );

        ["title", "description", "date", "time", "category"].forEach(
          (fieldName) => {
            copy[fieldName] = updates[fieldName];
          },
        );

        return copy;
      }),
    );
  }, []);

  const stats = useMemo(
    () =>
      tasks.reduce((acc, task) => {
        acc[task.category] = (acc[task.category] || 0) + 1;
        return acc;
      }, { Work: 0, Personal: 0, Study: 0 }),
    [tasks],
  );

  return (
    <div className="container py-4 py-md-5">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h1 className="fw-bold mb-1">My Tasks</h1>
          <p className="text-secondary mb-0">Screen: {width}px</p>
        </div>
        <select
          className="form-select filter-select"
          value={filterCategory}
          onChange={(event) => setFilterCategory(event.target.value)}
        >
          <option>All</option>
          <option>Work</option>
          <option>Personal</option>
          <option>Study</option>
        </select>
      </div>

      {notice && <div className="alert alert-success">{notice}</div>}

      <div className="row g-4">
        <div className="col-lg-5">
          <TaskForm onAddTask={add} />

          <div className="row g-2 mt-1">
            {Object.entries(stats).map(([name, count]) => (
              <div className="col-4" key={name}>
                <div className="stat-card">
                  <strong>{count}</strong>
                  <span>{name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-lg-7">
          <TaskList
            tasks={tasks}
            onDeleteTask={del}
            onEditTask={edit}
            filterCategory={filterCategory}
          />
        </div>
      </div>
    </div>
  );
}


export default Tasks;
