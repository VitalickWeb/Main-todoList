import React, {ChangeEvent, memo} from 'react';
import {EditableSpan} from "./EditableSpan";
import {changeTitleTaskAC, checkBoxChangeAC, removeTaskAC} from "../State/tasks-redusers";
import st from "./Todolist.module.css";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../State/store";
import {TaskType} from "./TodolistWithRedux";

export type TaskPropsType = {
    todoId: string
    taskId: string
}

export const Task = memo(({
                         todoId,
                         taskId
                     }: TaskPropsType) => {
console.log('task')
    let task = useSelector<AppRootStateType, TaskType>(state => state.tasks[todoId].filter(t => t.id === taskId)[0])
    const dispatch = useDispatch()

    const clickRemoveHandler = () => {
        dispatch(removeTaskAC(todoId, taskId))
    }
    const changeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(checkBoxChangeAC(todoId, task.id, e.currentTarget.checked))
    }

    const style = `${st.styleNone} ${task.isDone ? st.opacity : ""}`

    const changeTitleTask = (value: string) => {
        dispatch(changeTitleTaskAC(todoId, task.id, value))
    }

    return (
        <div>
            <li key={task.id} className={style}>
                <input
                    type="checkbox" checked={task.isDone}
                    onChange={changeCheckboxHandler}
                />
                <EditableSpan
                    value={task.title}
                    onChange={(value) => changeTitleTask(value)}
                />
                {task.isDone}
                <button onClick={clickRemoveHandler}>X</button>
            </li>
        </div>
    );
});

