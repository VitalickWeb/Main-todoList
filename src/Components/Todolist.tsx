import React, {ChangeEvent} from 'react';
import {FilterValuesType} from '../App';
import {AddItemTodo} from "./AddItemTodo";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todoID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todoId: string, taskId: string) => void
    changeFilter: (todoId: string, value: FilterValuesType) => void
    addTask: (todoId: string, title: string) => void
    changeTaskStatus: (todoId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todoId: string, taskId: string,  newTitle: string) => void
    changeTodoListTitle: (todoId: string, todoTitle: string) => void
    filter: FilterValuesType
    removeTodolist: (todoId: string) => void

}

export function Todolist(props: PropsType) {

    const renderTasks = props.tasks.map(t => {
        const onClickHandler = () => props.removeTask(props.todoID, t.id)
        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(props.todoID, t.id, e.currentTarget.checked);
        }
        const onChangeTitleHandler = (newValue: string) => {
            props.changeTaskTitle(props.todoID, t.id, newValue);
        }

        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
            <input type="checkbox"
                   onChange={onChangeStatusHandler}
                   checked={t.isDone}/>
            <EditableSpan
                title={t.title}
                onChange={onChangeTitleHandler}
            />
            <button onClick={onClickHandler}>x</button>
        </li>
    })

    const onAllClickHandler = () => props.changeFilter(props.todoID, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todoID, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todoID, "completed");

    const removeTodolistHandler = (todoId: string) => {
        props.removeTodolist(todoId)
    }

    const addTask = (title: string) => {
        props.addTask(props.todoID, title)
    }

    const onChangeTodoListTitle = (todoTitle: string) => {
        props.changeTodoListTitle(props.todoID, todoTitle)
    }

    return <div>
        <h3>
            <EditableSpan
                title={props.title}
                onChange={onChangeTodoListTitle}
            />

            <button onClick={()=> removeTodolistHandler(props.todoID)}>X</button>
        </h3>
        <AddItemTodo
            addItem={addTask}
        />
        <ul>
            {renderTasks}
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}

