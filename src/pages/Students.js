import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import { selectStudents } from '../redux/studens/students';
import { selectCourses } from '../redux/courses/courses';
import { Wrapper } from '../components';

const ContainerStudents = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 40rem;
  margin-top: 3rem;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  /* gap: 0.5rem; */
`;

const Student = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem;
  border: 1px solid lightgray;
  /* border-radius: 2px; */
  position: relative;
`;

const ModalAddCourses = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: 1px solid lightgray;
  border-radius: 2px;
  position: fixed;
  top: 25%;
  width: 14rem;
  height: 18rem;
  z-index: 10;
`;

const BtnImg = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  /* border: none; */
  background: none;
  cursor: pointer;
  img {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const Students = () => {
  const students = useSelector(selectStudents);
  const courses = useSelector(selectCourses);
  const [showModal, setshowModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState('');
  const [courseSelected, setCourseSelected] = useState('');
  const [studentCourses, setStudentCourses] = useState([]);
  const [coursesOptions, setCoursesOptions] = useState([]);

  useEffect(() => {
    // const coursesOptions = courses.map((course) => course.name);
    setCoursesOptions([...courses]);
    setCourseSelected('');
    setStudentCourses([]);
  }, [showModal]);

  useEffect(() => {
    if (coursesOptions.length > 0) {
      const restOfCourses = coursesOptions.filter(
        (course) => course.id !== +courseSelected,
      );
      setCoursesOptions(restOfCourses);
    }
  }, [courseSelected]);

  return (
    <>
      <Wrapper>
        <h3>Students</h3>
        <ContainerStudents>
          {students.map((student) => (
            <Student key={student.id}>
              <p>{student.name}</p>
              <p>{student.student_sn}</p>
              <BtnImg
                type="button"
                onClick={() => {
                  setshowModal(true);
                  setCurrentStudent(student.id);
                }}
              >
                <img src="/add-svgrepo-com.svg" alt="plus" />
                Add Courses
              </BtnImg>
            </Student>
          ))}
        </ContainerStudents>
        <>
          {showModal && (
            <ModalAddCourses>
              <p>{`Current Student ${currentStudent}`}</p>
              <p>{students[currentStudent - 1].name}</p>
              <select
                value={courseSelected}
                required
                onChange={({ target }) => {
                  setCourseSelected(target.value);
                  setStudentCourses([
                    ...studentCourses,
                    courses[target.value - 1],
                  ]);
                }}
              >
                <option>selec course</option>
                {coursesOptions.map((course) => (
                  <option key={uuidv4()} value={course.id}>
                    {`${course.name} by ${course.tutor}`}
                  </option>
                ))}
              </select>
              {studentCourses.map((course) => (
                <p key={uuidv4()}>{`${course.name} by ${course.tutor}`}</p>
              ))}
              <button type="button" onClick={() => setshowModal(false)}>
                close
              </button>
            </ModalAddCourses>
          )}
        </>
      </Wrapper>
    </>
  );
};

export default Students;
