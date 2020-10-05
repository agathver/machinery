import React from 'react';
import './App.css';
import {Redirect, Router} from "@reach/router";
import TaskList from "./TaskList";
import {TaskDetails} from "./TaskDetails";


function App() {
    return (
        <main>
            <Router>
                <Redirect from="/" to="/tasks" noThrow/>
                <TaskList path="/tasks"/>
                <TaskDetails path="/tasks/:id"/>
            </Router>
        </main>
    );
}

export default App;
