import {
    addTodoListAC,
    changeTodoListTitleAC,
    filterTasksAC,
    removeTodoListAC,
    todoListReducer
} from "./TodoList-reducer"
import {v1} from "uuid";
import {TodoListsType, WordFilter} from "./AppWithRedux";

let todoListID1: string
let todoListID2: string
let startState: Array<TodoListsType>

beforeEach(() => {
    todoListID1 = v1()
    todoListID2 = v1()
    startState = [
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"},
    ]
})

test("correct todoList should be removed", () => {
    const endState = todoListReducer(startState, removeTodoListAC(todoListID1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListID2)
})

test("correct todoList should be added", () => {
    startState[1].title = "new Title"
    let newTodoListTitle = startState[1].title
    startState[1].id = v1()
    let newTodoListId = startState[1].id

    const endState = todoListReducer(startState, addTodoListAC(newTodoListTitle, newTodoListId))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodoListTitle)
    expect(endState[2].id).toBe(newTodoListId)
})

test("correct todoList should changed it's name", () => {
    let newTodoListTitle = "new TodolistWithRedux"

    const action = {
        type: "CHANGE-TODOLIST-TITLE",
        id: todoListID2,
        title: newTodoListTitle
    }

    const endState = todoListReducer(startState, changeTodoListTitleAC(action.id, newTodoListTitle))

    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].title).toBe(newTodoListTitle)
})

test("correct todoList should be filtered", () => {
    let newFilter: WordFilter = "active"

    const action = {
        type: "FILTER-TASK",
        id: todoListID2,
        filter: newFilter
    }

    const endState = todoListReducer(startState, filterTasksAC(action.id, action.filter))

    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe(newFilter)
})