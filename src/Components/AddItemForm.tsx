import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import st from "./Todolist.module.css";

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = ({
                                addItem,
                            }: AddItemFormPropsType) => {

    const [valueTitle, setValueTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const changeValueTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValueTitle(e.currentTarget.value)
        if (valueTitle.length === 0 && error) {
            setError(false)
        }
        // console.log(valueTitle, 'function')
        //функция сработав на событие сэтает новое значение
        //поэтому если поставить консоль лог здесь в функции, оно будет
        //брать предыдущее значение, потому что useState работает асинхронно
    }

    const keyDownAddTodolist = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItem(e.currentTarget.value)
        }
    }

    const clickAddTaskHandler = () => {
        if (valueTitle.trim() !== '') {
            addItem(valueTitle)
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

            {error && <div className={st.coloredText}>Enter the message</div>}
        </div>
    );
};

