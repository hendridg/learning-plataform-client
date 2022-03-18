import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  statusCallApiTutors: "idle",
  tutors: [
    // {
    //   tutor_id: "1223442",
    //   name: "Clint Eastwood",
    //   tutor_sn: "sldkjfkp",
    // },
    // {
    //   tutor_id: "12ju234442",
    //   name: "Stephen Kind",
    //   tutor_sn: "ncilkspom",
    // },
  ],
};

export const fetchApiTutors = createAsyncThunk(
  "tutors/fetchApiTutors",
  async () => {
    const response = await fetch("http://localhost:8000/tutors").then((res) =>
      res.json()
    );
    return response;
  }
);

const tutorsSlice = createSlice({
  name: "tutors",
  initialState,
  reducers: {
    addTutor: (state, action) => {
      if (
        state.tutors.find((tutor) => tutor.tutor_sn === action.payload.tutor_sn)
      ) {
        alert("Tutor already exist!");
        return state;
      }
      return {
        ...state,
        tutors: [...state.tutors, action.payload],
      };
    },
    editTutor: (state, action) => {
      // To not repeat the same tutor secure number
      if (
        state.tutors.find(
          (tutor) =>
            tutor.tutor_sn === action.payload.tutor_sn &&
            tutor.tutor_id !== action.payload.tutor_id
        )
      ) {
        alert("Secure number already exist!");
        return state;
      }
      const newTutors = state.tutors.map((tutor) => {
        if (tutor.tutor_id === action.payload.tutor_id) {
          return {
            tutor_id: action.payload.tutor_id,
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
        (tutor) => tutor.tutor_id !== action.payload
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
        statusCallApiCourse: "loading",
      }))
      .addCase(fetchApiTutors.fulfilled, (state, action) => {
        const arrayTutors = action.payload.map((tutor) => ({
          tutor_id: tutor.tutor_id,
          name: tutor.name,
        }));
        return {
          ...state,
          statusCallApiTutors: "done",
          tutors: arrayTutors,
        };
      });
  },
});

export const { addTutor, editTutor, deleteTutor } = tutorsSlice.actions;
export const selectTutors = (state) => state.tutors.tutors;
export const selectStatusCallApiTutors = (state) =>
  state.courses.selectStatusCallApiTutors;

export default tutorsSlice.reducer;
