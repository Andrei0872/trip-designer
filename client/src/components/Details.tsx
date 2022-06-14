import './Details.scss'

import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import React from 'react';
import { ExportData } from '../types/utils';
import { getFormDataEntriesAsObject } from '../utils';

function Todo({ todo, index, checkTodo, removeTodo } : any) {
  return (
    <div
      className="details__todo__todos__todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      {todo.text}
      <div>
        <button className="details__todo__todos__todo__buttonCheck" onClick={() => checkTodo(index)}>{todo.isCompleted ? "Uncheck" : "Check"}</button>
        <button className="details__todo__todos__todo__buttonRemove" onClick={() => removeTodo(index)}>Remove</button>
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
      <input className="details__todo__input"
      type="text"
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder="Type here..."
      />
      <input className="details__todo__button" type='submit' value='Add'/>
    </form>
  );
}

function Details (props: any, ref: any) {
  const [todos, setTodos] = React.useState([
    { text: "First todo",
      isCompleted: false},
    { text: "Second todo",
    isCompleted: false},
    { text: "Third todo",
    isCompleted: false}
  ]);

  const { onDatesChanged } = props;

  const formRef = useRef(null);

  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);

  const onDateChanged = () => {
    onDatesChanged({
      startDate: startDateRef.current.value,
      endDate: endDateRef.current.value,
    })
  }

  useImperativeHandle<any, ExportData>(ref, () => ({
    exportData: () => {
      const otherDetails = getFormDataEntriesAsObject(new FormData(formRef.current!));
      
      return {
        otherDetails: {
          ...otherDetails,
          todos,
        },
      };
    },
  }));

  const addTodo = (text: any, isCompleted: boolean) => {
    const newTodos = [...todos, { text, isCompleted }];
    setTodos(newTodos);
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
      <h2 className="details__title">Details</h2>

      <form ref={formRef}>
        <div className='details__cityCountry'>
          <div className='details__image'>
            <img className="details__image__img" src="/los_angeles_picture.png" alt='city picture'/>
            <p className='details__image__country-city'>USA, Los Angeles</p>
          </div>
          <div className='details__dates'>
            <abbr title="start date"><input onChange={onDateChanged} ref={startDateRef} className="details__dates__start" type="date" id="start" name="start_date" defaultValue="2022-05-16"/></abbr>
            <abbr title="end date"><input onChange={onDateChanged} ref={endDateRef} className="details__dates__end" type="date" id="end" name="end_date" defaultValue="2022-05-16"/></abbr>
          </div>
        </div>

        {/* <div className='details__accommodation'>
          <h3>Accommodation</h3>
          <button type='button'>Add</button>
        </div>
        <div className='details__transport'>
          <h3>Transport</h3>
          <button type='button'>Add</button>
        </div> */}
      </form>

      <div className='details__todo'>
        <h3 className='details__todo__title'>To do</h3>
        <TodoForm addTodo={addTodo}/>
        <div className='details__todo__todos'>
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

export default forwardRef(Details);

