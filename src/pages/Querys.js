import React, { useEffect } from 'react';
// import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiCourses, selectCourses } from '../redux/courses/courses';
import { fetchApiTutors, selectTutors } from '../redux/tutors/tutors';
import { fetchApiStudents, selectStudents } from '../redux/studens/students';
import { Wrapper, Form, ContainerInputs } from '../components';

const Querys = () => {
  const dispatch = useDispatch();
  const courses = useSelector(selectCourses);
  const tutors = useSelector(selectTutors);
  const students = useSelector(selectStudents);

  useEffect(() => {
    dispatch(fetchApiCourses());
    dispatch(fetchApiTutors());
    dispatch(fetchApiStudents());
  }, []);
  return (
    <Wrapper>
      <h2>Querys</h2>
      <Form>
        <ContainerInputs>
          <select>
            <option>select course</option>
            {courses.map((course) => (
              <option key={course.id}>{course.name}</option>
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
      </Form>
    </Wrapper>
  );
};

export default Querys;
