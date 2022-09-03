import { useState, useEffect, useRef } from "react";
import "./style.scss";
import {
  bgDDark,
  bgDLight,
  bgMDark,
  bgMLight,
  CheckIcon,
  CrossIcon,
  MoonIcon,
  SunIcon,
} from "../../../assets/Todo";

const Todo = () => {
  const [theme, setTheme] = useState("light");
  const [todo, setTodo] = useState([]);
  const [todoCompleted, setTodoCompleted] = useState([]);
  const [isDeleted, setisDeleted] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);
  const [value, setValue] = useState({
    todo: "",
    done: false,
  });
  const dragItemRef = useRef(null);
  const dragOverRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  // useEffect(() => {
  //   document.getElementsByTagName("body")[0].classList.toggle(theme);
  //   // bodyRef.current && bodyRef.current.classList.toggle(theme);
  // }, [theme]);

  const handleSort = (t) => {
    if (dragItemRef.current == dragOverRef.current) return;
    let copyTodo = [...todo];
    const draggedItem = copyTodo.splice(dragItemRef.current, 1)[0];
    copyTodo.splice(dragOverRef.current, 0, draggedItem);
    dragItemRef.current = null;
    dragOverRef.current = null;
    setTodo(copyTodo);
    setTodoCompleted([
      ...new Map(todoCompleted.map((item) => [item["todo"], item])).values(),
    ]);
  };

  const addToTodo = (item) => {
    setTodo((prev) => [...prev, item]);
    setValue({
      todo: "",
      done: false,
    });
  };

  const removeTodo = (id) => {
    let copyTodo = todo.slice();
    const index = copyTodo.findIndex((el) => el.todo == todo[id].todo);
    copyTodo.splice(index, 1);
    setTodo(copyTodo);
  };

  const clearComplete = () => {
    setTodoCompleted([
      ...new Map(todoCompleted.map((item) => [item["todo"], item])).values(),
    ]);
    const key = todoCompleted.map((item) => item.todo);
    setTodo(todo.filter((item) => !key.includes(item.todo)));
    setTodoCompleted([]);
    setisDeleted(!isDeleted);
  };

  return (
    <>
      <div className={`todo ${theme == "light" ? "light" : "dark"}`}>
        <img src={theme == "light" ? bgDLight : bgDDark} />
        <div className="container">
          <div className="header">
            <h1>TODO</h1>
            <div className="icon">
              {theme == "light" ? (
                <div className="dark" onClick={() => setTheme("dark")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                  >
                    <path
                      fill="#FFF"
                      fillRule="evenodd"
                      d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"
                    />
                  </svg>
                </div>
              ) : (
                <div className="day" onClick={() => setTheme("light")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                  >
                    <path
                      fill="#FFF"
                      fillRule="evenodd"
                      d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>

          <div className="inputbox">
            <div
              className="checkbox"
              onClick={() => value.todo.length > 0 && addToTodo(value)}
            >
              <input type="checkbox" />
              <label htmlFor="checkbox"></label>
              <span className="hoverstate"></span>
            </div>
            <input
              type="text"
              value={value.todo}
              placeholder="Create a new Todo"
              onChange={(e) => setValue({ todo: e.target.value, done: false })}
              onKeyUp={(e) =>
                e.key == "Enter" && value.todo.length > 0 && addToTodo(value)
              }
            />
          </div>
          <div className="output">
            <div
              className="out"
              style={{ overflowY: isScrollable ? "scroll" : "hidden" }}
            >
              {todo?.map((task, i) => (
                <TodoItem
                  key={i}
                  id={i}
                  task={task}
                  allTodo={todo}
                  setTodo={setTodo}
                  handleSort={handleSort}
                  isDeleted={isDeleted}
                  setisDeleted={setisDeleted}
                  dragRef={dragItemRef}
                  overRef={dragOverRef}
                  todoCompleted={todoCompleted}
                  setTodoCompleted={setTodoCompleted}
                  removeTodo={removeTodo}
                  setIsDragging={setIsDragging}
                  isDragging={isDragging}
                />
              ))}
            </div>
            <div className="controls">
              <div className="left">
                <p>{todo.length} item left</p>
              </div>
              <div className="center">
                <button onClick={() => setIsScrollable(!isScrollable)}>
                  All
                </button>
                <button>Active</button>
                <button>Completed</button>
              </div>
              <div className="right">
                <button onClick={clearComplete}>Clear Complete</button>
              </div>
            </div>
            {todo.length > 1 && (
              <small className="info">Drag and Drop to reorder List</small>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const TodoItem = (props) => {
  const {
    id,
    task,
    allTodo,
    setTodo,
    dragRef,
    overRef,
    handleSort,
    isDeleted,
    setisDeleted,
    todoCompleted,
    setTodoCompleted,
    removeTodo,
    isDragging,
    setIsDragging,
  } = props;
  const [isChecked, setIsChecked] = useState(task.done);

  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (isChecked) {
      setTodoCompleted((prev) => [
        ...prev,
        {
          todo: task.todo,
          done: isChecked,
        },
      ]);
      allTodo[id].done = true;
      setTodo(allTodo);
      setIsChecked(task.done);
    } else {
      if (!todoCompleted) return;
      const copyCompleted = [...todoCompleted];
      setTodoCompleted(copyCompleted?.filter((el) => el.todo != task.todo));
      allTodo[id].done = false;
      setTodo(allTodo);
      setIsChecked(task.done);
    }
  }, [isChecked]);

  useEffect(() => {
    if (!isDragging) {
      setIsChecked(task.done);
    }
  }, [isDragging, isDeleted]);

  return (
    <>
      <div
        className="todoitem"
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        draggable
        onDragStart={() => {
          setIsDragging(true);
          dragRef.current = id;
        }}
        onDragEnter={() => (overRef.current = id)}
        onDragEnd={() => {
          handleSort();
          setIsDragging(false);
        }}
      >
        <div className="check">
          <input
            type="checkbox"
            focused={isChecked.toString()}
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          <label htmlFor="checkbox"></label>
          <div className="hoverstate"></div>
        </div>
        <li className={isChecked ? "finished" : ""}>{task.todo}</li>
        {hover && (
          <span
            onClick={() => {
              removeTodo(id);
              setisDeleted(!isDeleted);
            }}
          ></span>
        )}
      </div>
    </>
  );
};

export default Todo;
