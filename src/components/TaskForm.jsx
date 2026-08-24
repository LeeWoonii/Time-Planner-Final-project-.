import { useEffect, useRef, useState } from "react";
import { Task } from "../utils/Task";

const pattern = /^[A-Za-z0-9\s]{3,50}$/;
const today = () => new Date().toISOString().slice(0, 10);
const validateDate = (date) =>
  !date ? "Choose a date." : date < today() ? "Date cannot be in the past." : "Date looks good.";
const validateTime = (date, time) => {
  if (!time) {
    return "Choose a time.";
  }

  if (
    date === today() &&
    `${date}T${time}` < new Date().toISOString().slice(0, 16)
  ) {
    return "Time has already passed.";
  }

  return "Time looks good.";
};

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [category, setCategory] = useState("Personal");
  const [error, setError] = useState("");
  const titleRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, []);

  const titleMsg = !title
    ? "Enter a title."
    : pattern.test(title)
      ? "Title looks good."
      : "Use 3-50 letters, numbers, or spaces.";
  const dateMsg = validateDate(date);
  const timeMsg = validateTime(date, time);

  const submit = (event) => {
    event.preventDefault();

    try {
      if (!pattern.test(title)) {
        throw new Error("Please enter a valid title.");
      }
      if (dateMsg !== "Date looks good.") {
        throw new Error(dateMsg);
      }
      if (timeMsg !== "Time looks good.") {
        throw new Error(timeMsg);
      }

      onAddTask(new Task(title.trim(), description.trim(), date, time, category));
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      if (
        !error &&
        pattern.test(title) &&
        dateMsg === "Date looks good." &&
        timeMsg === "Time looks good."
      ) {
        setTitle("");
        setDescription("");
        setDate("");
        setTime("");
        setCategory("Personal");
      }
    }
  };

  const key = (event) => {
    if (event.key === "Enter" && !event.shiftKey && event.target.tagName !== "TEXTAREA") {
      submit(event);
    }
  };

  return (
    <form className="card shadow-sm border-0" onSubmit={submit} onKeyDown={key}>
      <div className="card-body p-4">
        <h2 className="h4 mb-3">Add a task</h2>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Title</label>
            <input
              ref={titleRef}
              className="form-control"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <div
              className={`small mt-1 ${
                pattern.test(title) ? "text-success" : "text-danger"
              }`}
            >
              {titleMsg}
            </div>
          </div>

          <div className="col-md-6">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option>Work</option>
              <option>Personal</option>
              <option>Study</option>
            </select>
          </div>

          <div className="col-12">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows="2"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
            <div
              className={`small mt-1 ${
                dateMsg === "Date looks good." ? "text-success" : "text-danger"
              }`}
            >
              {dateMsg}
            </div>
          </div>

          <div className="col-md-6">
            <label className="form-label">Time</label>
            <input
              type="time"
              className="form-control"
              value={time}
              onChange={(event) => setTime(event.target.value)}
            />
            <div
              className={`small mt-1 ${
                timeMsg === "Time looks good." ? "text-success" : "text-danger"
              }`}
            >
              {timeMsg}
            </div>
          </div>

          <div className="col-12">
            <button className="btn btn-primary w-100">Add task</button>
          </div>
        </div>
      </div>
    </form>
  );
}


export default TaskForm;
