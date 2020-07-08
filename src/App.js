import React from 'react';
import logo from './logo.svg';
import './App.css';
import {AppProvider, Page, Card, Button} from '@shopify/polaris';
import Projects from './Components/Projects/Projects';
import Teams from './Components/Teams/Teams';
import AddProject from './Components/AddProject/AddProject'

function App() {
  return (
    <div className="App">
      <AddProject/>
    </div>
  );
}

export default App;
