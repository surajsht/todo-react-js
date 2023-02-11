import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrashAlt } from "react-icons/fa";
import "./index.css";

let getLocalData = () => {
  let getStorageData = JSON.parse(localStorage.getItem("todo"));

  if (getStorageData) {
    return getStorageData;
  } else {
    return [];
  }
};

function App() {
  let [value, setValue] = useState("");
  let [todo, setTodo] = useState(getLocalData());
  let [isEdit, setIsEdit] = useState(false);
  let [todoIdRef, setTodoIdRef] = useState(null);

  let todoAction = () => {
    if (value === "") {
      alert('Please enter something')
      return;
    } else if (value && isEdit) {
      let findTodo = todo.map((data) => {
        if (data.id === todoIdRef) {
          return { ...data, value };
        }
        return data;
      });
      setIsEdit(false);
      setTodo(findTodo);
      setValue("");
      return;
    } else {
      setTodo([
        ...todo,
        {
          id: new Date().getTime().toString(),
          value,
        },
      ]);
      setValue("");
    }
  };

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

  let deleteTodo = (id) => {
    let newData = todo.filter((data) => {
      return data.id !== id;
    });

    setTodo(newData);
  };

  let editTodo = (id) => {
    let findData = todo.find((data) => data.id === id);
    setValue(findData.value);
    setIsEdit(true);
    setTodoIdRef(id);
  };

  return (
    <div className="todo-container">
      <form action="" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder = 'Enter yout todo here'
        />
        
        <button className="add-edit" onClick={todoAction}>
          {isEdit ? <FaEdit /> : <FaPlus />}
        </button>
      </form>

      <div className="todo-list-container">
        <ul>
          {todo.map((data) => {
            return (
              <li key={data.id}>
                <span> {data.value} </span>
                <div className="additional-actions-btn">
                  <button onClick={() => editTodo(data.id)}>
                    <FaEdit />
                  </button>

                  <button onClick={() => deleteTodo(data.id)}>
                    <FaTrashAlt />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
