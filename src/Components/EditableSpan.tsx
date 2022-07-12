import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChange: (newTitle: string) => void
}

export const EditableSpan = (props:  EditableSpanPropsType) => {
    const [editMode, setEditeMode] = useState(false)
    const [title, setTitle] = useState('')

    const editClickActive = () => {
        setEditeMode(true)
        setTitle(props.title)
    }
    const deactivateMode = () => {
        setEditeMode(false)
        if (title.length > 0) {
            props.onChange(title)
        } else {
            props.onChange('Here is your title')
        }

    }
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return editMode
       ? <input
            value={title}
            onBlur={deactivateMode}
            onChange={onChangeStatusHandler}
            autoFocus
        />
       : <span onDoubleClick={editClickActive} className={props.title === 'Here is your title' ? 'spanDefault' : ''}>{props.title}</span>

}