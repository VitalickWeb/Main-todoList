
import {TasksStateType} from "../AppWithReducer";
import {addTaskAC, changeTitleTaskAC, checkBoxChangeAC, removeTaskAC, tasksReducer} from "./tasks-redusers";
import {addTodoListAC, removeTodoListAC} from "./TodoList-reducer";


let taskState: TasksStateType

beforeEach(() => {
    taskState = {
        "todoListID1": [
            {id: "1", title: "HTML", isDone: true},
            {id: "2", title: "CSS", isDone: true},
            {id: "3", title: "JS", isDone: true},
            {id: "4", title: "REACT", isDone: false},
            {id: "5", title: "REDUX", isDone: false},
        ],
        "todoListID2": [
            {id: "1", title: "milk", isDone: true},
            {id: "2", title: "bread", isDone: true},
            {id: "3", title: "butter", isDone: true},
            {id: "4", title: "string", isDone: false},
            {id: "5", title: "strop", isDone: false},
        ],
    }
})

test("correct task should be removed", () => {
    let removeTask = removeTaskAC("todoListID2","5")
    const endState = tasksReducer(taskState, removeTask)

    expect(endState).toEqual(  {
        "todoListID1": [
            {id: "1", title: "HTML", isDone: true},
            {id: "2", title: "CSS", isDone: true},
            {id: "3", title: "JS", isDone: true},
            {id: "4", title: "REACT", isDone: false},
            {id: "5", title: "REDUX", isDone: false},
        ],
        "todoListID2": [
            {id: "1", title: "milk", isDone: true},
            {id: "2", title: "bread", isDone: true},
            {id: "3", title: "butter", isDone: true},
            {id: "4", title: "string", isDone: false},
        ],
    });
})

test('correct task should be added to correct array', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false}
        ]
    };

    const action = addTaskAC("todolistId2", "juice");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();//id будет создан не будет пустота
    expect(endState["todolistId2"][0].title).toBe("juice");
    expect(endState["todolistId2"][0].isDone).toBe(false);
})

test('status of specified task should be changed', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };

    const action = checkBoxChangeAC( "todolistId2", "2", false);

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].isDone).toBe(true);
    expect(endState["todolistId2"][1].isDone).toBe(false);
});


test('new title should be added', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };
    const action = changeTitleTaskAC( "todolistId2", "2", "some title");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].title).toBe("JS");
    expect(endState["todolistId2"][1].title).toBe("some title");
});

test('new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };

    const action = addTodoListAC("new todolist", "todolistId3");

    const endState = tasksReducer(startState, action)


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
    const startState: TasksStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };

    const action = removeTodoListAC("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});