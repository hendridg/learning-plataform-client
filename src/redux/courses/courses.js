import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  statusCallApiCourses: "idle",
  courses: [
    // {
    //   id: 1,
    //   name: "Math",
    //   date: "2022-03-05",
    //   hour: "9:00-10:00",
    //   tutor: "Clint Eastwood",
    //   tutor_id: "1223442",
    // },
    // {
    //   id: 2,
    //   name: "Phy",
    //   date: "2022-03-05",
    //   hour: "9:00-10:00",
    //   tutor: "Stephen Kind",
    //   tutor_id: "12ju234442",
    // },
  ],
};

export const fetchApiCourses = createAsyncThunk(
  "courses/fetchApiCourses",
  async () => {
    const response = await fetch("http://localhost:8000/courses").then((res) =>
      res.json()
    );
    return response;
  }
);

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state, action) => {
      return {
        ...state,
        courses: [...state.courses, action.payload],
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiCourses.pending, (state) => ({
        ...state,
        statusCallApiCourses: "loading",
      }))
      .addCase(fetchApiCourses.fulfilled, (state, action) => {
        const arrayCourses = action.payload.map((course) => ({
          id: course.id,
          name: course.name,
          date: course.date,
          flickrImg: course.hour,
          description: course.description,
        }));
        return {
          ...state,
          statusCallApiCourses: "done",
          courses: arrayCourses,
        };
      });
  },
});

export const { addCourse } = coursesSlice.actions;
export const selectCourses = (state) => state.courses.courses;
export const selectStatusCallApiCourses = (state) =>
  state.courses.selectStatusCallApiCourses;

export default coursesSlice.reducer;
