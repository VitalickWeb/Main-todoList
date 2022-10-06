import {TodoListsType, WordFilter} from "./AppWithRedux";

export type removeTodoListAT = ReturnType<typeof removeTodoListAC>
type changeTodoListTitleAT = ReturnType<typeof changeTodoListTitleAC>
type filterTasksAT = ReturnType<typeof filterTasksAC>
export type addTodoListAT = ReturnType<typeof addTodoListAC>

type ACType = removeTodoListAT | changeTodoListTitleAT | filterTasksAT | addTodoListAT


//Cоздаём initialState для reducers
// Ещё одно: с первым системным экшеном, который редакс диспатчит\отправляет в наши редьюсеры стейт не приходит.
// Он равен undefined, его нет, потому что жизнь только зарождается:
// Поэтому для параметра state мы должны задать значение по дефолту, равное начальному состоянию.
// Пусть это будут пустые массив и объект:
const initialState: Array<TodoListsType> = []

//функция TodoListReducer, которая принимает в себя 2 параметра state и action, где state это данные, а action это объект
export const TodoListReducer = (state: Array<TodoListsType> = initialState, action: ACType): Array<TodoListsType> => {
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
            let newTodoList: TodoListsType = {id: action.todoId, title: action.title, filter: "all"}
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

export const  addTodoListAC = (title: string, todoId: string) => {
    return {
        type: "ADD-TODOLIST",
        title,
        todoId
    } as const
}