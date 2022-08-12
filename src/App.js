import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './components/PreLoader/Loader';
import './App.css';
import Header from './components/header/Header';
import NavBar from './components/navBar/NavBar';
import Routers from './components/navigations/Routers';
import { initializedThunk } from './components/redux/appReducer';

function App() {
  const { initialized } = useSelector(state => state.app)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializedThunk())
  }, [dispatch])

  if (!initialized) {
    return <Loader />
  }
 
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
