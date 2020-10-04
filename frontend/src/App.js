import React from 'react';
// import {
//   StreamApp,
//   FlatFeed,
//   InfiniteScrollPaginator,
// } from 'react-activity-feed';
import 'react-activity-feed/dist/index.es.css';
// import axios from 'axios';
// import PostFormatter from './PostFormatter';
import './App.css';
import PanelStudent from "./PanelStudent.js";
import PanelInstructor from "./PanelInstructor.js";

function App() {

  return (
    <div className="panel-main">
      <div className="panel-child left">
        <p>Instructor Panel</p>
        <PanelInstructor></PanelInstructor>
      </div>
      <div className="panel-child right">
        <p>Student Panel</p>
        <PanelStudent></PanelStudent>
      </div>
    </div >
  );
}

export default App;