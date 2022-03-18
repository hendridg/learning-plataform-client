import { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectCourses, fetchApiCourses } from './redux/courses/courses';
import {
  addTutor,
  fetchApiTutors,
  fetchPostTutor,
  selectTutors,
} from './redux/tutors/tutors';

function App() {
  const dispatch = useDispatch();
  const courses = useSelector(selectCourses);
  const tutors = useSelector(selectTutors);
  useEffect(() => {
    dispatch(fetchApiCourses());
    dispatch(fetchApiTutors());
  }, []);

  return (
    <div className="App">
      <h1>Hello App</h1>
      {courses.map((course) => (
        <p key={course.id}>{course.name}</p>
      ))}
      <button
        type="button"
        onClick={() => {
          if (tutors.find((tutor) => tutor.tutor_sn === 'ncipom')) {
            return alert('Tutor already exist!');
          }
          dispatch(
            addTutor({
              id: 121212,
              name: 'Stephen H. Kind ',
              tutor_sn: 'ncipom',
            }),
          );
          return dispatch(
            fetchPostTutor({
              id: 121212,
              name: 'Stephen H. Kind ',
              tutor_sn: 'ncipom',
            }),
          );
        }}
      >
        add tutor
      </button>
    </div>
  );
}

export default App;
