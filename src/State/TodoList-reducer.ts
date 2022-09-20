import {TasksPropsType} from "../Components/Todolist";
import {TodoListsType} from "../App";


type removeTodoListACType = ReturnType<typeof removeTodoListAC>

type ACType = removeTodoListACType
//функция TodoListReducer, которая принимает в себя 2 параметра state и action, где state это данные, а action это объект
export const TodoListReducer = (state: Array<TodoListsType>, action: ACType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return {...state, }
        }
        default:
            return state
    }
};

//ActionCreator - это функция, которая вернет объект
export const removeTodoListAC = (todoId: string) => {
    return {
        type: "REMOVE-TODOLIST", // //поле type это ключ от кейса, в зависимости от которого пользователь будет взаимодействовать
        payload: { //payload - полезная загрузка или информация, какие-то аргументы которые нам могут пригодится
            todoId
        }
    } as const
}