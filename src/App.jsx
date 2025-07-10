import { useCallback, useState } from "react";
import ToDoList from "./components/ToDoList";
import Header from "./components/Header";
import Empty from "./components/Empty";
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const [todos, setTodos] = useState([]);
  const [editing, setEditing] = useState(null);
  const [title, setTitle] = useState("");

  const editTodo = useCallback((todo) => {
    setTodos((prevTodos) =>
      prevTodos.map((t) =>
        t.id === todo.id
          ? { ...t, isEditing: true }
          : t.isEditing
          ? { ...t, isEditing: false }
          : t
      )
    );
    setEditing(todo.id);
    setTitle(todo.title);
  }, []);

  const handleAdd = (e) => {
    setTitle(e.target.value);
  };

  const addTodo = () => {
    toast.dismiss();
    const value = title.trim();
    if (value === "") {
      toast.dismiss();
      toast.error("Please enter a task!");
      return;
    }
    if (editing !== null) {
      setTodos((prevTodos) =>
        prevTodos.map((t) =>
          t.id === editing ? { ...t, title: value, isEditing: false } : t
        )
      );
      setEditing(null);
      toast.success("Task Updated Successfully");
    } else {
      setTodos((prevTodos) => [
        ...prevTodos,
        { id: Date.now(), title: value, completed: false, isEditing: false },
      ]);
      toast.success("Task Added Successfully");
    }

    setTitle("");
    
  };

  const toggleTodo = useCallback((id,isCompleted) => {
    toast.dismiss();
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
   
    !isCompleted?toast.success("Task Completed Successfully"):toast.warn("Task Marked as Pending");
  }, []);

  const deleteTodo = useCallback((id) => {
    toast.dismiss();
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    toast.success("Task Deleted Successfully");
  }, []);

  return (
    <div className="min-h-screen bg-brand flex flex-col items-center gap-4 px-2 md:px-4 py-6">
      <Header />
      <div className="max-w-[1200px] w-full p-2 md:p-6 rounded-md">
        <div className="flex mt-4 ">
          <input
            value={title}
            className="flex-grow border-2 bg-blue-100 border-blue-300 rounded px-4 py-2 mr-4 focus:outline-blue-600"
            placeholder="Enter a task..."
            onChange={(e) => handleAdd(e)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
          />
          <button
            className="bg-blue-600 hover:bg-blue-800 transition-colors text-white px-4 py-1 rounded"
            onClick={addTodo}>
            {!editing ? "Add" : "Update"}
          </button>
        </div>
        <div className="mt-4 p-2 md:p-4 bg-blue-100 md:border-2 rounded-md border-gray-200 max-h-[500px] overflow-auto">
          {todos.length === 0 ? (
            <Empty />
          ) : (
            <ToDoList
              todos={todos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          )}
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={1000} limit={1} />
    </div>
  );
}

export default App;
