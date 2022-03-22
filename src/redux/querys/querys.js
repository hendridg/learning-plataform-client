import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  coursesByDays: [],
  coursesByTutor: [],
  statusApiCoursesByDay: 'idle',
};

export const fetchApiCoursesByDay = createAsyncThunk(
  'querys/fetchApiCoursesByDay',
  async (day) => {
    const response = await fetch(
      `http://localhost:8000/courses/?date=${day}`,
    ).then((res) => res.json());
    return response;
  },
);

export const fetchApiCoursesByTutor = createAsyncThunk(
  'querys/fetchApiCoursesByTutor',
  async (tutor) => {
    const response = await fetch(
      `http://localhost:8000/courses/?tutor=${tutor}`,
    ).then((res) => res.json());
    return response;
  },
);

const querysSlice = createSlice({
  name: 'querys',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiCoursesByDay.pending, (state) => ({
        ...state,
        statusApiCoursesByDay: 'loading',
      }))
      .addCase(fetchApiCoursesByDay.fulfilled, (state, action) => ({
        ...state,
        coursesByDays: action.payload,
        statusApiCoursesByDay: 'done',
      }))
      .addCase(fetchApiCoursesByTutor.pending, (state) => ({
        ...state,
        statusApiCoursesByTutor: 'loading',
      }))
      .addCase(fetchApiCoursesByTutor.fulfilled, (state, action) => ({
        ...state,
        coursesByTutor: action.payload,
        statusApiCoursesByTutor: 'done',
      }));
  },
});

// export const {} = querysSlice.actions;

export const selectStatusCoursesByDay = (state) => state.querys.statusApiCoursesByDay;
export const selectCoursesByDay = (state) => state.querys.coursesByDays;
export const selectCoursesByTutor = (state) => state.querys.coursesByTutor;

export default querysSlice.reducer;
