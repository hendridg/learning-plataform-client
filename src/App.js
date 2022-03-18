import { useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addCourse,
  selectCourses,
  fetchApiCourses,
} from "./redux/courses/courses";
import {
  addTutor,
  editTutor,
  deleteTutor,
  fetchApiTutors,
  selectTutors,
} from "./redux/tutors/tutors";

function App() {
  const dispatch = useDispatch();
  const courses = useSelector(selectCourses);
  useEffect(() => {
    dispatch(fetchApiCourses());
    dispatch(fetchApiTutors());
    // dispatch(
    //   addCourse({
    //     id: 3,
    //     name: "Phy",
    //     date: "2022-03-05",
    //     hour: "9:00-10:00",
    //     tutor: "John Master",
    //   })
    // );
    // dispatch(
    //   addTutor({
    //     tutor_id: "12ju234442fff",
    //     name: "Stephen H. Kind ",
    //     tutor_sn: "ncipom",
    //   })
    // );
    // dispatch(
    //   editTutor({
    //     tutor_id: "12ju234442fff",
    //     name: "Stephen J. Kind",
    //     tutor_sn: "sldkjfkp",
    //   })
    // );
    // dispatch(deleteTutor("1223442"));
  }, []);

  return (
    <div className="App">
      <h1>Hello App</h1>
      {courses.map((course) => (
        <p key={course.id}>{course.name}</p>
      ))}
    </div>
  );
}

export default App;
