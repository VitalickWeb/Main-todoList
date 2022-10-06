

import {addTaskAC, changeTitleTaskAC, checkBoxChangeAC, removeTaskAC, tasksReducer} from "./tasks-redusers";
import {addTodoListAC, removeTodoListAC} from "./TodoList-reducer";
import {TasksStateType} from "./AppWithRedux";

let taskState: TasksStateType

beforeEach(() => {
    taskState = {
        "todolistId1": [
            {id: "1", title: "HTML", isDone: true},
            {id: "2", title: "CSS", isDone: true},
            {id: "3", title: "JS", isDone: true},
            {id: "4", title: "REACT", isDone: false},
            {id: "5", title: "REDUX", isDone: false},
        ],
        "todolistId2": [
            {id: "1", title: "milk", isDone: true},
            {id: "2", title: "bread", isDone: true},
            {id: "3", title: "butter", isDone: true},
            {id: "4", title: "string", isDone: false},
            {id: "5", title: "strop", isDone: false},
        ],
    }
})

test("correct task should be removed", () => {
    let removeTask = removeTaskAC("todolistId2","5")
    const endState = tasksReducer(taskState, removeTask)

    expect(endState).toEqual(  {
        "todolistId1": [
            {id: "1", title: "HTML", isDone: true},
            {id: "2", title: "CSS", isDone: true},
            {id: "3", title: "JS", isDone: true},
            {id: "4", title: "REACT", isDone: false},
            {id: "5", title: "REDUX", isDone: false},
        ],
        "todolistId2": [
            {id: "1", title: "milk", isDone: true},
            {id: "2", title: "bread", isDone: true},
            {id: "3", title: "butter", isDone: true},
            {id: "4", title: "string", isDone: false},
        ],
    });
})

test('correct task should be added to correct array', () => {
    const action = addTaskAC("todolistId2", "juice");
    const endState = tasksReducer(taskState, action)

    expect(endState["todolistId1"].length).toBe(5);
    expect(endState["todolistId2"].length).toBe(6);
    expect(endState["todolistId2"][0].id).toBeDefined();//id будет создан не будет пустота
    expect(endState["todolistId2"][0].title).toBe("juice");
    expect(endState["todolistId2"][0].isDone).toBe(false);
})

test('status of specified task should be changed', () => {
    const action = checkBoxChangeAC( "todolistId2", "2", false);
    const endState = tasksReducer(taskState, action)

    expect(endState["todolistId1"][1].isDone).toBe(true);
    expect(endState["todolistId2"][1].isDone).toBe(false);
});


test('new title should be added', () => {
    const action = changeTitleTaskAC( "todolistId2", "2", "some title");
    const endState = tasksReducer(taskState, action)

    expect(endState["todolistId1"][1].title).toBe("CSS");
    expect(endState["todolistId2"][1].title).toBe("some title");
});

test('new array should be added when new todolist is added', () => {
    const action = addTodoListAC("new todolist", "todolistId3");
    const endState = tasksReducer(taskState, action)

    const keys = Object.keys(endState);//в переменную попадет 2 массива с тудулистами и
    //третий ключ и пустой массив
    const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});



test('property with todolistId should be deleted', () => {
    const action = removeTodoListAC("todolistId2");
    const endState = tasksReducer(taskState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});