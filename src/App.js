import { useState } from "react";
import './App.css';

function App() {
  const [task, setTask] = useState({
    date: "",
    task: "",
    priority: 3,
  });
  const [editTask, setEditTask] = useState({
    date: "",
    task: "",
    priority: 3,
  });
  const [list, setList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [priority, setPriority] = useState(false);
  const [sortDate, setSortDate] = useState(false);

  // to add task
  const addTask = () => {
    let taskList = list;
    taskList.push(task);
    setList(taskList);
    console.log("Task Added.");
    setTask({
      date: "",
      task: "",
      priority: 3,
    });
  };

  // to add task
  const editTaskfun = () => {
    let taskList = list;
    taskList[editIndex] = editTask;
    setList(taskList);
    setEditTask({
      date: "",
      task: "",
      priority: 3,
    });
    setEditIndex(null);
    console.log("Task Edited.");
  };

  // to set task to edit
  const setEdit = (item, index) => {
    setEditTask(item);
    setEditIndex(index);
    console.log("Edit Task Set.");
  };

  // to delete task
  const deleteTask = (task) => {
    let taskList = list;
    taskList = taskList.filter((i) => i.task !== task);
    // taskList.splice(index, 1);
    setList(taskList);
    console.log("Task Deleted.");
  };

  // to sort task by priority
  const sortByPriority = () => {
    let taskList = list;
    if (priority) {
      taskList = taskList.sort((a, b) => a.priority - b.priority).map((v) => v);
    } else {
      taskList = taskList.sort((a, b) => b.priority - a.priority).map((v) => v);
    }
    setList(taskList);
    setPriority(!priority);
    console.log("Task Sorted by Priority.");
  };

  // to sort task by priority
  const sortByDate = () => {
    let taskList = list;
    if (sortDate) {
      taskList = taskList
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map((v) => v);
    } else {
      taskList = taskList
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((v) => v);
    }
    setList(taskList);
    setSortDate(!sortDate);
    console.log("Task Sorted by Date.");
  };

  return (
    <div className="App">
      {/* Add Form */}
      <div className="add-form">
        <h2>Add Form</h2>
        <form>
          <div>
            <label htmlFor="date">Date: </label>
            <input
              type="date"
              name="date"
              value={task.date}
              onChange={(e) => {
                setTask({ ...task, date: e.target.value });
              }}
              id="date"
            />
          </div>
          <div>
            <label htmlFor="task">Task: </label>
            <input
              type="text"
              name="task"
              value={task.task}
              onChange={(e) => {
                setTask({ ...task, task: e.target.value });
              }}
              id="task"
            />
          </div>
          <div>
            <label htmlFor="priority">Priority: </label>
            <select
              name="priority"
              value={task.priority}
              onChange={(e) => {
                setTask({ ...task, priority: e.target.value });
              }}
              id="priority"
            >
              <option>Select Priority</option>
              <option value={1}>High</option>
              <option value={2}>Medium</option>
              <option value={3}>Low</option>
            </select>
          </div>
          <div>
            <input type="button" onClick={addTask} value="Add Task" />
          </div>
        </form>
      </div>
      {/* List Table */}
      <div className="task-table">
        <h2>List of Task</h2>
        <table>
          <thead>
            <tr>
              <td>Sr. No.</td>
              <td>
                Date <button onClick={sortByDate}>Sort</button>
              </td>
              <td>Task</td>
              <td>
                Priority <button onClick={sortByPriority}>Sort</button>
              </td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.date}</td>
                <td>{item.task}</td>
                <td>
                  {item.priority == 1
                    ? "High"
                    : item.priority == 2
                    ? "Medium"
                    : "Low"}
                </td>
                <td>
                  <div className="">
                    <button onClick={() => setEdit(item, index)}>Edit</button>
                    <button onClick={() => deleteTask(item.task)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Edit Form */}
      <div className="edit-form">
        <h2>Edit Form</h2>
        <form>
          <div>
            <label htmlFor="date">Date: </label>
            <input
              type="date"
              name="date"
              value={editTask.date}
              onChange={(e) => {
                setEditTask({ ...editTask, date: e.target.value });
              }}
              id="date"
            />
          </div>
          <div>
            <label htmlFor="task">Task: </label>
            <input
              type="text"
              name="task"
              value={editTask.task}
              onChange={(e) => {
                setEditTask({ ...editTask, task: e.target.value });
              }}
              id="task"
            />
          </div>
          <div>
            <label htmlFor="priority">Priority: </label>
            <select
              name="priority"
              value={editTask.priority}
              onChange={(e) => {
                setEditTask({ ...editTask, priority: e.target.value });
              }}
              id="priority"
            >
              <option>Select Priority</option>
              <option value={1}>High</option>
              <option value={2}>Medium</option>
              <option value={3}>Low</option>
            </select>
          </div>
          <div>
            <input type="button" onClick={editTaskfun} value="Edit Task" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
