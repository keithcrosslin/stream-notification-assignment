import React, { useState, useRef } from 'react';
// import Select from "react-dropdown-select";
import {
  StreamApp,
  FlatFeed,
  InfiniteScrollPaginator,
} from 'react-activity-feed';
// import 'react-activity-feed/dist/index.es.css';
import axios from 'axios';
import Post from './Post';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, button } from 'react-bootstrap';

function App() {
  const [studentState, setStudentState] = useState('JOIN');
  const [username, setUsername] = useState('');
  const [studentStreamCredentials, setStudentStreamCredentials] = useState(null);
  // const [streamClient, setStreamClient] = useState(null);
  const containerRef = useRef(null);
  // const [assignmentObject, setAssignmentObject] = useState('');
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [assignmentClass, setAssignmentClass] = useState('');
  const [assignmentInstructor, setAssignmentInstructor] = useState('');
  // const [assignmentResult, setAssignmentResult] = useState('');

  const register = async (e) => {
    try {
      e.preventDefault();

      var response = await axios.post('http://localhost:8080/registration', {
        username: username,
        // feed: 'assignment'
      });

      setStudentStreamCredentials({ token: response.data.userToken, apiKey: response.data.streamApiKey, appId: response.data.appId });
      // console.log(studentStreamCredentials);
      // debugger
      setStudentState("ASSIGNMENT");
    } catch (e) {
      console.error(e, e.error);
    }
  };


  const assignmentAdd = async (e) => {
    try {
      e.preventDefault();
      var response = await axios.post('http://localhost:8080/assignment', {
        username: username,
        title: assignmentTitle,
        class: assignmentClass,
        instructor: assignmentInstructor,
      });

      setAssignmentTitle("");
      setAssignmentInstructor("");
      setAssignmentClass("");

    } catch (e) {
      console.error(e, e.error);
    }
  };

  const logout = (e) => {
    setUsername('');
    setStudentStreamCredentials(null);
    setStudentState('JOIN');
  };

  function join() {
    return (
      <div className="container">
        <form className="login" onSubmit={register}>
          <p>Please enter your name to login</p>
          <div>
            <label>Student</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Student Name"
              required
            />

            <button type="submit">Log in</button>
          </div>
        </form>
      </div>

    );
  }

  function assignment() {
    return (
      <div className="container">
        <div className="button">
          <button onClick={logout}>Logout</button>
        </div>
        <form className="assignment" onSubmit={assignmentAdd}>
          <p>{username}, please provide details about the assignment that you want to add:</p>
          <div className="assignmentfields">
            <div className="inputpair">
              <label>Instructor:</label>
              <input
                className="inputField"
                type="text"
                value={assignmentInstructor}
                onChange={(e) => setAssignmentInstructor(e.target.value)}
                placeholder="Instructor of the Class"
                required
              />
            </div>
            <div>
              <label>Class:</label>
              <input
                className="inputField"
                type="text"
                value={assignmentClass}
                onChange={(e) => setAssignmentClass(e.target.value)}
                placeholder="101"
                required
              />
            </div>
            <div>
              <label>Title:</label>
              <input
                className="inputField"
                type="text"
                value={assignmentTitle}
                onChange={(e) => setAssignmentTitle(e.target.value)}
                placeholder="Title of Assignment"
                required
              />
            </div>
          </div>
          <div className="button">
            <button type="submit">Add Assignment</button>
          </div>
        </form >
        <div ref={containerRef}>
          <StreamApp apiKey={studentStreamCredentials.apiKey} token={studentStreamCredentials.token} appId={studentStreamCredentials.appId}>
            <div className="stream-app">
              <h3 className="app-title">Previously Added Assignments</h3>
            </div>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Instructor</th>
                  <th>Class</th>
                  <th>Title</th>
                  <th>Time</th>
                </tr>
              </thead>
              <FlatFeed
                feedGroup="assignment"
                notify
                options={{ limit: 10 }}
                Activity={Post}
              />
            </Table>
          </StreamApp>
        </div>
      </div >

    );
  }

  if (studentState === "JOIN") {
    return join();
  }

  if (studentState === "ASSIGNMENT") {
    return assignment();
  }

}
export default App;
