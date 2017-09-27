import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import rg4js from 'raygun4js';

rg4js('enableCrashReporting', true);
rg4js('enablePulse', true);
rg4js('apiKey', process.env.REACT_APP_RAYGUN_API_KEY);

try {
  // This will throw if the document has no head tag
  document.head.insertBefore(document.createElement('style'));
} catch(err) {
  //Raygun.send(err)
  throw err;
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
