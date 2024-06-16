import { createReducer } from '@reduxjs/toolkit';
import { changeTagStatus, clearIdeaData, setAccessData, setError, setHistory, setIdea, setIdeaData, setIdeaImage, setIdeaLoad, setIdeas, setImageLoad, setModal, setTags, setUser } from './action';

type InitialState = {
    ideaIsLoading: boolean
    imageIsLoading: boolean
    idea: Idea;
    tags: Tags[]
    ideas: IdeaExchange[]
    successData: SuccessDetector[]
    isTelegramModalOpen: boolean
    userData: UserData;
    history: HistoryData[];
    serverError: string;
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
    isTelegramModalOpen: false,
    userData: {
        id: 0,
        first_name: '',
        last_name: '',
        username: '',
        photo_url: '',
        auth_date: 0,
        hash: ''
    },
    history: [],
    serverError: ''
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
        .addCase(setModal, (state, action) => {
            state.isTelegramModalOpen = action.payload;
        })
        .addCase(setUser, (state, action) => {
            state.userData = action.payload
        })
        .addCase(setHistory, (state, action) => {
            state.history = action.payload
        })
        .addCase(setError, (state, action) => {
            state.serverError = action.payload
        })
});