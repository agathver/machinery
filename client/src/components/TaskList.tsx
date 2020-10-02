import React, {useEffect} from "react";
import useAsync from "../hooks/useAsync";
import {RouteComponentProps} from "@reach/router";
import {ListTaskResponse, listTasks} from "../client";

import "./TaskList.scss"

export default function TaskList(_: RouteComponentProps) {
    const {execute: loadTasks, value: taskList} = useAsync<ListTaskResponse>(listTasks)

    useEffect(() => {
        (async () => {
            await loadTasks()
        })()
    }, [loadTasks])

    return (
        <div className="task-list container">
            <ul className="task-list-box box">
                {taskList?.tasks.map((task) => (
                    <li className="block" key={task.value}>
                        <div className="title is-size-5">{task.name}</div>
                        <div className="subtitle is-size-6">{task.description}</div>
                    </li>))}
            </ul>
        </div>
    )
}
