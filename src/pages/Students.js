import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectStudents,
  addCourseStudent,
  fetchPutStudent,
} from '../redux/studens/students';
import { selectCourses } from '../redux/courses/courses';
import { Wrapper, ContainerInputs } from '../components';

const ContainerStudents = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 40rem;
  margin-top: 3rem;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
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
  z-index: 10;
  gap: 0.3rem;

  p {
    text-align: left;
    padding: 0;
    margin: 0;
  }

  h5 {
    padding: 2px;
    margin: 1rem 0;
    border-bottom: 1px lightgray solid;
  }

  select {
    padding: 0.5rem;
  }

  button {
    margin-top: 0.3rem;
    background: #228be6;
    color: white;
    font-weight: bold;
    border: none;
    padding: 0.3rem 2rem;
  }
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
  const dispatch = useDispatch();
  const [showModal, setshowModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState('');
  const [courseSelected, setCourseSelected] = useState('');
  const [studentCourses, setStudentCourses] = useState([]);
  const [coursesOptions, setCoursesOptions] = useState([]);

  useEffect(() => {
    setCoursesOptions([...courses]);
    setCourseSelected('');
    setStudentCourses([]);
  }, [showModal]);

  useEffect(() => {
    if (coursesOptions.length > 0 && courseSelected !== '') {
      const objCourseSelected = courses[courseSelected - 1];
      const restOfCourses = coursesOptions
        .filter((course) => course.id !== objCourseSelected.id)
        .filter(
          (course) => `${course.date}${course.hour}`
            !== `${objCourseSelected.date}${objCourseSelected.hour}`,
        );
      setCoursesOptions(restOfCourses);
      dispatch(
        addCourseStudent({ id: currentStudent, courses: studentCourses }),
      );
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
              <ContainerInputs>
                <p>
                  <strong>{students[currentStudent - 1].name}</strong>
                </p>
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
                    <option key={course.id} value={course.id}>
                      {`${course.name} by ${course.tutor}`}
                    </option>
                  ))}
                </select>
              </ContainerInputs>
              <div>
                <h5>Courses</h5>
                {studentCourses.map((course) => (
                  <p key={course.id}>
                    <strong>{`- ${course.name}`}</strong>
                    {` by ${course.tutor}`}
                  </p>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    dispatch(fetchPutStudent(students[currentStudent - 1]));
                    setshowModal(false);
                  }}
                >
                  save
                </button>
              </div>
            </ModalAddCourses>
          )}
        </>
      </Wrapper>
    </>
  );
};

export default Students;
