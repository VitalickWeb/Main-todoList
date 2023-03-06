import React, {memo, useCallback} from 'react';
import st from './Todolist.module.css'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {TodoListsType} from "../State/AppWithRedux";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../State/store";
import {addTaskAC} from "../State/tasks-redusers";
import {changeTodoListTitleAC, filterTasksAC, removeTodoListAC} from "../State/TodoList-reducer";
import {Task} from "./Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksPropsType = {
    todoList: TodoListsType
    // todoId: string
    // title: string
    // tasks: Array<TaskType>
    // removeTask: (todoId: string, taskId: string) => void
    // addTask: (todoId: string, title: string) => void
    // checkboxChange: (todoId: string, checkId: string, isDone: boolean) => void
    // filterTasks: (todoId: string, filterId: WordFilter) => void
    // filter: WordFilter
    // removeTodoList: (todoId: string) => void
    // onChange: (todoId: string, taskId: string, newTitle: string) => void
    // changeTodolistTitle: (todoId: string, newTitle: string) => void
}

export const TodolistWithRedux = memo(({
                                      // todoId,
                                      // title,
                                      // tasks,
                                      // removeTask,
                                      // addTask,
                                      // filterTasks,
                                      // checkboxChange,
                                      // filter,
                                      // removeTodoList,
                                      // onChange,
                                      // changeTodolistTitle,
                                      todoList
                                  }: TasksPropsType) => {

    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todoList.id])
    const dispatch = useDispatch()

    if (todoList.filter === "active") {
        tasks = tasks.filter(t => !t.isDone)
    }
    if (todoList.filter === "completed") {
        tasks = tasks.filter(t => t.isDone)
    }

    const tasksRender = tasks.length !== 0 ? tasks.map(t => {
            //функция колбэк передает наверх id
            // const clickRemoveHandler = () => {
            //     dispatch(removeTaskAC(todoList.id, t.id))
            // }
            // const changeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
            //     dispatch(checkBoxChangeAC(todoList.id, t.id, e.currentTarget.checked))
            // }
            //
            // const style = `${st.styleNone} ${t.isDone ? st.opacity : ""}`

            return (
                <Task key={t.id}
                    todoId={todoList.id}
                    task={t}
                />
                // <li key={t.id} className={style}>
                //     <input
                //         type="checkbox" checked={t.isDone}
                //         onChange={changeCheckboxHandler}
                //     />
                //     <EditableSpan
                //         value={t.title}
                //         onChange={(value) => dispatch(changeTitleTaskAC(todoList.id, t.id, value))}
                //     />
                //     {t.isDone}
                //     <button onClick={clickRemoveHandler}>X</button>
                // </li>
            )
        })
        : <span>Create task</span>

    const addTaskHandler = useCallback((title: string) => dispatch(addTaskAC(todoList.id, title)), [dispatch, todoList.id])

    const clickAllHandler = useCallback(() => dispatch(filterTasksAC(todoList.id, "all")), [dispatch, todoList.id])
    const clickActiveHandler = useCallback(() => dispatch(filterTasksAC(todoList.id, "active")), [dispatch, todoList.id])
    const clickCompletedHandler = useCallback(() => dispatch(filterTasksAC(todoList.id, "completed")), [dispatch, todoList.id])

    const clickRemoveTodoListHandler = () => {
        dispatch(removeTodoListAC(todoList.id))
    }

    const changeTodoListTitle = useCallback((value: string) => {
        dispatch(changeTodoListTitleAC(todoList.id, value))
    }, [dispatch, todoList.id])

    return (
        <div className={st.backgroundColor}>
            <div>
                <h3>
                    <EditableSpan
                        value={todoList.title}
                        onChange={(value) => changeTodoListTitle(value)}
                    />
                    <button onClick={clickRemoveTodoListHandler}>X</button>
                </h3>
                <AddItemForm
                    addItem={addTaskHandler}
                />
                <ul>
                    {tasksRender}
                </ul>
                <button className={todoList.filter === "all" ? st.colored : ""} onClick={clickAllHandler}>All</button>
                <button className={todoList.filter === "active" ? st.colored : ""} onClick={clickActiveHandler}>Active
                </button>
                <button className={todoList.filter === "completed" ? st.colored : ""}
                        onClick={clickCompletedHandler}>Completed
                </button>
            </div>
        </div>
    );
});


//!--------------------------------------------------------------------------------------------------------
// import React, {ChangeEvent, useState} from 'react';
// import {WordFilter} from "../App";
// import st from './TodolistWithRedux.module.css'
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
// export const TodolistWithRedux = ({
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