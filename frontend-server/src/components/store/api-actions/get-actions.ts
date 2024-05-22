import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, State } from "..";
import { AxiosInstance } from "axios";
import { setIdeas, setTags } from "../action";

export const getTags = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'idea/generateImage',
    async (__arg, { dispatch, extra: api }) => {
        try {
            const { data: tags } = await api.get<Tags[]>('/tag/');
            const modifiedTags = tags.map(tag => { return { ...tag, selected: false } })
            dispatch(setTags(modifiedTags))
        } catch (error) {
            console.log(error);
        }
    },
);

export const getIdeas = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'idea/getIdeas',
    async (__arg, { dispatch, extra: api }) => {
        try {
            const { data: ideas } = await api.get<IdeaExchange[]>('/idea/');
            dispatch(setIdeas(ideas))
        } catch (error) {
            console.log(error);
        }
    },
);