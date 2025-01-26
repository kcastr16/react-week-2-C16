import { useState } from "react";

export default function Todo() {
  const [todos, setTodos] = useState([
  ]);
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState("");

  function handleComplete(event, todoItem) {
    if (!todoItem.completed) {
      setTodos((prevTodos) =>
        prevTodos.map((item) => {
          if (item.id === todoItem.id) {
            return { ...item, completed: true };
          }
          return item;
        })
      );
      event.target.nextSibling.style.textDecoration = "line-through";
    } else {
      setTodos((prevTodos) =>
        prevTodos.map((item) => {
          if (item.id === todoItem.id) {
            return { ...item, completed: false };
          }
          return item;
        })
      );
      event.target.nextSibling.style.textDecoration = "none";
    }
  }

  function handleDelete(todoItem) {
    setTodos((prevTodos) =>
      prevTodos.filter((item) => item.id !== todoItem.id)
    );
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
      event.preventDefault();
      const newTodo = {
        id: todos.length + 1,
        text: event.target.value.trim(),
        completed: false,
      };
      setTodos([...todos, newTodo]);
      event.target.value = ""; 
    }
  };

  const handleEditClick = (todoItem) => {
    setEditingId(todoItem.id);
    setEditedText(todoItem.text);
  };

  const handleEditSubmit = (event, todoItem) => {
    event.preventDefault();
    if (editedText.trim() !== "") {
      setTodos((prevTodos) =>
        prevTodos.map((item) =>
          item.id === todoItem.id ? { ...item, text: editedText } : item
        )
      );
      setEditingId(null); 
      setEditedText(""); 
    }
  };

  return (
    <div className="todo-cont">
      <input
        type="text"
        onKeyDown={handleKeyDown}
        placeholder="Add new todo"
      />
      {todos.map((todoItem) => (
        <div key={todoItem.id}>
          <span>
            <input
              type="checkbox"
              checked={todoItem.completed}
              onChange={(event) => handleComplete(event, todoItem)}
            />
            {editingId === todoItem.id ? (
              <form onSubmit={(event) => handleEditSubmit(event, todoItem)}>
                <input
                  type="text"
                  value={editedText}
                  onChange={(event) => setEditedText(event.target.value)}
                  autoFocus
                />
                <button className="save-Btn" type="submit">Save</button>
              </form>
            ) : (
              <p>{todoItem.text}</p>
            )}
            <button className="delete-Btn" onClick={() => handleDelete(todoItem)}>
              Delete
            </button>
            <button className="edit-Btn" onClick={() => handleEditClick(todoItem)}>
              {editingId === todoItem.id ? "Cancel" : "Edit"}
            </button>
          </span>
        </div>
      ))}
    </div>
  );
}


