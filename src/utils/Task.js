const titlePattern = /^[A-Za-z0-9\s]{3,50}$/;

function Task(title, description, date, time, category = "Personal", id = Date.now().toString()) {
  this.id = id;
  this.title = title;
  this.description = description;
  this.date = date;
  this.time = time;
  this.category = category;
}

Task.prototype.getFormattedDate = function() {
  return new Date(`${this.date}T00:00:00`).toLocaleDateString(undefined, { weekday: "short", year: "numeric", month: "short", day: "numeric" });
};

Task.prototype.setTitle = function(newTitle) {
  if (!titlePattern.test(newTitle.trim())) throw new Error("Title must be 3-50 letters, numbers, or spaces.");
  this.title = newTitle.trim();
};

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks.map(task => ({
    id: task.id,
    title: task.title,
    description: task.description,
    date: task.date,
    time: task.time,
    category: task.category
  }))));
}

function loadTasks() {
  const data = localStorage.getItem("tasks");
  if (!data) return [];
  try {
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed)) {
      return parsed.map(item => new Task(item.title || "", item.description || "", item.date || "", item.time || "", item.category || "Personal", item.id || Date.now().toString()));
    }
  } catch {}
  return data.split(";").filter(Boolean).map(row => {
    const [id, title, description, date, time, category] = row.split("|");
    return new Task(title || "", description || "", date || "", time || "", category || "Personal", id || Date.now().toString());
  });
}

export { Task, saveTasks, loadTasks };
