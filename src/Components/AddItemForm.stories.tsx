import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {AddItemForm} from "./AddItemForm";
import {action} from "@storybook/addon-actions";
import st from "./Todolist.module.css";
//Для того что бы работать со сторибуом историями, нужна сама компонента.


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLIST/AddItemForm',
    component: AddItemForm,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        addItem: {
            description: 'Button clicked inside form',
        },
    },
} as ComponentMeta<typeof AddItemForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AddItemFormStory.args = {
    addItem: action('Button clicked inside form'),//для того чтобы сделать описание на добавление item используем метод action
};

const AddItemFormError: ComponentStory<typeof AddItemForm> = (args) => {
    const [valueTitle, setValueTitle] = useState<string>('')
    const [error, setError] = useState<boolean | string>('Title is required')

    const changeValueTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValueTitle(e.currentTarget.value)
        if (valueTitle.length === 0 && error) {
            setError(false)
        }
    }

    const keyDownAddTodolist = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            args.addItem(e.currentTarget.value)
        }
    }
    const clickAddTaskHandler = () => {
        if (valueTitle.trim() !== '') {
            args.addItem(valueTitle)
            setValueTitle('')
        } else {
            setError(true)
        }
    }
    return (
        <div>
            <input className={error ? st.errorInput : ""}
                   type="text"
                   value={valueTitle}
                   onChange={changeValueTitleHandler}
                   onKeyDown={keyDownAddTodolist}
            />
            <button onClick={clickAddTaskHandler}>+</button>

            {error && <div className={st.coloredText}>field must be filled</div>}
        </div>
    );
}

export const AddItemFormErrorStory = AddItemFormError.bind({});
AddItemFormErrorStory.args = {
    addItem: action('Button clicked form empty will be error'),
};

