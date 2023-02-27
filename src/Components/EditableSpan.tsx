import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';

export type ChangeTitlePropsType = {
    value: string
    onChange: (newTitle: string) => void
}

export const EditableSpan = memo(({
                                 value,
                                 onChange,
                             }: ChangeTitlePropsType) => {
console.log('editableSpan')
    //Алгоритм: нам нужно, что бы этот компонент в обычном состоянии выводил что-то для чтения,
    //и, если мы кликнем по этому элементу, то появится форма для редактирования.
    //Для этого нам нужно начать с того что наш компонент будет иметь внутреннее состояние,
    //который будет работать в двух режимах: редактирования и просмотра, если включен то для записи, если выключен то для просмотра
    const [editMode, setEditMode] = useState<boolean>(false)
    const [changeTitle, setChangeTitle] = useState<string>(value)

    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setChangeTitle(e.currentTarget.value)
    }

    const keyDownChangeTitle = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === "Enter" && activeViewMode()
    }

    const activateEditMode = () => {
        setEditMode(true)
    }

    const activeViewMode = () => {
        setEditMode(false)
        onChange(changeTitle)
        //выключаем режим редактирования и помещаем содержимое локального стэйта
    }

    return (
        <>
            {editMode
                ? <input value={changeTitle}
                         onChange={changeTitleHandler}
                         onKeyDown={keyDownChangeTitle}
                         onBlur={activeViewMode}
                         autoFocus/>
                : <span onDoubleClick={activateEditMode}>{value}</span>}
        </>
    );
});

