import {TaskType} from "../Components/Todolist";
import {TasksStateType} from "../App";


//автоматическая типизация, типизируем функцию с помощью ReturnType, и с помощью typeof погружаемся глубже типизируя объект
//таким образом мы протипизировали объект, который называется action
type removeTodoListACType = ReturnType<typeof removeTaskAC>

type ACType = removeTodoListACType

export const TasksReducer = (state: TasksStateType, action: ACType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {...state, [action.payload.todoId]: state[action.payload.todoId].filter(t => t.id !== action.payload.taskId)}
        }
        default:
            return state
    }
};

//ActionCreator - это функция, которая вернет объект
export const removeTaskAC = (todoId: string, taskId: string) => {
    return {
        type: "REMOVE-TASK", //поле type это ключ от кейса, в зависимости от которого пользователь будет взаимодействовать
        payload: {
            todoId,
            taskId,
        }
    } as const // если мы пишем автоматическую типизацию, то всегда пишем as const, иначе ляжет приложение
}