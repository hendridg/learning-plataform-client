import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { useDispatch } from 'react-redux';
import { fetchApiCourses } from './redux/courses/courses';
import { fetchApiTutors } from './redux/tutors/tutors';
import { fetchApiStudents } from './redux/studens/students';
import {
  Courses, Tutors, Students, Querys,
} from './pages';
import NavBar from './components/NavBar';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchApiCourses());
    dispatch(fetchApiTutors());
    dispatch(fetchApiStudents());
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Courses />} />
          <Route path="/tutors" element={<Tutors />} />
          <Route path="/students" element={<Students />} />
          <Route path="/querys" element={<Querys />} />
          <Route path="/*" element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
