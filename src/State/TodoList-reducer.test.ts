import {
    addTodoListAC,
    changeTodoListTitleAC,
    filterTasksAC,
    removeTodoListAC,
    TodoListReducer
} from "./TodoList-reducer"
import {v1} from "uuid";
import {TodoListsType, WordFilter} from "../AppWithReducer";


test("correct todoList should be removed", () => {
    let todoListID1 = v1()
    let todoListID2 = v1()

    const startState: Array<TodoListsType> = [
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"},
    ]

    const endState = TodoListReducer(startState, removeTodoListAC(todoListID1))

    expect(endState.length).toBe(1)
    expect(endState[0].title).toBe("What to buy")
})

test("correct todoList should be added", () => {
    let todoListID1 = v1()
    let todoListID2 = v1()

    const startState: Array<TodoListsType> = [
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"},
    ]

    startState[1].title = "new Title"
    let newTodoListTitle = startState[1].title

    const endState = TodoListReducer(startState, addTodoListAC(newTodoListTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodoListTitle)
})

test("correct todoList should changed it's name", () => {
    let todoListID1 = v1()
    let todoListID2 = v1()

    let newTodoListTitle = "new Todolist"

    const startState: Array<TodoListsType> = [
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"},
    ]

    const action = {
        type: "CHANGE-TODOLIST-TITLE",
        id: todoListID2,
        title: newTodoListTitle
    }

    const endState = TodoListReducer(startState, changeTodoListTitleAC(action.id, newTodoListTitle))

    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].title).toBe(newTodoListTitle)
})

test("correct todoList should be filtered", () => {
    let todoListID1 = v1()
    let todoListID2 = v1()

    let newFilter: WordFilter = "active"

    const startState: Array<TodoListsType> = [
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"},
    ]

    const action = {
        type: "FILTER-TASK",
        id: todoListID2,
        filter: newFilter
    }

    const endState = TodoListReducer(startState, filterTasksAC(action.id, action.filter))

    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe(newFilter)
})