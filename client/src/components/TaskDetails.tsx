import React, {useEffect} from 'react'
import {RouteComponentProps} from "@reach/router";
import useAsync, {Status} from "../hooks/useAsync";
import {executeTask, getTask} from "../lib/client";
import ParameterForm from "./ParameterForm";

type TaskDetailsProps = RouteComponentProps & {
    id?: string
}

function renderError(error: Error) {
    return <div className="message is-danger mt-5">
        <div className="message-header">Task failed</div>
        <div className="message-body">
            <p>{error.message}</p>
        </div>
    </div>;
}

export function TaskDetails({id}: TaskDetailsProps) {
    const {execute: load, value: task} = useAsync(getTask)

    const {execute, value: result, status, error} = useAsync(executeTask)

    useEffect(() => {
        (async () => {
            await load(id!)
        })()
    }, [load, id])

    return (
        <div className="container box">
            <h1 className="title">{task?.name}</h1>
            <p className="subtitle">{task?.description}</p>

            {task && <ParameterForm parameters={task.parameters} onSubmit={params => {
                console.log(params);
                (async () => execute({id: id!, params}))()
            }}/>}

            {status === Status.Success &&
            <div className="message is-success mt-5">
                <div className="message-header">Task executed successfully</div>
                <pre className="message-body">{result?.output}</pre>
            </div>}

            {status === Status.Error && renderError(error)}
        </div>)
}
