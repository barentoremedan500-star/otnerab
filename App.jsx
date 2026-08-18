import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Study JavaScript", completed: false },
    { id: 2, title: "Practice React", completed: true },
    { id: 3, title: "Finish assignment", completed: false },
  ]);

  const [newTask, setNewTask] = useState("");

  function addTask() {
    if (newTask.trim() === "") return;

    const task = {
      id: Date.now(),
      title: newTask,
      completed: false,
    };

    setTasks([...tasks, task]);
    setNewTask("");
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Focus Hub</h1>
          <p>Stay focused. Stay productive.</p>
        </div>

        <div className="profile">
          <div className="avatar">B</div>
          <span>Student</span>
        </div>
      </header>

      <main className="container">
        <section className="welcome">
          <h2>Welcome back! 👋</h2>
          <p>Let's make today productive.</p>
        </section>

        <section className="stats">
          <div className="stat-card">
            <span className="icon">📚</span>
            <div>
              <h3>{tasks.length}</h3>
              <p>Total Tasks</p>
            </div>
          </div>

          <div className="stat-card">
            <span className="icon">✅</span>
            <div>
              <h3>{completedTasks}</h3>
              <p>Completed</p>
            </div>
          </div>

          <div className="stat-card">
            <span className="icon">🎯</span>
            <div>
              <h3>
                {tasks.length === 0
                  ? 0
                  : Math.round((completedTasks / tasks.length) * 100)}
                %
              </h3>
              <p>Progress</p>
            </div>
          </div>
        </section>

        <section className="content">
          <div className="tasks-section">
            <div className="section-header">
              <div>
                <h2>My Tasks</h2>
                <p>Manage your daily tasks</p>
              </div>
            </div>

            <div className="add-task">
              <input
                type="text"
                placeholder="Add a new task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addTask();
                  }
                }}
              />

              <button onClick={addTask}>Add Task</button>
            </div>

            <div className="task-list">
              {tasks.map((task) => (
                <div className="task" key={task.id}>
                  <div className="task-left">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                    />

                    <span className={task.completed ? "completed" : ""}>
                      {task.title}
                    </span>
                  </div>

                  <button
                    className="delete-btn"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}

              {tasks.length === 0 && (
                <p className="empty">No tasks yet. Add one above!</p>
              )}
            </div>
          </div>

          <aside className="focus-card">
            <div className="focus-icon">⏱️</div>

            <h2>Focus Timer</h2>

            <p>Stay focused for your next study session.</p>

            <div className="timer">25:00</div>

            <button className="start-btn">Start Focus</button>
          </aside>
        </section>
      </main>
    </div>
  );
}

export default App;