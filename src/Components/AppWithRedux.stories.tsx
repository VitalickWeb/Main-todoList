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


//Библиотека snapshot нужна для тестирования компонент, по скрину с экрана компонент.
//Делается скрин компоненты с экрана и ложится в папку образцов, потом когда мы запускаем тесты
//берется снимок запускается сторибук и сравниваются с образцом, если снимок соответствует, то тест проходит.
//если в компоненте что то изменилось то тест не проходит.