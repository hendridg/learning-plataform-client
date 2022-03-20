import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Card,
  Wrapper,
  Form,
  ContainerInputs,
  ContainerCards,
} from '../components';
import { selectTutors } from '../redux/tutors/tutors';
import {
  selectCourses,
  addCourse,
  initStatusPostCourse,
  fetchPostCourse,
  selectStatusPostCourse,
} from '../redux/courses/courses';

const Span = styled.span`
  background-color: ${(props) => (props.badgeColor ? '#e67700' : 'yellowgreen')};
  font-size: 0.8em;
  font-weight: bold;
  color: white;
  padding: 0.4em 1em;
  margin-left: 1rem;
  border-radius: 1em;
`;

const time = [
  '7:00-8:00',
  '8:00-9:00',
  '9:00-10:00',
  '10:00-11:00',
  '13:00-14:00',
  '14:00-15:00',
];

const Courses = () => {
  const tutors = useSelector(selectTutors);
  const courses = useSelector(selectCourses);
  const statusPostCourse = useSelector(selectStatusPostCourse);
  const [nameCourse, setnameCourse] = useState('');
  const [tutorCourse, settutorCourse] = useState('');
  const [dateCourse, setdateCourse] = useState('2022-03-19');
  const [hourCourse, sethourCourse] = useState('7:00-8:00');
  const [descriptionCourse, setdescriptionCourse] = useState('');
  const [newCourse, setnewCourse] = useState({});
  const [hourConflic, sethourConflic] = useState(false);

  const dispatch = useDispatch();

  const clearFields = () => {
    setnameCourse('');
    settutorCourse('2022-03-19');
    setdateCourse('');
    sethourCourse('7:00-8:00');
    setdescriptionCourse('');
    sethourConflic(false);
  };

  useEffect(() => {
    if (statusPostCourse === 'Create') {
      dispatch(addCourse(newCourse));
      dispatch(initStatusPostCourse());
      clearFields();
    }
  }, [statusPostCourse]);

  const handleAddCourse = (e) => {
    e.preventDefault();
    const [tutor] = tutors.filter((tutor) => tutor.tutor_sn === tutorCourse);
    const tutorCourses = courses
      .filter((course) => course.tutor_sn === tutorCourse)
      .map((course) => ({
        date: course.date,
        hour: course.hour,
      }));
    if (
      tutorCourses.find(
        (dateTime) => dateTime.date === dateCourse && dateTime.hour === hourCourse,
      )
    ) {
      sethourConflic(true);
    } else {
      setnewCourse({
        name: nameCourse,
        tutor: tutor.name,
        tutor_sn: tutor.tutor_sn,
        date: dateCourse,
        hour: hourCourse,
        description: descriptionCourse,
      });
      dispatch(
        fetchPostCourse({
          name: nameCourse,
          tutor: tutor.name,
          tutor_sn: tutor.tutor_sn,
          date: dateCourse,
          hour: hourCourse,
          description: descriptionCourse,
        }),
      );
      sethourConflic(false);
    }
  };

  return (
    <Wrapper>
      <h3>Courses</h3>
      <Form onSubmit={handleAddCourse}>
        <ContainerInputs flexNumber={2}>
          <input
            type="text"
            name="name"
            required
            placeholder="place name course"
            value={nameCourse}
            onChange={({ target }) => setnameCourse(target.value)}
          />
          <select
            value={tutorCourse}
            required
            onChange={({ target }) => settutorCourse(target.value)}
          >
            <option>select tutor</option>
            {tutors.map((tutor) => (
              <option value={tutor.tutor_sn} key={uuidv4()}>
                {tutor.name}
              </option>
            ))}
          </select>
        </ContainerInputs>
        <ContainerInputs flexNumber={2}>
          <input
            type="date"
            value={dateCourse}
            onChange={({ target }) => setdateCourse(target.value)}
            required
          />
          <select
            value={hourCourse}
            required
            onChange={({ target }) => sethourCourse(target.value)}
          >
            <option>select hour</option>
            {time.map((hour) => (
              <option value={hour} key={uuidv4()}>
                {hour}
              </option>
            ))}
          </select>
          <div>{hourConflic && <Span>Select other hour</Span>}</div>
        </ContainerInputs>
        <ContainerInputs flexNumber={2}>
          <textarea
            name="text_area"
            required
            placeholder="Description..."
            value={descriptionCourse}
            onChange={({ target }) => setdescriptionCourse(target.value)}
          />
          <Button type="submit">+ Add Course</Button>
        </ContainerInputs>
      </Form>
      <ContainerCards>
        {courses.map((course) => (
          <Card
            key={uuidv4()}
            name={course.name}
            tutor={course.tutor}
            description={course.description}
            day={course.date}
            hour={course.hour}
          />
        ))}
      </ContainerCards>
    </Wrapper>
  );
};

export default Courses;
