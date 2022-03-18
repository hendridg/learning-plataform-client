import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  statusCallApiTutors: 'idle',
  statusPostTutor: 'idle',
  tutors: [],
  repeatTutor: false,
};

export const fetchApiTutors = createAsyncThunk(
  'tutors/fetchApiTutors',
  async () => {
    const response = await fetch('http://localhost:8000/tutors').then((res) => res.json());
    return response;
  },
);

export const fetchPostTutor = createAsyncThunk(
  'tutor/fetchPostTutor',
  async (tutor) => {
    const response = await fetch('http://localhost:8000/tutors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tutor),
    }).then((res) => res.json());
    return response;
  },
);

const tutorsSlice = createSlice({
  name: 'tutors',
  initialState,
  reducers: {
    addTutor: (state, action) => {
      if (
        state.tutors.find((tutor) => tutor.tutor_sn === action.payload.tutor_sn)
      ) {
        alert('Tutor already exist!');
        return {
          ...state,
          repeatTutor: true,
        };
      }
      return {
        ...state,
        tutors: [...state.tutors, action.payload],
        repeatTutor: false,
      };
    },
    editTutor: (state, action) => {
      // To not repeat the same tutor secure number
      if (
        state.tutors.find(
          (tutor) => tutor.tutor_sn === action.payload.tutor_sn
            && tutor.tutor_id !== action.payload.tutor_id,
        )
      ) {
        alert('Secure number already exist!');
        return state;
      }
      const newTutors = state.tutors.map((tutor) => {
        if (tutor.id === action.payload.id) {
          return {
            name: action.payload.name,
            tutor_sn: action.payload.tutor_sn,
          };
        }
        return tutor;
      });
      return {
        ...state,
        tutors: newTutors,
      };
    },
    deleteTutor: (state, action) => {
      const newTutors = state.tutors.filter(
        (tutor) => tutor.tutor_id !== action.payload,
      );
      return {
        ...state,
        tutors: newTutors,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiTutors.pending, (state) => ({
        ...state,
        statusCallApiTutors: 'loading',
      }))
      .addCase(fetchApiTutors.fulfilled, (state, action) => {
        const arrayTutors = action.payload.map((tutor) => ({
          name: tutor.name,
          tutor_sn: tutor.tutor_sn,
        }));
        return {
          ...state,
          statusCallApiTutors: 'done',
          tutors: arrayTutors,
        };
      })
      .addCase(fetchPostTutor.pending, (state) => ({
        ...state,
        statusPostTutor: 'proccess',
      }))
      .addCase(fetchPostTutor.fulfilled, (state) => ({
        ...state,
        statusPostTutors: 'Create',
      }))
      .addCase(fetchPostTutor.rejected, (state, action) => ({
        ...state,
        statusPostTutor: action.payload,
      }));
  },
});

export const { addTutor, editTutor, deleteTutor } = tutorsSlice.actions;
export const selectTutors = (state) => state.tutors.tutors;
export const selectRepeatTutor = (state) => state.tutors.repeatTutor;
export const selectStatusCallApiTutors = (state) => state.courses.selectStatusCallApiTutors;

export default tutorsSlice.reducer;
