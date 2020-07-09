import React from 'react';
import logo from './logo.svg';
import './App.css';
import {AppProvider, Page, Card, Button} from '@shopify/polaris';
import Projects from './Components/Projects/Projects';
import Teams from './Components/Teams/Teams';
import AddProject from './Components/AddProject/AddProject'
import ProjectContainer from './Components/ProjectContainer/ProjectContainer';
import { MemoryRouter, Route, Switch} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <MemoryRouter>
        <Switch>
          <Route exact path="/" component={Projects} />
          <Route path="/teams" component={Teams} />
          <Route path="/add-project" component={AddProject} />
          <Route path="/project-container" component={ProjectContainer} />
        </Switch>
      </MemoryRouter>
    </div>
  );
}

export default App;
