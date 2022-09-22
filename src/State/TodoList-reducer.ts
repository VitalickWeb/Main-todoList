
import {TodoListsType, WordFilter} from "../AppWithReducer";
import {v1} from "uuid";


type removeTodoListAT = ReturnType<typeof removeTodoListAC>
type changeTodoListTitleAT = ReturnType<typeof changeTodoListTitleAC>
type filterTasksAT = ReturnType<typeof filterTasksAC>
type addTodoListAT = ReturnType<typeof addTodoListAC>

type ACType = removeTodoListAT | changeTodoListTitleAT | filterTasksAT | addTodoListAT
//функция TodoListReducer, которая принимает в себя 2 параметра state и action, где state это данные, а action это объект
export const TodoListReducer = (state: Array<TodoListsType>, action: ACType): Array<TodoListsType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter((tl: TodoListsType) => tl.id !== action.todoId)
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map((tl: TodoListsType) => tl.id === action.todoId ? {...tl, title: action.newTitle} : tl)
        }
        case "FILTER-TASK": {
            return state.map(tl => tl.id === action.todoId ? {...tl, filter: action.filterId} : tl)
        }
        case "ADD-TODOLIST": {
            let todoLisID = v1()
            let newTodoList: TodoListsType = {id: todoLisID, title: action.title, filter: "all"}
            return [newTodoList, ...state]
        }
        default:
            return state
    }
};

//ActionCreator - это функция, которая вернет объект
export const removeTodoListAC = (todoId: string) => {
    return {
        type: "REMOVE-TODOLIST", //поле type это ключ от кейса, в зависимости от которого пользователь будет взаимодействовать
            todoId
    } as const
}

export const changeTodoListTitleAC = (todoId: string, newTitle: string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        todoId,
        newTitle
    } as const
}

export const filterTasksAC = (todoId: string, filterId: WordFilter) => {
    return {
        type: "FILTER-TASK",
        todoId,
        filterId
    } as const
}

export const  addTodoListAC = (title: string) => {
    return {
        type: "ADD-TODOLIST",
        title
    } as const
}