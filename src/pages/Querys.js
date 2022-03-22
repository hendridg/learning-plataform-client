import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiCourses, selectCourses } from '../redux/courses/courses';
import { fetchApiTutors, selectTutors } from '../redux/tutors/tutors';
import { fetchApiStudents, selectStudents } from '../redux/studens/students';
import {
  fetchApiCoursesByDay,
  selectCoursesByDay,
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
  const students = useSelector(selectStudents);
  const [dateCourses, setDateCourses] = useState([]);
  const [dateQuery, setDateQuery] = useState('');

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
          <select>
            <option>select course</option>
            {courses.map((course) => (
              <option key={course.id}>
                {`${course.name} by ${course.tutor}`}
              </option>
            ))}
          </select>
          <select>
            <option>select tutor</option>
            {tutors.map((tutor) => (
              <option key={tutor.id}>{tutor.name}</option>
            ))}
          </select>
          <select>
            <option>select student</option>
            {students.map((student) => (
              <option key={student.id}>{student.name}</option>
            ))}
          </select>
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
        {coursesByDay.length > 0 && (
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
        )}
      </div>
    </Wrapper>
  );
};

export default Querys;
