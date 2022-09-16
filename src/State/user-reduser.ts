import retryTimes = jest.retryTimes;

type StateType = {
    age: number
    childrenCount: number
    name: string
}
type ActionType = {
    type: string
    [key: string]: any
}

export const UserReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case "INCREMENT-AGE":
            return {
                ...state,
                age: state.age + 1
            }
        case "INCREMENT-CHILDREN-COUNT":
            return {
                ...state,
                childrenCount: state.childrenCount += 1
            }
        case "CHANGE-NAME":
            return {
                ...state,
                name: action.newName//берем имя у action вторым параметром
            }
        default:
            throw new Error("I don't understand what this an action type")
    }
}