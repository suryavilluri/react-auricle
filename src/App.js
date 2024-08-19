import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import User from './components/User';
import Course from './components/Course';
import CreateCourse from './components/CreateCourse';
import CourseDetails from './components/CourseDetails';
import CreateLesson from './components/CreateLesson';

// const Home = () => <h1>Home Page</h1>;

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//       </Routes>
//     </Router>
//   );
// }

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path="/courses" element={<Course />} />
        <Route path="/create-course" element={<CreateCourse />} />
        <Route path="/create-lesson" element={<CreateLesson />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
      </Routes>
    </Router>
  );
}


export default App;
