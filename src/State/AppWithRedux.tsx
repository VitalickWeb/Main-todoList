import React, {memo, useCallback} from 'react';
import {TaskType, TodolistWithRedux} from "../Components/TodolistWithRedux";
import {v1} from "uuid";
import st from '../App.module.css'
import {AddItemForm} from "../Components/AddItemForm";

import {
    addTodoListAC,
} from "../State/TodoList-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";

export type WordFilter = "all" | "active" | "completed"

//данные тудулиста сгруппировали и типизировали в один объект
//поэтому мы можем создать массив в котором будут лежать объекты тудулистов
export type TodoListsType = {
    id: string
    title: string
    filter: WordFilter
}

export type TasksStateType = {
    [todoListID: string]: Array<TaskType>//в объект положили массив тасок
}

const AppWithRedux = memo(() => {
    //console.log('todoList')
    //Для того чтобы взять данные из редаксовского стора, используется хук useSelector
    //Первый тип в дженерике это тип с которым он работает "AppRootStateType"
    //Второй параметр это тип, который мы хотим получить в данном случае это массив - "Array[TodoListsType]"
    //useSelector принимает callback у которого в параметре state и должен вернуть нам часть нашего state
    const todoLists = useSelector<AppRootStateType, Array<TodoListsType>>(state => state.todoLists)
    // const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    //Теперь для того что бы предать нашей компоненте функционал, необходим метод dispatch
    //Потому что без него однонаправленный поток данных не стартует
    const dispatch = useDispatch()
    //Теперь для того что бы использовать нашу компоненту используем метод "dispatch" в функциях
    // const removeTask = (todoId: string, taskId: string) => {
    //     dispatch(removeTaskAC(todoId, taskId))//dispatchTasks вызывает функцию AC
    //     // const todolistTasks = tasks[todoId]//нашли массив по айдишке
    //     // const updateTasks = todolistTasks.filter(t => t.id !== taskId)//удалили из массива таску
    //     // const copyTasks = {...tasks}//сделали копию объекта
    //     // copyTasks[todoId] = updateTasks//в копию по нужному адресу положили массив с удаленной таской
    //     // setTasks(copyTasks)//засетали копию без удаленной таски
    //
    //     //setTasks({...tasks, [todoId]: tasks[todoId].filter(t => t.id !== taskId)})
    //     // console.log(setTasks(tasks.filter(t => t.id !== taskId ? t : '')))
    //     //для удаления таски нужно сравнить, если id не равны друг другу то удаляем таску
    //     //удаление происходит таким образом, когда id сравниваются друг с другом, то
    //     //сравнение проходит по всем таскам, те которые равны не удаляются
    // }
    // const addTask = (todoId: string, title: string) => {
    //     dispatch(addTaskAC(todoId, title))
    //     //let task = {id: v1(), title: title, isDone: false}
    //     //setTasks({...tasks, [todoId]: [task, ...tasks[todoId]]})
    //     // let task = {id: v1(), title: title, isDone: false}
    //     // setTasks([task, ...tasks])
    // }
    // const checkBoxChange = (todoId: string, checkId: string, isDone: boolean) => {
    //     dispatch(checkBoxChangeAC(todoId, checkId, isDone))
    //     //setTasks({...tasks, [todoId]: tasks[todoId].map(t => t.id === checkId ? {...t, isDone: isDone} : t)})
    //     // setTasks(tasks.map(t => t.id === checkId ? {...t, isDone: isDone} : t))
    // }
    // const changeTitleTask = (todoId: string, taskId: string, newTitle: string) => {
    //     dispatch(changeTitleTaskAC(todoId, taskId, newTitle))
    //     //setTasks({...tasks, [todoId]: tasks[todoId].map(t => t.id === taskId ? {...t, title: newTitle} : t)})
    //     //алгоритм: находим в каком тудулисте таска, дальше находим таску и меняем в ней title
    // }
    //
    // const changeTodoListTitle = (todoId: string, newTitle: string) => {
    //     dispatch(changeTodoListTitleAC(todoId, newTitle))
    //     //setTodoLists(todoLists.map(tl => tl.id === todoId ? {...tl, title: newTitle} : tl))
    // }
    // const filterTasks = (todoId: string, filterId: WordFilter) => {
    //     dispatch(filterTasksAC(todoId, filterId))
    //     //setTodoLists(todoLists.map(tl => tl.id === todoId ? {...tl, filter: filterId} : tl))
    //     //промапили все тудулисты без изменений, если нужно внести изменение, то ложим копию объекта тудулиста и
    //     //поменяем ему фильтр на то значение которое ему придет в параметрах
    // }
    // const removeTodoList = (todoId: string) => {
    //     dispatch(removeTodoListAC(todoId))
    //     //setTodoLists(todoLists.filter(tl => tl.id !== todoId))
    //     //tl.id которая не равна todoId, для которых выражение вернет true, колбэк функция метода филтер вернет новый массив
    // }

    const addTodoList = useCallback((title: string) => {
        let action = addTodoListAC(title, v1())
        dispatch(action)
        // let todoLisID = v1()
        // let newTodoList: TodoListsType = {id: todoLisID, title: title, filter: "all"}
        //setTodoLists([newTodoList, ...todoLists])
        //setTasks({...tasks, [todoLisID]: []})
        //создали хранилище для тасок, для нового тудулиста,
        // пустой массив означает что изначально там тасок нет
    },[dispatch])

    // const helperFilter = (todoId: string, tasks: TasksStateType, filter: WordFilter) => {
    //     switch (filter) {
    //         case "active":
    //             return tasks[todoId].filter(f => !f.isDone)//в переменную filteredTasks присваиваем состояние true или
    //         case "completed": // false для передачи переменной в компоненту todolist
    //             return tasks[todoId].filter(f => f.isDone)
    //         default:
    //             return tasks[todoId]
    //     }
    // }

   let renderTodoLists = todoLists.map((tl: TodoListsType) => {

        return (
            <TodolistWithRedux
                key={tl.id}
                todoList={tl}
                // todoId={tl.id}
                // title={tl.title}//в атрибутах передаем в пропсы в другую компоненту названия, таски
                // tasks={helperFilter(tl.id, tasks, tl.filter)}
                // removeTodoList={removeTodoList}
                // onChange={changeTitleTask}
                // changeTodolistTitle={changeTodoListTitle}
                // filter={tl.filter}

                // removeTask={removeTask}
                // addTask={addTask}
                // filterTasks={filterTasks}
                // checkboxChange={checkBoxChange}
            />
        )
    })

    return (
        <div className={st.container}>
            <div className={st.header}>
                <h1 className={st.appName}>To-do list</h1>
            </div>
            <div className={st.App}>

                <div className={st.blockTodoLists}>
                    <AddItemForm
                        addItem={addTodoList}
                    />
                    <div className={st.todoLists}>
                        {renderTodoLists}
                    </div>
                </div>
            </div>
            <div className={st.footer}>

            </div>
        </div>
    );
});

export default AppWithRedux;

//Если что-то поменяли в файле Package.jason, то нужно запустить yarn в терминале

//REDUX
//#################################################################################
//REDUX - это библиотека предназначенная для хранения управления данными - состояния приложения
//Redux и React работают автономно сами по себе отдельно друг от друга. Связка между ними библиотека REACT-REDUX
//Библиотека Redux построена на модели FLUX архитектуры. Модель Flux архитектуры - это однонаправленный поток данных
//Данные хранятся в js объекте под названием store, у которого есть свойства, где не посредственно данные хранятся и
//методы, которые необходимы для работы - это метод getState() который возвращает нам state свойства объекта store
//метод dispatch основной, который инициализирует перерисовку изменения данных приложения, соответственно поменяются данные
//и произойдет rerender компоненты. И метод subscribe основной dispatch он требует как и в useReducer объект action

//Flux архитектура отличается от того flux, который используется в redux во в чистом flux может быть несколько store объектов
//в redux он один единственный

//Принципы Redux их три состояния, обозначают: 1)данные хранятся в объекте под названием store, 2)данные нельзя изменять на
//прямую, 3) изменения данных происходит с помощью чистой функции reducer иммутабельно иденпотентно и с отсутствием сайд эффектов,

//Что такое однонаправленный поток данных и как он реализован на redux: Все начинается на iu и ui и заканчивается
//Если пользователь например ввел что-то в input, то есть взаимодействовал с ui интерфейсом, вызывается метод store dispatch
//отдаем ему объект action за который отвечает action creator  у нас сработают все reducers, которые есть у нас в нашем приложении
//при использовании useReducer функция, которая запускает состояние использует один reducer, а при использовании redux
//запускаются все reducers, в эти reducers попадает state c которым работает этот reducer и попадает объект action. Дальше
//находит он case с соответствующим типом action или нет. Все что меняется, так же меняется и в store меняются данные и
//перерисовалась наш UI.

//Redux придумали для того что бы отдельно выносить в сторону данные от приложения,
//дать возможность нашему приложению, брать эти данные со стороны и отрисовывать эти
//данные в тех компонентах в которых эти данные нужны и отрисовывают нам в UI.

//Где находится этот объект который мы создадим в наш объект store: он помещается в контекст функции от куда имеется доступ
//наших компонент к объекту. С помощью чего мы можем забрать данные? Компонента отрисовалась, нам эти данные нужно получить
//для этого используется хук useSelector,  забираем данные из state которому необходим компонент и отрисовываем, для того
//чтобы передать функционал компоненте необходим метод dispatch, для этого используется хук useDispatch. Для того чтобы
// подключить к контексту редаксовский store используется компонент провайдер из библиотеки REACT-REDUX. Так же используется
//хок коннект это функция которая принимает компонент и возвращает компонент с какой-то новой функциональностью.



//Оптимизация через HOK react.memo
//###############################################################################
//Rerender происходит в трех случаях: 1)изменение в state, 2)Изменение в Props, 3)Изменение в родительской компоненте

//Если пользователь, что то сделал в UI то сразу запускается callback, потом useSelector забирает данные из store, компонента
//вернула новый JSX, Bable компилирует JSX в java script code, создается еще один виртуал дом, происходит сравнение двух объектов, вычисляется
// разница, и браузер отрисовывает те узлы между которыми есть разница.


//Что происходит когда ререндерится AppWithRedux при добавлении таски например: создается новая функция, значит весь код в файле у нас срабатывает
//и создаются все функции по новой, в AddItemForm постоянно попадает новый объект, а раз попадает новый объект, React.memo видит что пришел
//новый объект то точно так же ререндерит компоненту AddItemForm. Что бы решить проблему лишней перерисовки дополнительно используют
//хук useCallback - предназначенный для кэширования вызова нашей функции

//useCallback - это функция, которая первым параметром принимает сам колбэк за которым будет следить, а вторым массив зависимостей
//в который попадают те переменные или функции от которых зависит надо использовать useCallback чтобы он запоминал вызов функции или нет,
//от чего это зависит: от state и от входящих пропсов

//обращаем внимание при перерисовке на то что нужно обернуть нужную компоненту HOK react.memo и если приходят в пропсах колбэки обернуть колбэки
//хуком useCallback и вторым параметром указать массивом зависимости те от которых зависит перерисовка.