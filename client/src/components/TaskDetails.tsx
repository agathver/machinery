import React, {useEffect} from 'react'
import {RouteComponentProps} from "@reach/router";
import useAsync from "../hooks/useAsync";
import {getTask, Task} from "../client";

type TaskDetailsProps = RouteComponentProps & {
    id?: string
}

export function TaskDetails({id}: TaskDetailsProps) {
    const {execute: loadTask, value: task} = useAsync<Task, string>(getTask)

    useEffect(() => {
        (async () => {
            await loadTask(id!)
        })()
    }, [loadTask, id])

    return (
        <div className="container">
            <h1>{task?.name}</h1>
            <p>{task?.description}</p>
        </div>
    )
}
