import TaskCard from "./TaskCard";

function TaskList({
  tasks,
  onDeleteTask,
  onEditTask,
  filterCategory,
}) {
  const filtered = tasks.filter(
    (task) => filterCategory === "All" || task.category === filterCategory,
  );

  const delegated = (event) => {
    const button = event.target.closest(".delete-task");

    if (!button) {
      return;
    }

    const id = button.dataset.taskId;

    if (window.confirm("Delete this task?")) {
      onDeleteTask(id);
    }
  };

  return (
    <div className="row g-3" onClick={delegated}>
      {filtered.length === 0 ? (
        <div className="col-12">
          <div className="alert alert-light border">No tasks yet.</div>
        </div>
      ) : (
        filtered.map((task) => (
          <div className="col-md-6 col-xl-4" key={task.id}>
            <TaskCard task={task} onEditTask={onEditTask} />
          </div>
        ))
      )}
    </div>
  );
}


export default TaskList;
