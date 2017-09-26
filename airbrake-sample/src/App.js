import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import airbrakeJs from 'airbrake-js';

var airbrake = new airbrakeJs({
  projectId: process.env.REACT_APP_AIRBRAKE_PROJECT_ID,
  projectKey: process.env.REACT_APP_AIRBRAKE_PROJECT_KEY
});
airbrake.addFilter(function (notice) {
  notice.context.sourceMaps = {
    '*': 'https://gist.github.com/nickfloyd/13ffda91fe227f42734811d42bf82228.js', // for all files
  };
  notice.context.environment = 'development';
  return notice;
});

try {
  // This will throw if the document has no head tag
  document.head.insertBefore(document.createElement('style'));
} catch(err) {
  airbrake.notify(err);
  throw err;
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
