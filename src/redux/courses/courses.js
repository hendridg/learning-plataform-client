import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  statusCallApiCourses: 'idle',
  courses: [],
};

export const fetchApiCourses = createAsyncThunk(
  'courses/fetchApiCourses',
  async () => {
    const response = await fetch('http://localhost:8000/courses').then((res) => res.json());
    return response;
  },
);

export const fetchPostCourse = createAsyncThunk(
  'course/fetchPostCourse',
  async (course) => {
    const response = await fetch('http://localhost:8000/courses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(course),
    }).then((res) => res.json());
    return response;
  },
);

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    addCourse: (state, action) => ({
      ...state,
      courses: [...state.courses, action.payload],
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiCourses.pending, (state) => ({
        ...state,
        statusCallApiCourses: 'loading',
      }))
      .addCase(fetchApiCourses.fulfilled, (state, action) => {
        const arrayCourses = action.payload.map((course) => ({
          id: course.id,
          name: course.name,
          date: course.date,
          hour: course.hour,
          tutor: course.tutor,
          tutor_sn: course.tutor_sn,
          description: course.description,
        }));
        return {
          ...state,
          statusCallApiCourses: 'done',
          courses: arrayCourses,
        };
      })
      .addCase(fetchPostCourse.pending, (state) => ({
        ...state,
        statusPostCourse: 'proccess',
      }))
      .addCase(fetchPostCourse.fulfilled, (state) => ({
        ...state,
        statusPostCourse: 'Create',
      }))
      .addCase(fetchPostCourse.rejected, (state, action) => ({
        ...state,
        statusPostCourse: action.payload,
      }));
  },
});

export const { addCourse } = coursesSlice.actions;
export const selectCourses = (state) => state.courses.courses;
export const selectStatusCallApiCourses = (state) => state.courses.selectStatusCallApiCourses;

export default coursesSlice.reducer;
