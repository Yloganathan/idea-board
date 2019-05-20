import React from 'react';
import { Route } from 'react-router-dom';
import './App.scss';

import Home from '../Home/Home';
import IdeaDetails from '../IdeaDetails/IdeaDetails';

const App = () => {
  return (
    <div className="App">
    
      <Route exact={true} path='/' component={Home} />
      <Route path='/ideas/:ideaId' component={IdeaDetails} />
    </div>
  );
}

export default App;

