import React from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Projects from './components/projects/Projects';
import NewAccount from './components/auth/NewAccount'
import Login from './components/auth/Login';

import ProjectState from './context/projectState'
import TaskState from './context/task/taskState';

function App() {
  return (
  <ProjectState>
    <TaskState>
      <Router>
        <Routes>
          <Route  path="/" element={<Login />} />
          <Route  path="/new-account" element={<NewAccount />} />
          <Route  path="/projects" element={<Projects />} />
        </Routes>
      </Router>
    </TaskState>
  </ProjectState>
    );
}

export default App;
