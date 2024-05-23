import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const { VITE_APP_HOST } = import.meta.env;

const Todo = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [todoEdit, setTodoEdit] = useState({});

  // 取得 todos
  const getTodos = async () => {
    const response = await axios.get(`${VITE_APP_HOST}/todos`);
    setTodos(response.data.data);
  };

  // 新增 todo
  const addTodo = async () => {
    await axios.post(`${VITE_APP_HOST}/todos`, {
      content: newTodo,
    });
    setNewTodo("");
    getTodos();
  };

  const deleteTodo = (id) => async () => {
    await axios.delete(`${VITE_APP_HOST}/todos/${id}`);
    getTodos();
  };

  const updateTodo = (id) => async () => {
    // 先找到要更新的 todo id
    const todo = todos.find((todo) => todo.id === id);
    // 更新 todo 的 content
    todo.content = todoEdit[id];
    console.log(todoEdit[id]);
    // 更新 todo 的 status
    await axios.put(`${VITE_APP_HOST}/todos/${id}`, todo);
    getTodos();
    setTodoEdit({
      ...todoEdit,
      [id]: "",
    });
  };

  useEffect(() => {
    // 從 login 頁存到 cookie 的 token
    // 抵達 todo 頁時，取得 Cookie 的 token
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    // 後續發出請求不用再帶 headers Auth~~~ ，預設 axios 的表頭，帶上 token，就不需要每次發出請求再帶上 headers
    axios.defaults.headers.common["Authorization"] = cookieValue;

    // 驗證登入
    axios
      .get(`${VITE_APP_HOST}/users/checkout`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("登入失敗啦", err);
        setTimeout(() => {
          navigate("/auth/login");
        }, 1000);
      });

    getTodos();
  }, []);

  return (
    <>
      <p>代辦清單</p>
      <input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="New Todo"
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo.content} - {todo.status ? "已完成" : "未完成"}|
            {todoEdit[todo.id]}
            <input
              type="text"
              placeholder="更新值"
              value={todoEdit[todo.id] || ""} // 如果 todoEdit[todo.id] 有值就顯示，沒有就顯示空字串
              onChange={(e) => {
                const newTodoEdit = {
                  ...todoEdit,
                };
                newTodoEdit[todo.id] = e.target.value;
                setTodoEdit(newTodoEdit);
              }}
            />
            <button type="button" onClick={deleteTodo(todo.id)}>
              刪除
            </button>
            <button type="button" onClick={updateTodo(todo.id)}>
              編輯
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Todo;
