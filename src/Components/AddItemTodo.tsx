import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@material-ui/core";

export type AddItemTodoPropsType = {
    addItem: (title: string) => void
}
export const AddItemTodo = (props: AddItemTodoPropsType) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            addTask();
        }
    }

    const addTask = () => {
        if (title.trim() !== "") {
            props.addItem(title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    return (
        <div>
            <div>
                <TextField
                    size={"small"}
                    id={"outlined-basic"}
                    label={"Enter task"}
                    variant={"outlined"}
                    value={title}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyPressHandler}
                    error={!!error}
                    helperText={error}
                />
                <Button style={ {width: "20px"} }
                    onClick={addTask}
                    variant={"contained"}
                    color={"primary"}
                    size="medium">+
                </Button>
            </div>
        </div>
    );
}