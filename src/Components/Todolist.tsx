import React, {ChangeEvent} from 'react';
import {FilterValuesType} from '../App';
import {AddItemTodo} from "./AddItemTodo";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {Button, Checkbox, IconButton} from "@material-ui/core";

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
        const onClickDeleteHandler = () => props.removeTask(props.todoID, t.id)
        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(props.todoID, t.id, e.currentTarget.checked);
        }
        const onChangeTitleHandler = (newValue: string) => {
            props.changeTaskTitle(props.todoID, t.id, newValue);
        }

        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
            <Checkbox
                   onChange={onChangeStatusHandler}
                   checked={t.isDone}
                   name="checkedB"
                   color="primary"
            />
            <EditableSpan
                title={t.title}
                onChange={onChangeTitleHandler}
            />
            <IconButton aria-label="delete" onClick={onClickDeleteHandler}>
                <Delete fontSize="small" />
            </IconButton>
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
            <IconButton aria-label="delete" onClick={()=> removeTodolistHandler(props.todoID)}>
                <Delete fontSize="small" />
            </IconButton>
        </h3>
        <AddItemTodo
            addItem={addTask}
        />
        <ul style={ { listStyleType: "none" } }>
            {renderTasks}
        </ul>
        <div>
            <Button size={"small"} variant={props.filter === "all" ? "contained" : "text"}
                    onClick={onAllClickHandler}>All
            </Button>
            <Button size={"small"} color={"primary"} variant={props.filter === "active" ? "contained" : "text"}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button size={"small"} color={"secondary"} variant={props.filter === "completed" ? "contained" : "text"}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}

