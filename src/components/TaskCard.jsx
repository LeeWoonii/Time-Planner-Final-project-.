import { memo, useEffect, useState } from "react";

const statusOf = (task) => {
  const now = new Date();
  const due = new Date(`${task.date}T${task.time}`);

  if (due < now) {
    return "Overdue";
  }

  if (task.date === now.toISOString().slice(0, 10)) {
    return "Due today";
  }

  return "Upcoming";
};

function TaskCard({ task, onEditTask }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ ...task });
  const [error, setError] = useState("");

  useEffect(() => {
    setDraft({ ...task });
  }, [task]);

  useEffect(() => {
    if (!editing) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setDraft({ ...task });
        setEditing(false);
        setError("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [editing, task]);

  const status = statusOf(task);
  const bg =
    status === "Overdue" ? "#fff0f0" : status === "Due today" ? "#fff9db" : "#fff";

  const change = (fieldName, value) =>
    setDraft((previous) => ({ ...previous, [fieldName]: value }));

  const cancel = () => {
    setDraft({ ...task });
    setEditing(false);
    setError("");
  };

  const save = () => {
    const today = new Date().toISOString().slice(0, 10);

    if (!/^[A-Za-z0-9\s]{3,50}$/.test(draft.title.trim())) {
      return setError("Title must be 3-50 valid characters.");
    }

    if (draft.date < today) {
      return setError("Date cannot be in the past.");
    }

    if (!draft.time) {
      return setError("Choose a time.");
    }

    if (
      draft.date === today &&
      `${draft.date}T${draft.time}` < new Date().toISOString().slice(0, 16)
    ) {
      return setError("Time has already passed.");
    }

    onEditTask(task.id, {
      ...draft,
      title: draft.title.trim(),
      description: draft.description.trim(),
    });
    setEditing(false);
    setError("");
  };

  const key = (event) => {
    if (event.key === "Enter" && event.target.tagName !== "TEXTAREA") {
      save();
    }
  };

  if (editing) {
    return (
      <div className="card h-100 shadow-sm" style={{ backgroundColor: bg }}>
        <div className="card-body" onKeyDown={key}>
          <h3 className="h5">Edit task</h3>

          {error && <div className="alert alert-danger py-2">{error}</div>}

          <input
            className="form-control mb-2"
            value={draft.title}
            onChange={(event) => change("title", event.target.value)}
          />
          <textarea
            className="form-control mb-2"
            value={draft.description}
            onChange={(event) => change("description", event.target.value)}
          />

          <div className="row g-2">
            <div className="col-6">
              <input
                type="date"
                className="form-control"
                value={draft.date}
                onChange={(event) => change("date", event.target.value)}
              />
            </div>
            <div className="col-6">
              <input
                type="time"
                className="form-control"
                value={draft.time}
                onChange={(event) => change("time", event.target.value)}
              />
            </div>
          </div>

          <select
            className="form-select my-2"
            value={draft.category}
            onChange={(event) => change("category", event.target.value)}
          >
            <option>Work</option>
            <option>Personal</option>
            <option>Study</option>
          </select>

          <div className="d-flex gap-2">
            <button type="button" className="btn btn-success btn-sm" onClick={save}>
              Save
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={cancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card h-100 shadow-sm" style={{ backgroundColor: bg }}>
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between gap-2">
          <h3 className="h5">{task.title}</h3>
          <span className="badge text-bg-primary align-self-start">{task.category}</span>
        </div>
        <p className="text-secondary small flex-grow-1">
          {task.description || "No description"}
        </p>
        <div className="small mb-3">
          <strong>{task.getFormattedDate()}</strong> · {task.time}
          <br />
          <span
            className={
              status === "Overdue"
                ? "text-danger"
                : status === "Due today"
                  ? "text-warning"
                  : "text-success"
            }
          >
            {status}
          </span>
        </div>
        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={() => setEditing(true)}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm delete-task"
            data-task-id={task.id}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(TaskCard);
