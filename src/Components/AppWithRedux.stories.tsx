import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {ReduxStoreProviderDecorator} from "../State/ReduxStoreProviderDecorator";
import AppWithRedux from "../State/AppWithRedux";
//Для того что бы работать со сторибуом историями, нужна сама компонента.

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLIST/AppWithRedux',
    component: AppWithRedux,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    decorators: [ReduxStoreProviderDecorator],

} as ComponentMeta<typeof AppWithRedux>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AppWithRedux> = (args) => <AppWithRedux />;

export const AppWithReduxStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
// AppWithReduxStory.args = {
//     // todoId: v1(),
//     // task: {id: v1(), title: 'React', isDone: true}
// };

// export const TaskStoryCheckFalse = Template.bind({});
// TaskStoryCheckFalse.args = {
//     todoId: v1(),
//     task: {id: v1(), title: 'Redux', isDone: false}
// };