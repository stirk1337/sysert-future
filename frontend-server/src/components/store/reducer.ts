import { createReducer } from '@reduxjs/toolkit';
import { setIdea, setIdeaLoad } from './action';

type InitialState = {
    ideaIsLoading: boolean
    idea: Idea;
}

const initialState: InitialState = {
    ideaIsLoading: false,
    idea: {
        data: '',
        image: ''
    }
};

export const reducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setIdea, (state, action) => {
            state.idea = action.payload;
        })
        .addCase(setIdeaLoad, (state, action) => {
            state.ideaIsLoading = action.payload;
        })
});