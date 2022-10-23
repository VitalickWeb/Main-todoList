
import {v1} from "uuid";
import {addTodoListAT, removeTodoListAT} from "./TodoList-reducer";
import {TasksStateType} from "./AppWithRedux";

//автоматическая типизация, типизируем функцию с помощью ReturnType, и с помощью typeof погружаемся глубже типизируя объект
//таким образом мы протипизировали объект, который называется action
type removeTaskAT = ReturnType<typeof removeTaskAC>
type addTaskAT = ReturnType<typeof addTaskAC>
type checkBoxChangeAT = ReturnType<typeof checkBoxChangeAC>
type changeTitleTaskAT = ReturnType<typeof changeTitleTaskAC>

type actionsType = removeTaskAT
    | addTaskAT
    | checkBoxChangeAT
    | changeTitleTaskAT
    | addTodoListAT //говорим action task reducer, что кроме своих типов они будет принимать тип addTodoListAT
    | removeTodoListAT

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: actionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.payload.todoId]: state[action.payload.todoId].filter(t => t.id !== action.payload.taskId)
            }
        }
        case "ADD-TASK": {
            let task = {id: v1(), title: action.payload.title, isDone: false}
            return {
                ...state,
                [action.payload.todoId]: [task, ...state[action.payload.todoId]]
            }
        }
        case "CHECK-BOX-CHANGE": {
            return {
                ...state,
                [action.payload.todoId]: state[action.payload.todoId].map(t => t.id === action.payload.checkId ? {
                    ...t,
                    isDone: action.payload.isDone
                } : t)
            }
        }
        case "CHANGE-TITLE-TASK": {
            return {
                ...state,
                [action.payload.todoId]: state[action.payload.todoId].map(t => t.id === action.payload.taskId ? {...t, title: action.payload.newTitle} : t)
            }
        }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todoId]: []
            }
        case "REMOVE-TODOLIST":
            let copyState = {...state}
            delete copyState[action.todoId]
            return copyState
        default:
            return state
    }
};

//ActionCreator - это функция, которая вернет объект
export const removeTaskAC = (todoId: string, taskId: string) => {
    return {
        type: "REMOVE-TASK", //поле type это ключ от кейса, в зависимости от которого пользователь будет взаимодействовать
        payload: { //payload - полезная загрузка или информация, какие-то аргументы которые нам могут пригодится, для деструктуризации в кейсе
            todoId,
            taskId,
        }
    } as const // если мы пишем автоматическую типизацию, то всегда пишем as const, иначе ляжет приложение
}

export const addTaskAC = (todoId: string, title: string) => {
    return {
        type: "ADD-TASK",
        payload: {
            todoId,
            title
        }
    } as const
}

export const checkBoxChangeAC = (todoId: string, checkId: string, isDone: boolean) => {
    return {
        type: "CHECK-BOX-CHANGE",
        payload: {
            todoId,
            checkId,
            isDone
        }
    } as const
}

export const changeTitleTaskAC = (todoId: string, taskId: string, newTitle: string) => {
    return {
        type: "CHANGE-TITLE-TASK",
        payload: {
            todoId,
            taskId,
            newTitle
        }
    } as const
}
