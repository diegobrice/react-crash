import Header from './components/Header';
// import Navbar from './components/Navbar';
import Actions from './components/Actions';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import { useState, useEffect } from 'react';
import { FcInfo } from 'react-icons/fc';
import Footer from './components/Footer';
import About from './components/About';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const taskServer = await fechTasks();
      setTasks(taskServer);
    };
    getTasks();
  }, []);

  const fechTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();
    return data;
  };

  const fechTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleReminder = async (id) => {
    const taskToToggle = await fechTask(id);
    const updTask = {
      ...taskToToggle,
      reminder: !taskToToggle.reminder,
    };
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    setTasks(tasks.map((task) => (task.id === id ? { ...task, reminder: data.reminder } : task)));
  };

  const addTask = async (task) => {
    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = {id, ...task}
    // setTasks([...tasks, newTask  ])

    const res = await fetch(`http://localhost:5000/tasks`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();
    setTasks([...tasks, data]);
  };

  const toggleAddTask = () => {
    setShowAddTask(!showAddTask);
  };

  return (
    <Router>
      <div className="container">
        <Header title="App React" />
        {/* <Navbar></Navbar> */}
        <Actions onToggle={toggleAddTask} showAdd={showAddTask} />
        <Route
          path="/"
          exact
          render={(props) => (
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
                <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}></Tasks>
              ) : (
                <p style={{ padding: '20px 10px' }}>
                  <FcInfo />
                  You don't have any task pending.
                </p>
              )}
            </>
          )}
        />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
