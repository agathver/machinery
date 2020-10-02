import React from 'react';
import './App.css';
import {Router} from "@reach/router";
import TaskList from "./components/TaskList";


function App() {
    return (
        <main>
            <Router>
                <TaskList path="/"/>
            </Router>
        </main>
    );
}

export default App;
