import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Task} from "./Task";
import {v1} from "uuid";
import {ReduxStoreProviderDecorator} from "../State/ReduxStoreProviderDecorator";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../State/store";
import {TaskType} from "./TodolistWithRedux";
//Для того что бы работать со сторибуом историями, нужна сама компонента.

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLIST/Task',
    component: Task,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    decorators: [ReduxStoreProviderDecorator],
    argTypes: {
        todoId: {
            todoId: v1(),
        },
    },
} as ComponentMeta<typeof Task>;

const TaskCopy = () => {
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][0])
    return <Task task={task} todoId={'todolistId1'}/>
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args}/>;
const Template2: ComponentStory<typeof Task> = (args) => <TaskCopy />;

export const TaskStoryCheckTrue = Template.bind({});
export const TaskWithReduxStory = Template2.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskStoryCheckTrue.args = {
    todoId: v1(),
    task: {id: v1(), title: 'React', isDone: true}
};

export const TaskStoryCheckFalse = Template.bind({});
TaskStoryCheckFalse.args = {
    todoId: v1(),
    task: {id: v1(), title: 'Redux', isDone: false}
};

