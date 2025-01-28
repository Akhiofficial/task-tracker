import { useState, useEffect } from "react";
import AddTask from "./components/AddTask";
import ToDo from "./components/ToDo";
import DarkModeToggle from "./components/DarkModeToggle";
import { useDrop } from "react-dnd";

function App() {
  const [taskList, setTaskList] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // Load tasks and dark mode preference from localStorage on initial render
  useEffect(() => {
    const storedTasks = localStorage.getItem("taskList");
    const storedCompletedTasks = localStorage.getItem("completedTasks");
    const storedDarkMode = localStorage.getItem("darkMode");
    
    if (storedTasks) {
      setTaskList(JSON.parse(storedTasks));
    }
    if (storedCompletedTasks) {
      setCompleted(JSON.parse(storedCompletedTasks));
    }
    if (storedDarkMode) {
      setDarkMode(JSON.parse(storedDarkMode));
    }
  }, []);

  // Save dark mode preference to localStorage
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Save tasks and completed tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }, [taskList]);

  useEffect(() => {
    localStorage.setItem("completedTasks", JSON.stringify(completed));
  }, [completed]);

  // Update the useDrop configuration
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "todo",
    drop: (item) => {
      const moveTask = taskList.find((task) => task.id === item.id);
      if (moveTask) {
        setCompleted((prev) => [...prev, moveTask]);
        setTaskList((prev) => prev.filter((task) => task.id !== item.id));
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }), [taskList]); // Add dependency

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      darkMode ? 'bg-gray-900' : 'bg-gray-100'
    }`}>
      <div className="container mx-auto px-4 py-8">
        {/* Dark Mode Toggle */}
        <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className={`text-4xl font-bold mb-4 ${
            darkMode ? 'text-purple-400' : 'text-purple-600'
          }`}>
            Task Tracker
          </h1>
          <p className={`text-xl mb-6 ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Manage your tasks efficiently
          </p>
          
          <AddTask taskList={taskList} setTaskList={setTaskList} darkMode={darkMode} />
        </div>

        {/* Task Sections Container */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* To Do Section */}
          <div className={`rounded-lg shadow-md p-6 ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h2 className={`text-2xl font-semibold mb-6 pb-2 border-b-2 ${
              darkMode 
                ? 'text-gray-100 border-purple-400' 
                : 'text-gray-800 border-purple-200'
            }`}>
              To Do
              <span className={`ml-2 text-sm ${
                darkMode ? 'text-purple-400' : 'text-purple-500'
              }`}>
                ({taskList.length})
              </span>
            </h2>
            <div className="space-y-4">
              {taskList.map((task) => (
                <ToDo 
                  key={task.id} 
                  task={task} 
                  taskList={taskList} 
                  setTaskList={setTaskList} 
                  isCompleted={false}
                  darkMode={darkMode}
                />
              ))}
              {taskList.length === 0 && (
                <p className={`text-center py-4 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  No tasks yet. Add a new task to get started!
                </p>
              )}
            </div>
          </div>

          {/* Completed Section */}
          <div
            ref={drop}
            className={`rounded-lg shadow-md p-6 transition-all duration-200 ${
              darkMode 
                ? 'bg-gray-800' + (isOver ? ' ring-2 ring-purple-400 ring-opacity-50' : '')
                : 'bg-white' + (isOver ? ' ring-2 ring-purple-400 ring-opacity-50' : '')
            }`}
          >
            <h2 className={`text-2xl font-semibold mb-6 pb-2 border-b-2 ${
              darkMode 
                ? 'text-gray-100 border-green-400' 
                : 'text-gray-800 border-green-200'
            }`}>
              Completed
              <span className={`ml-2 text-sm ${
                darkMode ? 'text-green-400' : 'text-green-500'
              }`}>
                ({completed.length})
              </span>
            </h2>
            <div className="space-y-4">
              {completed.map((task) => (
                <ToDo
                  key={task.id}
                  task={task}
                  taskList={completed}
                  setTaskList={setCompleted}
                  isCompleted={true}
                  darkMode={darkMode}
                />
              ))}
              {completed.length === 0 && (
                <p className={`text-center py-4 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {isOver ? "Drop task here!" : "No completed tasks yet"}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;