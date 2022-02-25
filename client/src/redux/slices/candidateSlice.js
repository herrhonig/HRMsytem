import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCandidate = createAsyncThunk('candidates/getCandidates', async (id) => {
 const res = await axios(`/candidate/info/${id}`);
 console.log('getCandidate res = ',res.data.candidateInfo);
 return res.data.candidateInfo
})

const candidateSlice = createSlice({
  name: 'candidate',
  initialState: {
    candidate: {},
    status: null,
  },
  extraReducers: {
    [getCandidate.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getCandidate.fulfilled]: (state, { payload }) => {
      state.candidate = payload;
      state.status = 'success';
    },
    [getCandidate.rejected]: (state, action) => {
      state.status = 'failed';
    },
  }
});

export default candidateSlice.reducer;