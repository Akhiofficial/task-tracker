// AddTask.jsx
import React, { useState, useEffect } from "react";

const AddTask = ({ taskList, setTaskList }) => {
  const [addModal, setAddModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const storedTasks = localStorage.getItem("taskList");
    if (storedTasks) {
      setTaskList(JSON.parse(storedTasks));
    }
  }, [setTaskList]);

  const handleInput = (e) => {
    const { name, value } = e.target;

    if (name === "projectName") {
      setProjectName(value);
      if (value.trim() !== "") {
        setErrorMessage("");
      }
    }

    if (name === "taskDescription") {
      setTaskDescription(value);
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();

    if (projectName.trim() === "") {
      setErrorMessage("Enter Project Name");
      return;
    } else {
      const id = new Date().getTime();
      const timestamp = new Date().toLocaleString();
      const newTask = { id, projectName, taskDescription, timestamp };

      const updatedTaskList = [...taskList, newTask];
      setTaskList(updatedTaskList);

      localStorage.setItem("taskList", JSON.stringify(updatedTaskList));

      setAddModal(false);
      setProjectName("");
      setTaskDescription("");
      setErrorMessage("");
    }
  };

  return (
    <div className="flex justify-center mb-4">
      <button
        className="bg-purple-500 text-white uppercase text-sm font-semibold py-2 px-4 rounded hover:opacity-75"
        type="button"
        onClick={() => setAddModal(true)}
      >
        + New Task
      </button>

      {addModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-md p-4 w-1/2">
            <h2 className="text-lg font-bold mb-2">Add New Task</h2>
            <form onSubmit={handleAdd}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="project-name"
                >
                  Project Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="project-name"
                  name="projectName"
                  placeholder="Project name"
                  value={projectName}
                  onChange={handleInput}
                  required
                />
                {errorMessage && (
                  <p className="text-red-500 text-xs italic">{errorMessage}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="task-description"
                >
                  Task Description
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus: shadow-outline"
                  id="task-description"
                  rows="5"
                  placeholder="Task description"
                  name="taskDescription"
                  value={taskDescription}
                  onChange={handleInput}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-purple-500 text-white uppercase text-sm font-semibold py-2 px-4 rounded hover:opacity-75"
                  type="submit"
                >
                  Add Task
                </button>
                <button
                  className="bg-red-500 text-white uppercase text-sm font-semibold py-2 px-4 rounded hover:opacity-75"
                  type="button"
                  onClick={() => setAddModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTask;