import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  statusCallApiStudents: 'idle',
  statusPostStudent: 'idle',
  statusDeleteStudent: 'idle',
  statusPutStudent: 'idle',
  students: [],
};

export const fetchApiStudents = createAsyncThunk(
  'students/fetchApiStudents',
  async () => {
    const response = await fetch('http://localhost:8000/students').then((res) => res.json());
    return response;
  },
);

export const fetchPostStudent = createAsyncThunk(
  'students/fetchPostTutor',
  async (student) => {
    const response = await fetch('http://localhost:8000/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
    }).then((res) => res.json());
    return response;
  },
);

export const fetchPutStudent = createAsyncThunk(
  'students/fetchPutStudent',
  async (student) => {
    console.log(student);
    const response = await fetch(
      `http://localhost:8000/students/${student.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
      },
    ).then((res) => res.json());
    return response;
  },
);

export const fetchDeleteStudent = createAsyncThunk(
  'students/fetchDeleteStudent',
  async (id) => {
    const response = await fetch(`http://localhost:8000/students/${id}`, {
      method: 'DELETE',
    }).then((res) => res.json());
    return response;
  },
);

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    addStudent: (state, action) => {
      if (
        state.students.find(
          (student) => student.student_sn === action.payload.student_sn,
        )
      ) {
        alert('Student already exist!');
        return {
          ...state,
          repeatStudent: true,
        };
      }
      return {
        ...state,
        students: [...state.students, action.payload],
        repeatStudent: false,
      };
    },
    editStudent: (state, action) => {
      // To not repeat the same tutor secure number
      if (
        state.tutors.find(
          (tutor) => tutor.tutor_sn === action.payload.tutStudent
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
    deleteStudent: (state, action) => {
      const newStudents = state.students.filter(
        (student) => student.id !== action.payload,
      );
      return {
        ...state,
        tutors: newStudents,
      };
    },
    addCourseStudent: (state, action) => {
      const newStudents = state.students.map((student) => {
        if (student.id === action.payload.id) {
          return { ...student, courses: action.payload.courses };
        }
        return student;
      });
      return {
        ...state,
        students: newStudents,
      };
    },
    initStatusPostStudent: (state) => ({
      ...state,
      statusPostStudent: 'idle',
    }),
    initStatusDeleteStudent: (state) => ({
      ...state,
      statusDeleteStudent: 'idle',
    }),
    initStatusPutStudent: (state) => ({
      ...state,
      statusPutStudent: 'idle',
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiStudents.pending, (state) => ({
        ...state,
        statusCallApiStudents: 'loading',
      }))
      .addCase(fetchApiStudents.fulfilled, (state, action) => {
        const arrayStudents = action.payload.map((student) => ({
          id: student.id,
          name: student.name,
          student_sn: student.student_sn,
        }));
        return {
          ...state,
          statusCallApiStudents: 'done',
          students: arrayStudents,
        };
      })
      .addCase(fetchPostStudent.pending, (state) => ({
        ...state,
        statusPostStudent: 'proccess',
      }))
      .addCase(fetchPostStudent.fulfilled, (state, action) => ({
        ...state,
        tutors: [...state.tutors, action.payload],
        statusPostStudent: 'Create',
      }))
      .addCase(fetchPostStudent.rejected, (state, action) => ({
        ...state,
        statusPostStudent: action.payload,
      }))
      .addCase(fetchDeleteStudent.pending, (state) => ({
        ...state,
        statusDeleteStudent: 'proccess',
      }))
      .addCase(fetchDeleteStudent.fulfilled, (state) => ({
        ...state,
        statusDeleteStudent: 'Delete',
      }))
      .addCase(fetchPutStudent.pending, (state) => ({
        ...state,
        statusPutStudent: 'proccess',
      }))
      .addCase(fetchPutStudent.fulfilled, (state) => ({
        ...state,
        statusPutStudent: 'Edit',
      }));
  },
});

export const {
  addStudent,
  editStudent,
  deleteStudent,
  addCourseStudent,
  initStatusPostStudent,
  initStatusDeleteStudent,
  initStatusPutStudent,
} = studentsSlice.actions;
export const selectStudents = (state) => state.students.students;
export const selectRepeatStudent = (state) => state.students.repeatStudent;
export const selectStatusCallApiStudents = (state) => state.students.statusCallApiStudents;
export const selectStatusPostStudent = (state) => state.students.statusPostStudent;

export const selectStatusPutStudent = (state) => state.students.statusPutStudent;
export const selectStatusDeleteStudent = (state) => state.students.statusDeleteStudent;

export default studentsSlice.reducer;
