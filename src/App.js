import React, {useState, useEffect} from 'react';
import './App.css';
import Form from './components/Form';
import TodoList from './components/Todolist';

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("");
  const [filteredTodos, setFilteredTodos] = useState([])

useEffect(() => {
  getLocalTodos()
}, []);



  useEffect(() => {
    filterHandler()
    saveLocalTodos();
  }, [todos, status]);

const filterHandler = () => {
  switch(status) {
    case 'completed':
        setFilteredTodos(todos.filter(todo => 
        
          todo.completed === true
      
        ))
      break;
    case 'uncompleted':
      setFilteredTodos(todos.filter(todo => 
        
        todo.completed === false
    
      ))
      break;
    default:
      setFilteredTodos(todos)
      break;
  }
}

const saveLocalTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const getLocalTodos = () => {
  if (localStorage.getItem("todos") === null) {
    localStorage.setItem("todos", JSON.stringify([]));
  }else {
    let todolocal = JSON.parse(localStorage.getItem("todos"))
    setTodos(todolocal);
  }
};




  return (
    <div className="App">
      <header>
          <h1>Hillnhorr's Todo List </h1>
      </header>
      <Form setInputText={setInputText} todos = {todos} setTodos={setTodos} inputText={inputText} status={status} setStatus={setStatus}/>
      <TodoList filteredTodos={filteredTodos} setFilteredTodos={setFilteredTodos} todos={todos} setTodos={setTodos} />



    </div>
  );
}

export default App;
