import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Login from './components/Login/Login';
import ChatBox from './components/ChatBox/ChatBox';

const App = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Login}/>
      <Route path="/chat" component={ChatBox}/>
    </BrowserRouter>
  );
}
export default App;
