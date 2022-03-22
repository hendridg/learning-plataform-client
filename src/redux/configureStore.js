import { configureStore } from '@reduxjs/toolkit';
// import logger from 'redux-logger';
import reducerCourses from './courses/courses';
import reducerTutors from './tutors/tutors';
import reducerStudents from './studens/students';
import reducerQuerys from './querys/querys';

const store = configureStore({
  reducer: {
    courses: reducerCourses,
    tutors: reducerTutors,
    students: reducerStudents,
    querys: reducerQuerys,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
