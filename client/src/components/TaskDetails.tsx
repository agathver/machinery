import React, {useEffect} from 'react'
import {RouteComponentProps} from "@reach/router";
import useAsync, {Status} from "../hooks/useAsync";
import {executeTask, getTask, Result, Task} from "../client";
import ParameterForm from "./ParameterForm";

type TaskDetailsProps = RouteComponentProps & {
    id?: string
}

export function TaskDetails({id}: TaskDetailsProps) {
    const {execute: load, value: task} = useAsync<Task, string>(getTask)

    const {execute: execute, value: result, status} = useAsync<Result, string>(executeTask)

    useEffect(() => {
        (async () => {
            await load(id!)
        })()
    }, [load, id])

    return (
        <div className="container box">
            <h1 className="title">{task?.name}</h1>
            <p className="subtitle">{task?.description}</p>

            {task?.parameters?.length ?
                <ParameterForm parameters={task.parameters!}/>
                : <div className="message">
                    <p className="message-body">This task has no parameters</p>
                </div>}

            <div className="field">
                <div className="control">
                    <div className="control">
                        <button onClick={() => execute(id!)} className="button is-success">Execute</button>
                    </div>
                </div>
            </div>

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
