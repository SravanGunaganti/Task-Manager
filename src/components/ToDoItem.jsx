import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";

function ToDoItem({ todo, onToggle, onDelete, onEdit }) {
  const editTodo = (todo) => {
    onEdit(todo);
  };
  return (
    <>
      <label
        className={`${
          todo.isEditing && "opacity-50"
        } relative inline-flex items-center cursor-pointer`}>
        <input
          type="checkbox"
          disabled={todo.isEditing}
          checked={todo.completed}
          onChange={() => onToggle(todo.id,todo.completed)}
          className="sr-only peer"
        />
        <div
          className={`
          w-24 md:w-26 h-7 bg-yellow-300 text-gray-600 rounded-full peer-checked:bg-green-500 transition-colors flex justify-end items-center peer-checked:justify-start text-[12px] md:text-[14px] p-2 peer-checked:text-white`}>
          {todo.completed ? "Completed" : "Pending"}
        </div>
        <div
          className={`${
            !todo.completed && "bg-white"
          } absolute left-1 top-1 shadow-md  w-5 h-5 rounded-full transition-transform md:peer-checked:translate-x-19 peer-checked:translate-x-17 flex items-center justify-center`}>
          {todo.completed ? (
            <FaCheckCircle className="text-white w-6 h-6" />
          ) : (
            <HiDotsHorizontal className="text-yellow-500 w-6 h-6" />
          )}
        </div>
      </label>

      <h3
        className={`mx-3 flex-1 truncate text-[16px] md:text-[20px] font-bold cursor-pointer transition-all duration-300 ${
          todo.completed && "line-through text-gray-400"
        } ${!todo.isEditing ? "text-black" : "text-gray-400"}
        }`}>
        {/* {todo.title.length>25?todo.title.slice(0,25)+"...":todo.title} */}
        {todo.title}
      </h3>
      <div className="flex gap-2">
        <button disabled={todo.isEditing} onClick={() => editTodo(todo)}>
          <FiEdit
            className={`${
              todo.isEditing
                ? "text-blue-300"
                : "text-blue-500 hover:text-blue-600 hover:scale-[1.1] transition duration-300"
            } rounded text-xl md:text-2xl`}
          />
        </button>

        <button disabled={todo.isEditing} onClick={() => onDelete(todo.id)}>
          <MdDeleteForever
            className={`${
              todo.isEditing
                ? "text-red-300"
                : "text-red-500 hover:text-red-600 transition hover:scale-[1.05] duration-300"
            } rounded text-2xl md:text-3xl
          `}
          />
        </button>
      </div>
    </>
  );
}

export default React.memo(ToDoItem);
