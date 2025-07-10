import React from "react";
import ToDoItem from "./ToDoItem";

function ToDoList({ todos, onToggle, onDelete, onEdit }) {
  return (
    <>
      <h2 className="text-2xl text-blue-600">Tasks</h2>
      <ul className="space-y-2 list-none">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`${todo.completed ? "bg-green-100" : "bg-yellow-100"} 
            flex items-center justify-between px-3 py-2 rounded-md border border-gray-300 shadow-md 
            transform transition duration-300 ease-in-out hover:shadow-lg animate-fadeIn`}>
            <ToDoItem
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

export default React.memo(ToDoList);
