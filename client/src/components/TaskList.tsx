import React, {useEffect, useMemo, useState} from "react";
import useAsync from "../hooks/useAsync";
import {Link, RouteComponentProps} from "@reach/router";
import {ListTaskResponse, listTasks} from "../lib/client";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import Fuse from "fuse.js"


import "./TaskList.scss"

export default function TaskList(_: RouteComponentProps) {
    const {execute: loadTasks, value: listTaskResponse} = useAsync<ListTaskResponse>(listTasks)

    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        (async () => {
            await loadTasks()
        })()
    }, [loadTasks])

    const fuse = useMemo(() => new Fuse(listTaskResponse?.tasks || [], {
        keys: ['id', 'name', 'description']
    }), [listTaskResponse])

    const tasks = searchTerm ? fuse.search(searchTerm).map(result => result.item) : listTaskResponse?.tasks;

    return (
        <div className="task-list container pt-6">
            <h1 className="is-size-1">Machinery Console</h1>
            <div className="field mt-6">
                <div className="control has-icons-left">
                    <input className="input" type="text" placeholder="Search" value={searchTerm}
                           onChange={e => setSearchTerm(e.target.value)}/>
                    <span className="icon is-left">
                        <FontAwesomeIcon icon={faSearch}/>
                    </span>
                </div>
            </div>
            <ul className="task-list-box box mt-5">
                {tasks?.map((task) => (
                    <li className="block" key={task.id}>
                        <div className="title is-size-5">
                            <Link to={`/tasks/${task.id}`}>{task.name}</Link>
                        </div>
                        <div className="subtitle is-size-6">{task.description}</div>
                    </li>))}
            </ul>
        </div>
    )
}
