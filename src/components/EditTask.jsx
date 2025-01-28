import { useEffect, useState } from 'react';
import React from 'react';

const EditTask = ({ task,  taskList, setTaskList }) => {
  const [editModal, setEditModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  // Update state only when the `task` prop changes
  useEffect(() => {
    setProjectName(task.projectName);
    setTaskDescription(task.taskDescription);
  }, [task]); // Dependency array ensures this runs only when `task` changes

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "projectName") setProjectName(value);
    if (name === "taskDescription") setTaskDescription(value);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
  
    // Find the index of the task to update
    const taskIndex = taskList.indexOf(task);
  
    // Create a copy of the task list
    const updatedTaskList = [...taskList];
  
    // Update the task at the specific index
    const updatedTimestamp = new Date().toLocaleString(); // Update the timestamp
    updatedTaskList[taskIndex] = {
      ...task,
      projectName,
      taskDescription,
      timestamp: updatedTimestamp, // Include the updated timestamp
    };
  
    // Set the updated task list
    setTaskList(updatedTaskList);
  
    // Save the updated task list to local storage
    localStorage.setItem("taskList", JSON.stringify(updatedTaskList));
  
    // Close the modal
    setEditModal(false);
  };

  return (
    <>
      {/* Edit Button */}
      <button
        className="bg-gray-500 text-white text-sm uppercase font-semibold py-1.5 px-3 mb-1 rounded-lg"
        onClick={() => setEditModal(true)}
      >
        Edit
      </button>

      {/* Edit Modal */}
      {editModal && (
        <div className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-100">
          <div className="w-9/12 bg-white border max-w-lg rounded-lg shadow-md relative flex flex-col">
            {/* Modal Header */}
            <div className="w-full flex flex-row justify-between p-5">
              <h3 className="bg-white text-black text-3xl font-semibold">Edit Task</h3>
              <button
                className="px-1 text-2xl text-gray-600 font-semibold block ml-auto flex-shrink-0"
                onClick={() => setEditModal(false)}
              >
                X
              </button>
            </div>

            {/* Modal Form */}
            <form className="p-6 pt-6 pb-4">
              {/* Project Name Input */}
              <div>
                <label
                  className="-tracking-wide uppercase text-gray-700 text-xs font-semibold mb-2 block"
                  htmlFor="project-name"
                >
                  Project Name
                </label>
                <input
                  className="w-full bg-gray-300 text-black border border-gray-400 rounded py-3 px-4 mb-5 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  id="project-name"
                  name="projectName"
                  placeholder="Project name"
                  value={projectName}
                  onChange={handleInput}
                  required
                />
              </div>

              {/* Task Description Input */}
              <div>
                <label
                  className="-tracking-wide uppercase text-gray-700 text-xs font-semibold mb-2 block"
                >
                  Task Description
                </label>
                <textarea
                  className="w-full bg-gray-300 text-black border border-gray-400 rounded py-3 px-4 mb-5 leading-tight focus:outline-none focus:bg-white"
                  id="task-description"
                  rows="5"
                  placeholder="Task description"
                  name="taskDescription"
                  value={taskDescription}
                  onChange={handleInput}
                ></textarea>
              </div>
            </form>

            {/* Modal Footer */}
            <div className="flex justify-end p-6 border-t border-state-200 rounded-b">
              <button
                className="bg-purple-500 text-white font-semibold uppercase text-sm px-6 py-3 rounded hover:opacity-80"
                onClick={handleUpdate}
              >
                Update Task
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditTask;