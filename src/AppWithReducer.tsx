import React, {useReducer} from 'react';
// import {TaskType, TodolistWithRedux} from "./Components/TodolistWithRedux";
// import {v1} from "uuid";
// import st from './App.module.css'
// import {AddItemForm} from "./Components/AddItemForm";
// import {addTaskAC, changeTitleTaskAC, checkBoxChangeAC, removeTaskAC, tasksReducer} from "./State/tasks-redusers";
// import {
//     addTodoListAC,
//     changeTodoListTitleAC,
//     filterTasksAC,
//     removeTodoListAC,
//     TodoListReducer
// } from "./State/TodoList-reducer";
//
// export type WordFilter = "all" | "active" | "completed"
//
// //данные тудулиста сгруппировали и типизировали в один объект
// //поэтому мы можем создать массив в котором будут лежать объекты тудулистов
// export type TodoListsType = {
//     id: string
//     title: string
//     filter: WordFilter
// }
//
// export type TasksStateType = {
//     [todoListID: string]: Array<TaskType>//в объект положили массив тасок
// }
//
// const AppWithReducer = () => {
//     const todoListID1 = v1()
//     const todoListID2 = v1()
//
//     //каждому тудулисту должен принадлежать массив с тасками, которые мы должны сложить в объект
//     const [todoLists, dispatchTodoLists] = useReducer(TodoListReducer, [
//         {id: todoListID1, title: "What to learn", filter: "all"},
//         {id: todoListID2, title: "What to buy", filter: "all"},
//     ])
//
//     //данные в app хранятся в данном случае в массиве объектов
//     //в функцию state попадают массивы объектов тасок и мы должны манипулировать тасками через function callback
//     //tasks это state, а dispatchTasks функция которая следит за этим state
//     //useReducer принимает 2 аргумента первый - reducer, второй - наш массив tasks
//     const [tasks, dispatchTasks] = useReducer(tasksReducer,{
//         [todoListID1]: [
//             {id: v1(), title: "HTML", isDone: true},
//             {id: v1(), title: "CSS", isDone: true},
//             {id: v1(), title: "JS", isDone: true},
//             {id: v1(), title: "REACT", isDone: false},
//             {id: v1(), title: "REDUX", isDone: false},
//         ],
//         [todoListID2]: [
//             {id: v1(), title: "milk", isDone: true},
//             {id: v1(), title: "bread", isDone: true},
//             {id: v1(), title: "butter", isDone: true},
//             {id: v1(), title: "string", isDone: false},
//             {id: v1(), title: "strop", isDone: false},
//         ],
//     })
//
//     const removeTask = (todoId: string, taskId: string) => {
//         dispatchTasks(removeTaskAC(todoId, taskId))//dispatchTasks вызывает функцию AC
//         // const todolistTasks = tasks[todoId]//нашли массив по айдишке
//         // const updateTasks = todolistTasks.filter(t => t.id !== taskId)//удалили из массива таску
//         // const copyTasks = {...tasks}//сделали копию объекта
//         // copyTasks[todoId] = updateTasks//в копию по нужному адресу положили массив с удаленной таской
//         // setTasks(copyTasks)//засетали копию без удаленной таски
//
//         //setTasks({...tasks, [todoId]: tasks[todoId].filter(t => t.id !== taskId)})
//         // console.log(setTasks(tasks.filter(t => t.id !== taskId ? t : '')))
//         //для удаления таски нужно сравнить, если id не равны друг другу то удаляем таску
//         //удаление происходит таким образом, когда id сравниваются друг с другом, то
//         //сравнение проходит по всем таскам, те которые равны не удаляются
//     }
//     const addTask = (todoId: string, title: string) => {
//         dispatchTasks(addTaskAC(todoId, title))
//         //let task = {id: v1(), title: title, isDone: false}
//         //setTasks({...tasks, [todoId]: [task, ...tasks[todoId]]})
//         // let task = {id: v1(), title: title, isDone: false}
//         // setTasks([task, ...tasks])
//     }
//     const checkBoxChange = (todoId: string, checkId: string, isDone: boolean) => {
//         dispatchTasks(checkBoxChangeAC(todoId, checkId, isDone))
//         //setTasks({...tasks, [todoId]: tasks[todoId].map(t => t.id === checkId ? {...t, isDone: isDone} : t)})
//         // setTasks(tasks.map(t => t.id === checkId ? {...t, isDone: isDone} : t))
//     }
//     const changeTitleTask = (todoId: string, taskId: string, newTitle: string) => {
//         dispatchTasks(changeTitleTaskAC(todoId, taskId, newTitle))
//         //setTasks({...tasks, [todoId]: tasks[todoId].map(t => t.id === taskId ? {...t, title: newTitle} : t)})
//         //алгоритм: находим в каком тудулисте таска, дальше находим таску и меняем в ней title
//     }
//
//     const changeTodoListTitle = (todoId: string, newTitle: string) => {
//         dispatchTodoLists(changeTodoListTitleAC(todoId, newTitle))
//         //setTodoLists(todoLists.map(tl => tl.id === todoId ? {...tl, title: newTitle} : tl))
//     }
//     const filterTasks = (todoId: string, filterId: WordFilter) => {
//         dispatchTodoLists(filterTasksAC(todoId, filterId))
//         //setTodoLists(todoLists.map(tl => tl.id === todoId ? {...tl, filter: filterId} : tl))
//         //промапили все тудулисты без изменений, если нужно внести изменение, то ложим копию объекта тудулиста и
//         //поменяем ему фильтр на то значение которое ему придет в параметрах
//     }
//     const removeTodoList = (todoId: string) => {
//         dispatchTodoLists(removeTodoListAC(todoId))
//         dispatchTasks(removeTodoListAC(todoId))
//         //setTodoLists(todoLists.filter(tl => tl.id !== todoId))
//         //tl.id которая не равна todoId, для которых выражение вернет true, колбэк функция метода филтер вернет новый массив
//     }
//     const addTodoList = (title: string) => {
//         let action = addTodoListAC(title, v1())
//         dispatchTodoLists(action)
//         dispatchTasks(action)
//         // let todoLisID = v1()
//         // let newTodoList: TodoListsType = {id: todoLisID, title: title, filter: "all"}
//         //setTodoLists([newTodoList, ...todoLists])
//         //setTasks({...tasks, [todoLisID]: []})
//         //создали хранилище для тасок, для нового тудулиста,
//         // пустой массив означает что изначально там тасок нет
//     }
//
//     const helperFilter = (todoId: string, tasks: TasksStateType, filter: WordFilter) => {
//         switch (filter) {
//             case "active":
//                 return tasks[todoId].filter(f => !f.isDone)//в переменную filteredTasks присваиваем состояние true или
//             case "completed": // false для передачи переменной в компоненту todolist
//                 return tasks[todoId].filter(f => f.isDone)
//             default:
//                 return tasks[todoId]
//         }
//     }
//
//     let renderTodoLists = todoLists.map((tl: TodoListsType) => {
//
//         return (
//             <TodolistWithRedux
//                 key={tl.id}
//                 todoId={tl.id}
//                 title={tl.title}//в атрибутах передаем в пропсы в другую компоненту названия, таски
//                 tasks={helperFilter(tl.id, tasks, tl.filter)}
//                 removeTodoList={removeTodoList}
//                 onChange={changeTitleTask}
//
//                 removeTask={removeTask}
//                 addTask={addTask}
//                 filterTasks={filterTasks}
//                 checkboxChange={checkBoxChange}
//                 filter={tl.filter}
//                 changeTodolistTitle={changeTodoListTitle}
//             />
//         )
//     })
//
//     return (
//         <div className={st.container}>
//             <div className={st.header}>
//                 <h1 className={st.appName}>To-do list</h1>
//             </div>
//             <div className={st.App}>
//
//                 <div className={st.blockTodoLists}>
//                     <AddItemForm
//                         addItem={addTodoList}
//                     />
//                     <div className={st.todoLists}>
//                         {renderTodoLists}
//                     </div>
//                 </div>
//             </div>
//             <div className={st.footer}>
//
//             </div>
//         </div>
//     );
// };
//
// export default AppWithReducer;
