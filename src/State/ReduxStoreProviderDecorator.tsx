import React from 'react';
import {AppRootStateType, store} from "./store";
import {Provider} from "react-redux";
import {tasksReducer} from "./tasks-redusers";
import {combineReducers, legacy_createStore} from "redux";
import {todoListReducer} from "./TodoList-reducer";
import {v1} from "uuid";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoId: todoListReducer
})

const initialGlobalState = {
    todoId: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all'}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: false}
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'React Book', isDone: false}
        ]
    }
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType)

//Обертка HOK
export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return (
        <Provider store={storyBookStore}>{storyFn()}</Provider>
    );
};

//Если мы хотим создать обертку HOK или вообще какие-то обертки, в данном случае мы создали
//для подключения редаксовского стора. У story book есть такое свойство как декораторы, которые
//принимают массив зависимости, и туда можно декораторы (обертки) вкладывать вот таким образом:
//decorators: [ReduxStoreProviderDecorator] в самом story book.