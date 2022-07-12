import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Components/Todolist';
import {v1} from 'uuid';
import {AddItemTodo} from "./Components/AddItemTodo";

export type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

export type FilterValuesType = "all" | "active" | "completed";

function App() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    function removeTask(todoId: string, id: string) {
        setTasks({...tasks, [todoId]: tasks[todoId].filter(t => t.id !== id)})
    }

    function addTask(todoId: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todoId]: [newTask, ...tasks[todoId]]})
    }

    function changeStatus(todoId: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todoId]: tasks[todoId].map(t => t.id === taskId ? {...t, isDone} : t)})
    }
    const changeTaskTitle = (todoId: string, taskId: string, newTitle: string) => {
      console.log(todoId, taskId, newTitle)
      setTasks({...tasks, [todoId]: tasks[todoId].map(t => t.id === taskId ? {...t, title: newTitle} : t)})
    }

    function changeFilter(todoId: string, value: FilterValuesType) {
        setTodoLists(todoLists.map(t => t.id === todoId ? {...t, filter: value} : t));
    }

    const removeTodolist = (todoId: string) => {
        setTodoLists(todoLists.filter(t => t.id !== todoId))
        delete tasks[todoId]
    }

    const addTodoList = (title: string) => {
        let newId = v1()
        let newTodoList: TodoListsType = {id: newId, title, filter: 'all'}
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newId]: []})
    }

    const changeTodoListTitle = (todoId: string, todoTitle: string) => {
        setTodoLists(todoLists.map(t => t.id === todoId ? {...t, title: todoTitle} : t))
    }

    return (
        <div className="App">
            <AddItemTodo
                addItem={addTodoList}
            />
            {
                todoLists.map(t => {
                    let tasksForTodolist = tasks[t.id];
                    if (t.filter === "active") {
                        tasksForTodolist = tasks[t.id].filter(t => t.isDone);
                    }
                    if (t.filter === "completed") {
                        tasksForTodolist = tasks[t.id].filter(t => !t.isDone);
                    }
                    return (
                        <Todolist
                            todoID={t.id}
                            title={t.title}
                            key={t.id}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            changeTaskTitle={changeTaskTitle}
                            filter={t.filter}
                            removeTodolist={removeTodolist}
                            changeTodoListTitle={changeTodoListTitle}
                        />
                    )
                })
            }
        </div>
    );
}

export default App;
