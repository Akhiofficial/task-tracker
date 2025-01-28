import React, { useEffect, useState } from "react";
import EditTask from "./EditTask";
import { useDrag } from "react-dnd";

const ToDo = ({ task, taskList, setTaskList, isCompleted, darkMode }) => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  // Drag functionality using react-dnd
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "todo",
    item: task,
    canDrag: !isCompleted,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [task, isCompleted]);

  // Timer logic
  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1); // Increment time every second
      }, 1000);
    }
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [running]);

  // Start/Stop timer
  const handleStartStop = () => {
    setRunning(!running);
  };

  // Delete task
  const handleDelete = () => {
    setTaskList((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
  };

  return (
    <div
      ref={drag}
      className={`border rounded-lg shadow-sm hover:shadow-md transition-all duration-200
        ${isDragging ? "opacity-50" : "opacity-100"}
        ${darkMode 
          ? isCompleted 
            ? "bg-gray-700 border-green-400" 
            : "bg-gray-700 border-purple-400"
          : isCompleted
            ? "bg-gray-50 border-green-200"
            : "bg-white border-purple-200"
        }
        ${isCompleted ? "cursor-default" : "cursor-move"}
      `}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <h3 className={`font-semibold text-xl ${
            darkMode ? 'text-gray-100' : 'text-gray-800'
          }`}>
            {task.projectName}
          </h3>
          {!isCompleted && <EditTask task={task} taskList={taskList} setTaskList={setTaskList} darkMode={darkMode} />}
        </div>

        {/* Description */}
        <p className={`mb-3 ${
          darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {task.taskDescription}
        </p>
        
        {/* Timestamp */}
        <p className={`text-sm mb-4 ${
          darkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          {isCompleted ? "Completed: " : "Created: "}{task.timestamp}
        </p>

        {/* Timer Section */}
        {!isCompleted && (
          <div className="border-t border-gray-600 pt-4">
            <div className={`rounded-lg p-4 ${
              darkMode ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              {/* Timer Display */}
              <div className="text-center mb-3">
                <div className={`text-3xl font-mono font-semibold ${
                  darkMode ? 'text-purple-400' : 'text-purple-600'
                }`}>
                  <span>{("0" + Math.floor((time / 3600) % 24)).slice(-2)}</span>
                  <span className="mx-1">:</span>
                  <span>{("0" + Math.floor((time / 60) % 60)).slice(-2)}</span>
                  <span className="mx-1">:</span>
                  <span>{("0" + (time % 60)).slice(-2)}</span>
                </div>
                <p className={`text-sm mt-1 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Hours : Minutes : Seconds
                </p>
              </div>

              {/* Timer Controls */}
              <div className="flex justify-center space-x-3">
                <button
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-colors
                    ${running 
                      ? "bg-red-100 text-red-600 hover:bg-red-200" 
                      : "bg-green-100 text-green-600 hover:bg-green-200"
                    }`}
                  onClick={handleStartStop}
                >
                  {running ? "Stop" : "Start"}
                </button>
                <button
                  className="px-6 py-2 rounded-md text-sm font-medium bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors"
                  onClick={() => setTime(0)}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Button */}
        <div className={`border-t pt-4 mt-4 ${
          darkMode ? 'border-gray-600' : 'border-gray-100'
        }`}>
          <button
            className={`w-full px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
              darkMode 
                ? 'text-red-400 hover:bg-red-900 hover:bg-opacity-50' 
                : 'text-red-600 hover:bg-red-50'
            }`}
            onClick={handleDelete}
          >
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToDo;
