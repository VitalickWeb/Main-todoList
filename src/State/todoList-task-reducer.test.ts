import {TasksStateType, TodoListsType} from "../AppWithReducer";
import {tasksReducer} from "./tasks-redusers";
import {addTodoListAC, TodoListReducer} from "./TodoList-reducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};// в переменную записываем пустой объект, с типом TasksStateType
    const startTodoListsState: Array<TodoListsType> = [];

    const action = addTodoListAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)//в переменную записываем объект с ключом todoId и значение пустой таски
    const endTodoListsState = TodoListReducer(startTodoListsState, action)//в переменной массив с тудулистом элементом объекта и тремя свойствами в этом объекте

    const keys = Object.keys(endTasksState);//в переменной лежит массив ключей строковое значение id тудулиста
    const idFromTasks = keys[0];//строковое значение id тудулиста
    const idFromTodoLists = endTodoListsState[0].id;//перезапись в другую переменную из переменной, где массив тудулистов, раз массив один элемент
    //то возьми у элемента с индексом 0 это объект у которой id этого тудулита

    expect(idFromTasks).toBe(action.todoId);
    expect(idFromTodoLists).toBe(action.todoId);
});


