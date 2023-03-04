import React, {ChangeEvent, memo, useCallback} from 'react';
import {EditableSpan} from "./EditableSpan";
import {changeTitleTaskAC, checkBoxChangeAC, removeTaskAC} from "../State/tasks-redusers";
import st from "./Todolist.module.css";
import {useDispatch} from "react-redux";
import {TaskType} from "./TodolistWithRedux";

export type TaskPropsType = {
    todoId: string
    task: TaskType
}

export const Task = memo(({
                         todoId,
                         task
                     }: TaskPropsType) => {

    const dispatch = useDispatch()

    const clickRemoveHandler = useCallback(() => {
        dispatch(removeTaskAC(todoId, task.id))
    }, [dispatch, todoId, task.id])
    const changeCheckboxHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(checkBoxChangeAC(todoId, task.id, e.currentTarget.checked))
    }, [dispatch, todoId, task.id])

    const style = `${st.styleNone} ${task.isDone ? st.opacity : ""}`

    const changeTitleTask = useCallback((value: string) => {
        dispatch(changeTitleTaskAC(todoId, task.id, value))
    }, [dispatch, todoId, task.id])

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

