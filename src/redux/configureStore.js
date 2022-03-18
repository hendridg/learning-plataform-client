import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import reducerCourses from "./courses/courses";
import reducerTutors from "./tutors/tutors";

const store = configureStore({
  reducer: {
    courses: reducerCourses,
    tutors: reducerTutors,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
