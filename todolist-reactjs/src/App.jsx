import { useEffect, useState } from "react"
import TodoInput from "./TodoInput"
import TodoList from "./TodoList"

function App() {
  const [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState('')

  useEffect(() => {
    if (!localStorage){
      return
    }
    let localTodos = localStorage.getItem('todos')
    if(!localTodos) {
      return
    }
    localTodos = JSON.parse(localTodos).todos
    setTodos(localTodos)
  }, [])
  
  function persistData(newList){
    localStorage.setItem('todos', JSON.stringify({ todos : newList}))
  }

  function handleAddTodo(newTodo){
    const newTodoList = [...todos, newTodo]
    persistData(newTodoList)
    setTodos(newTodoList)
    
  }

  function handleDeleteTodos(index){
    const newTodoList = todos.filter((todo, todoIndex) => {
      return todoIndex !== index
    })
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  function handleEditTodo(index){
    const valueToBeEdited = todos [index]
    setTodoValue(valueToBeEdited)
    handleDeleteTodos(index)
  }

  

  

  return (
     <>
     <TodoInput todoValue = {todoValue} setTodoValue = {setTodoValue} handleAddTodo = {handleAddTodo}/>
     <TodoList handleEditTodo ={handleEditTodo} handleDeleteTodos ={handleDeleteTodos} todos ={todos} />
     </>
  )
}

export default App
