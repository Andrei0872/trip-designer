import './Details.scss'

import { useState } from 'react'
import React from 'react';

function Todo({ todo, index, checkTodo, removeTodo } : any) {
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      {todo.text}
      <div>
        <button onClick={() => checkTodo(index)}>{todo.isCompleted ? "Uncheck" : "Check"}</button>
        <button onClick={() => removeTodo(index)}>x</button>
      </div>
    </div>
  )
}

function TodoForm({addTodo}:any){
  const [value, setValue] = React.useState("");
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!value) return;
    const f = false;
    addTodo(value,f);
    setValue("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
      type="text"
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder="Type here..."
      />
      <input type='submit' value='Add'/>
    </form>
  );
}

function Details () {
  const [todos, setTodos] = React.useState([
    { text: "First todo",
      isCompleted: false},
    { text: "Second todo",
    isCompleted: false},
    { text: "Third todo",
    isCompleted: false}
  ]);
  const addTodo = (text: any, isCompleted: boolean) => {
    const newTodos = [...todos, { text, isCompleted }];
    setTodos(newTodos);
    console.log(newTodos);
  };
  const checkTodo = (index: number) => {
    const newTodos = [...todos];
    if (newTodos[index].isCompleted)
    {
      newTodos[index].isCompleted = false;
    }
    else
    {
      newTodos[index].isCompleted = true;
    }
    setTodos(newTodos);
  };

  const removeTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return(
    <div className='details'>
      <h2>Details</h2>
      <div className='details__cityCountry'>
        <div className='details__image'>
          Country, City
        </div>
        <div className='details__dates'>
        <input type="date" id="start" name="trip-start" value="2022-05-16"/>
        <input type="date" id="end" name="trip-start" value="2022-05-16"/>
        </div>
      
      </div>
      <div className='details__accommodation'>
        <h3>Accommodation</h3>
        <button>Add</button>
      </div>
      <div className='details__transport'>
        <h3>Transport</h3>
        <button>Add</button>
      </div>
      <div>
        <h3>To do</h3>
        <TodoForm addTodo={addTodo}/>
        <div>
          {todos.map((todo,index) => (
            <Todo
            key={index}
            index={index}
            todo={todo}
            checkTodo={checkTodo}
            removeTodo={removeTodo}
            />
          ))}
        </div>
      </div>
    </div>
  );


}

export default Details

