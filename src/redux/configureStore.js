import { configureStore } from '@reduxjs/toolkit';
// import logger from 'redux-logger';
import reducerCourses from './courses/courses';
import reducerTutors from './tutors/tutors';
import reducerStudents from './studens/students';

const store = configureStore({
  reducer: {
    courses: reducerCourses,
    tutors: reducerTutors,
    students: reducerStudents,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
