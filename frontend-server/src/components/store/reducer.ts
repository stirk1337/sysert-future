import { createReducer } from '@reduxjs/toolkit';
import { changeTagStatus, clearIdeaData, setAccessData, setIdea, setIdeaData, setIdeaImage, setIdeaLoad, setIdeas, setImageLoad, setTags } from './action';

type InitialState = {
    ideaIsLoading: boolean
    imageIsLoading: boolean
    idea: Idea;
    tags: Tags[]
    ideas: IdeaExchange[]
    successData: SuccessDetector[]
}

const initialState: InitialState = {
    ideaIsLoading: false,
    imageIsLoading: false,
    idea: {
        title: '',
        description: '',
        image: ''
    },
    tags: [],
    ideas: [],
    successData: [],
};

export const reducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setIdeaData, (state, action) => {
            state.idea = {
                ...state.idea,
                title: action.payload.title,
                description: action.payload.description,
            };
        })
        .addCase(setIdeaImage, (state, action) => {
            state.idea = {
                ...state.idea,
                image: action.payload,
            };
        })
        .addCase(changeTagStatus, (state, action) => {
            const index = state.tags.findIndex((tag) => tag.id === action.payload)
            state.tags[index].selected = !state.tags[index].selected;
        })
        .addCase(setIdeaLoad, (state, action) => {
            state.ideaIsLoading = action.payload;
        })
        .addCase(setImageLoad, (state, action) => {
            state.imageIsLoading = action.payload;
        })
        .addCase(setTags, (state, action) => {
            state.tags = action.payload;
        })
        .addCase(setIdea, (state, action) => {
            state.idea = action.payload;
        })
        .addCase(clearIdeaData, (state) => {
            state.idea = initialState.idea;
            state.tags.forEach(tag => {
                tag.selected = false;
            });
        })
        .addCase(setIdeas, (state, action) => {
            state.ideas = action.payload;
        })
        .addCase(setAccessData, (state, action) => {
            state.successData = action.payload;
        })
});