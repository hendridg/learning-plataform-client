import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  statusCallApiTutors: 'idle',
  statusPostTutor: 'idle',
  statusDeleteTutor: 'idle',
  statusPutTutor: 'idle',
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

export const fetchPutTutor = createAsyncThunk(
  'tutor/fetchPutTutor',
  async (tutor) => {
    const response = await fetch(`http://localhost:8000/tutors/${tutor.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tutor),
    }).then((res) => res.json());
    return response;
  },
);

export const fetchDeleteTutor = createAsyncThunk(
  'tutor/fetchDeleteTutor',
  async (id) => {
    const response = await fetch(`http://localhost:8000/tutors/${id}`, {
      method: 'DELETE',
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
        return state;
      }
      const newTutors = state.tutors.map((tutor) => {
        if (tutor.id === action.payload.id) {
          return {
            id: action.payload.id,
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
        (tutor) => tutor.id !== action.payload,
      );
      return {
        ...state,
        tutors: newTutors,
      };
    },
    initStatusPostTutor: (state) => ({
      ...state,
      statusPostTutor: 'idle',
    }),
    initStatusDeleteTutor: (state) => ({
      ...state,
      statusDeleteTutor: 'idle',
    }),
    initStatusPutTutor: (state) => ({
      ...state,
      statusPutTutor: 'idle',
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiTutors.pending, (state) => ({
        ...state,
        statusCallApiTutors: 'loading',
      }))
      .addCase(fetchApiTutors.fulfilled, (state, action) => {
        const arrayTutors = action.payload.map((tutor) => ({
          id: tutor.id,
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
      .addCase(fetchPostTutor.fulfilled, (state, action) => ({
        ...state,
        tutors: [...state.tutors, action.payload],
        statusPostTutor: 'Create',
      }))
      .addCase(fetchPostTutor.rejected, (state, action) => ({
        ...state,
        statusPostTutor: action.payload,
      }))
      .addCase(fetchDeleteTutor.pending, (state) => ({
        ...state,
        statusDeleteTutor: 'proccess',
      }))
      .addCase(fetchDeleteTutor.fulfilled, (state) => ({
        ...state,
        statusDeleteTutor: 'Delete',
      }))
      .addCase(fetchPutTutor.pending, (state) => ({
        ...state,
        statusPutTutor: 'proccess',
      }))
      .addCase(fetchPutTutor.fulfilled, (state) => ({
        ...state,
        statusPutTutor: 'Edit',
      }));
  },
});

export const {
  addTutor,
  editTutor,
  deleteTutor,
  initStatusPostTutor,
  initStatusDeleteTutor,
  initStatusPutTutor,
} = tutorsSlice.actions;
export const selectTutors = (state) => state.tutors.tutors;
export const selectRepeatTutor = (state) => state.tutors.repeatTutor;
export const selectStatusCallApiTutors = (state) => state.tutors.statusCallApiTutors;
export const selectStatusPostTutor = (state) => state.tutors.statusPostTutor;

export const selectStatusPutTutor = (state) => state.tutors.statusPutTutor;
export const selectStatusDeleteTutor = (state) => state.tutors.statusDeleteTutor;

export default tutorsSlice.reducer;
