import React, {useEffect} from 'react'
import {RouteComponentProps} from "@reach/router";
import useAsync, {Status} from "../hooks/useAsync";
import {executeTask, getTask} from "../client";
import ParameterForm from "./ParameterForm";

type TaskDetailsProps = RouteComponentProps & {
    id?: string
}

export function TaskDetails({id}: TaskDetailsProps) {
    const {execute: load, value: task} = useAsync(getTask)

    const {execute, value: result, status} = useAsync(executeTask)

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
            <div className="message is-success">
                <div className="message-header">Task executed successfully</div>
                <pre className="message-body">{result?.output}</pre>
            </div>}

            {status === Status.Error &&
            <div className="message is-danger">
                <div className="message-header">Task failed: exit code {result?.statusCode}</div>
                <div className="message-body">
                    <pre>{result?.output}</pre>
                    <pre>{result?.error}</pre>
                </div>
            </div>}
        </div>)
}
