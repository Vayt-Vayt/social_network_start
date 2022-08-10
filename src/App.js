import React from 'react';
import './App.css';
import Header from './components/header/Header';
import NavBar from './components/navBar/NavBar';
import Routers from './components/navigations/Routers';

function App() {

  return (
    <div className='App'>
      <Header  className='headers'/>
      <NavBar  className='links'/>
      <div className='Content'>
        <Routers />
      </div>
    </div>
  );
}

export default App;
