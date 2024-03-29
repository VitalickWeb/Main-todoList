
import {tasksReducer} from "./tasks-redusers";
import {addTodoListAC, todoListReducer} from "./TodoList-reducer";
import {TasksStateType, TodoListsType} from "./AppWithRedux";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};// в переменную записываем пустой объект, с типом TasksStateType
    const startTodoListsState: Array<TodoListsType> = [];

    const action = addTodoListAC("new todolist", "todolistId3");

    const endTasksState = tasksReducer(startTasksState, action)//в переменную записываем объект с ключом todoId и значение пустой таски
    const endTodoListsState = todoListReducer(startTodoListsState, action)//в переменной массив с тудулистом элементом объекта и тремя свойствами в этом объекте

    const keys = Object.keys(endTasksState);//в переменной лежит массив ключей строковое значение id тудулиста
    const idFromTasks = keys[0];//строковое значение id тудулиста
    const idFromTodoLists = endTodoListsState[0].id;//перезапись в другую переменную из переменной, где массив тудулистов, раз массив один элемент
    //то возьми у элемента с индексом 0 это объект у которой id этого тудулита

    expect(idFromTasks).toBe(action.todoId);
    expect(idFromTodoLists).toBe(action.todoId);
});


