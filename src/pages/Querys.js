import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiCourses, selectCourses } from '../redux/courses/courses';
import { fetchApiTutors, selectTutors } from '../redux/tutors/tutors';
import {
  fetchApiStudents,
  selectStudents,
  selectCoursesByStudent,
  fetchApiCoursesByStudent,
} from '../redux/studens/students';
import {
  fetchApiCoursesByDay,
  fetchApiCoursesByTutor,
  selectCoursesByDay,
  selectCoursesByTutor,
} from '../redux/querys/querys';
import {
  Wrapper,
  Form,
  ContainerInputs,
  Button,
  ContainerCards,
  Card,
} from '../components';

const Querys = () => {
  const dispatch = useDispatch();
  const courses = useSelector(selectCourses);
  const tutors = useSelector(selectTutors);
  const coursesByDay = useSelector(selectCoursesByDay);
  const coursesByStudent = useSelector(selectCoursesByStudent);
  const students = useSelector(selectStudents);
  const coursesByTutor = useSelector(selectCoursesByTutor);
  const [dateCourses, setDateCourses] = useState([]);
  const [dateQuery, setDateQuery] = useState('');
  const [tutorQuery, setTutorQuery] = useState('');
  const [studentQuery, setStudentQuery] = useState('');

  useEffect(() => {
    dispatch(fetchApiCourses());
    dispatch(fetchApiTutors());
    dispatch(fetchApiStudents());
    if (courses.length > 0) {
      const data = courses.map((course) => ({
        id: course.id,
        date: course.date,
      }));
      const hash = {};
      const clearData = data.filter((dataCourse) => {
        const exists = !hash[dataCourse.date];
        hash[dataCourse.date] = true;
        return exists;
      });
      setDateCourses(clearData);
    }
  }, []);

  const styleP = { margin: '0', padding: '0' };

  return (
    <Wrapper>
      <h2>Querys</h2>
      <Form>
        <ContainerInputs>
          <p style={styleP}>Query courses by student</p>
          <select
            value={studentQuery}
            onChange={({ target }) => setStudentQuery(target.value)}
          >
            <option>select student</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
          <Button
            type="button"
            clickBtn={() => dispatch(fetchApiCoursesByStudent(studentQuery))}
          >
            query
          </Button>
        </ContainerInputs>
        <ContainerInputs>
          <p style={styleP}>Query courses by tutor</p>
          <select
            value={tutorQuery}
            onChange={({ target }) => setTutorQuery(target.value)}
          >
            <option>select tutor</option>
            {tutors.map((tutor) => (
              <option key={tutor.id}>{tutor.name}</option>
            ))}
          </select>
          <Button
            type="button"
            clickBtn={() => dispatch(fetchApiCoursesByTutor(tutorQuery))}
          >
            query
          </Button>
        </ContainerInputs>
        <ContainerInputs>
          <p style={styleP}>Query courses by day</p>
          <select
            value={dateQuery}
            onChange={({ target }) => setDateQuery(target.value)}
          >
            <option>select date courses</option>
            {dateCourses.map((dateCourse) => (
              <option key={dateCourse.id}>{dateCourse.date}</option>
            ))}
          </select>
          <Button
            type="button"
            clickBtn={() => dispatch(fetchApiCoursesByDay(dateQuery))}
          >
            query
          </Button>
        </ContainerInputs>
      </Form>
      <div>
        {coursesByDay?.length > 0 && (
          <>
            <p>{`Courses of ${dateQuery}`}</p>
            <ContainerCards>
              {coursesByDay.map((course) => (
                <Card
                  key={course.id}
                  name={course.name}
                  tutor={course.tutor}
                  description={course.description}
                  day={course.date}
                  hour={course.hour}
                />
              ))}
            </ContainerCards>
          </>
        )}
        {coursesByTutor?.length > 0 && (
          <>
            <p>Courses of tutor</p>
            <ContainerCards>
              {coursesByTutor.map((course) => (
                <Card
                  key={course.id}
                  name={course.name}
                  tutor={course.tutor}
                  description={course.description}
                  day={course.date}
                  hour={course.hour}
                />
              ))}
            </ContainerCards>
          </>
        )}
        {coursesByStudent?.length > 0 && (
          <>
            <p>Courses of student</p>
            <ContainerCards>
              {coursesByStudent.map((course) => (
                <Card
                  key={course.id}
                  name={course.name}
                  tutor={course.tutor}
                  description={course.description}
                  day={course.date}
                  hour={course.hour}
                />
              ))}
            </ContainerCards>
          </>
        )}
      </div>
    </Wrapper>
  );
};

export default Querys;
