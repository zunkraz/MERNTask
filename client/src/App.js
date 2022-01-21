import React from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Projects from './components/projects/Projects';
import NewAccount from './components/auth/NewAccount'
import Login from './components/auth/Login';

import ProjectState from './context/projects/projectState'
import TaskState from './context/task/taskState';
import AlertState from './context/alerts/alertState';
import AuthState from './context/authentication/authState';
import tokenAuth from './config/tokenAuth';
import PrivateRoute from './components/routes/PrivateRoute';

//check if the token exists
const token = localStorage.getItem('token')
if(token){
  tokenAuth(token)
}

function App() {
  return (
  <ProjectState>
    <TaskState>
      <AlertState>
        <AuthState>
        <Router>
          <Routes>
            <Route  path="/" element={<Login />} />
            <Route  path="/new-account" element={<NewAccount />} />
            <Route  path="/" element={<PrivateRoute />}>
              <Route  path="/projects" element={<Projects />} />
            </Route>
          </Routes>
        </Router>
        </AuthState>
      </AlertState>
    </TaskState>
  </ProjectState>
    );
}

export default App;
