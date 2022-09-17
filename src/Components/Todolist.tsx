import React, {ChangeEvent, useState} from 'react';
import {WordFilter} from "../App";
import st from './Todolist.module.css'
import {AddItemForm} from "./AddItemForm";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type tasksPropsType = {
    todoId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todoId: string, taskId: string) => void
    addTask: (todoId: string, title: string) => void
    checkboxChange: (todoId: string, checkId: string, isDone: boolean) => void
    filterTasks: (todoId: string, filterId: WordFilter) => void
    filter: WordFilter
    removeTodoList: (todoId: string) => void
}

export const Todolist = ({
                             todoId,
                             title,
                             tasks,
                             removeTask,
                             addTask,
                             filterTasks,
                             checkboxChange,
                             filter,
                             removeTodoList,
                         }: tasksPropsType) => {

    const tasksRender = tasks.length !== 0 ? tasks.map(t => {

        const clickRemoveHandler = () => {
            removeTask(todoId, t.id)
            //функция колбэк передает наверх id
        }

        const changeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
            checkboxChange(todoId, t.id, e.currentTarget.checked)
        }

        const style = `${st.styleNone} ${t.isDone ? st.opacity : ""}`

        return (
            <li key={t.id} className={style}>
                <input
                    type="checkbox" checked={t.isDone}
                    onChange={changeCheckboxHandler}
                />
                {t.title} {t.isDone}
                <button onClick={clickRemoveHandler}>X</button>
            </li>
        )
    })
    : <span>Create task</span>

    const addTaskHandler = (title: string) => {
        addTask(todoId, title)
    }
    const clickAllHandler = () => {
        filterTasks(todoId,"all")
    }
    const clickActiveHandler = () => {
        filterTasks(todoId,"active")
    }
    const clickCompletedHandler = () => {
        filterTasks(todoId,"completed")
    }
    const clickRemoveTodoListHandler = () => {
        removeTodoList(todoId)
    }

    return (
        <div>
            <div className={st.backgroundColor}>
                <h3>
                    {title}
                    <button onClick={clickRemoveTodoListHandler}>X</button>
                </h3>
                <AddItemForm
                    addItem={addTaskHandler}
                />
                <ul>
                    {tasksRender}
                </ul>
                <button className={filter === "all" ? st.colored : ""} onClick={clickAllHandler}>All</button>
                <button className={filter === "active" ? st.colored : ""} onClick={clickActiveHandler}>Active</button>
                <button className={filter === "completed" ? st.colored : ""} onClick={clickCompletedHandler}>Completed</button>
            </div>
        </div>
    );
};



//!--------------------------------------------------------------------------------------------------------
// import React, {ChangeEvent, useState} from 'react';
// import {WordFilter} from "../App";
// import st from './Todolist.module.css'
//
// export type TaskType = {
//     id: string
//     title: string
//     isDone: boolean
// }
//
// export type tasksPropsType = {
//     todoId: string
//     title: string
//     tasks: Array<TaskType>
//     removeTask: (todoId: string, taskId: string) => void
//     addTask: (todoId: string, title: string) => void
//     checkboxChange: (todoId: string, checkId: string, isDone: boolean) => void
//     filterTasks: (todoId: string, filterId: WordFilter) => void
//     filter: WordFilter
//     removeTodoList: (todoId: string) => void
// }
//
// export const Todolist = ({
//                              todoId,
//                              title,
//                              tasks,
//                              removeTask,
//                              addTask,
//                              filterTasks,
//                              checkboxChange,
//                              filter,
//                              removeTodoList,
//                          }: tasksPropsType) => {
//
//     const [valueTitle, setValueTitle] = useState<string>('')
//     const [error, setError] = useState<boolean>(false)
//     console.log()
//     const tasksRender = tasks.length !== 0 ? tasks.map(t => {
//
//             const clickRemoveHandler = () => {
//                 removeTask(todoId, t.id)
//                 //функция колбэк передает наверх id
//             }
//
//             const changeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
//                 checkboxChange(todoId, t.id, e.currentTarget.checked)
//             }
//
//             const style = `${st.styleNone} ${t.isDone ? st.opacity : ""}`
//
//             return (
//                 <li key={t.id} className={style}>
//                     <input
//                         type="checkbox" checked={t.isDone}
//                         onChange={changeCheckboxHandler}
//                     />
//                     {t.title} {t.isDone}
//                     <button onClick={clickRemoveHandler}>X</button>
//                 </li>
//             )
//         })
//         : <span>Create task</span>
//
//     const changeValueTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
//         setValueTitle(e.currentTarget.value)
//         if (valueTitle.length === 0 && error) {
//             setError(false)
//         }
//
//         // console.log(valueTitle, 'function')
//         //функция сработав на событие сэтает новое значение
//         //поэтому если поставить консоль лог здесь в функции, оно будет
//         //брать предыдущее значение, потому что useState работает асинхронно
//     }
//
//     const clickAddTaskHandler = () => {
//         if (valueTitle.trim() !== '') {
//             addTask(todoId, valueTitle)
//             setValueTitle('')
//         } else {
//             setError(true)
//         }
//     }
//
//     const clickAllHandler = () => {
//         filterTasks(todoId,"all")
//     }
//     const clickActiveHandler = () => {
//         filterTasks(todoId,"active")
//     }
//     const clickCompletedHandler = () => {
//         filterTasks(todoId,"completed")
//     }
//
//     const clickRemoveTodoListHandler = () => {
//         removeTodoList(todoId)
//     }
//
//     return (
//         <div>
//             <h3>
//                 {title}
//                 <button onClick={clickRemoveTodoListHandler}>X</button>
//             </h3>
//             <input className={error ? st.errorInput : ""}
//                    type="text"
//                    value={valueTitle}
//                    onChange={changeValueTitleHandler}
//             />
//             <button onClick={clickAddTaskHandler}>+</button>
//
//             {error && <div className={st.coloredText}>Enter the message</div>}
//
//             <ul>
//                 {tasksRender}
//             </ul>
//
//             <button className={filter === "all" ? st.colored : ""} onClick={clickAllHandler}>All</button>
//             <button className={filter === "active" ? st.colored : ""} onClick={clickActiveHandler}>Active</button>
//             <button className={filter === "completed" ? st.colored : ""} onClick={clickCompletedHandler}>Completed</button>
//         </div>
//     );
// };