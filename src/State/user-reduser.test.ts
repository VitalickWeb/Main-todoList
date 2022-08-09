import {UserReducer} from "./user-reduser";

test.skip('user reducer should increment only age', () => {
    const startState = {
        age: 27,
        childrenCount: 2,
        name: 'Vit',
    }

    const endState = UserReducer(startState, {type: "INCREMENT-AGE"})

    expect(endState.age).toBe(28)
    expect(endState.childrenCount).toBe(2)

})


test.skip('user reducer should increment only childrenCount', () => {
    const startState = {
        age: 27,
        childrenCount: 2,
        name: 'Vit',
    }

    const endState = UserReducer(startState, {type: "INCREMENT-CHILDREN-COUNT"})

    expect(endState.age).toBe(27)
    expect(endState.childrenCount).toBe(3)

})

test('user reducer should increment only childrenCount', () => {
    const startState = {
        age: 27,
        childrenCount: 2,
        name: 'Vit',
    }

    let changeName = 'Vitaliy'

    const endState = UserReducer(startState, {type: "CHANGE-NAME", newName: changeName})

    expect(endState.age).toBe(27)
    expect(endState.childrenCount).toBe(2)
    expect(endState.name).toBe(changeName)

})