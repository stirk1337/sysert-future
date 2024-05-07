import { AxiosInstance } from "axios";
import { AppDispatch, State } from "..";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setIdea, setIdeaLoad } from "../action";

export const generateIdea = createAsyncThunk<void, { like: string, want: string, can: string }, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'idea/generateIdea',
    async (data, { dispatch, extra: api }) => {
        try {
            dispatch(setIdeaLoad(true))
            const { data: idea } = await api.get('/generate_idea', { params: { like: data.like, want: data.want, can: data.can } });
            const { data: image } = await api.get('/generate_picture', { params: { prompt: idea } });
            dispatch(setIdeaLoad(false))
            const ideaData = {
                data: idea,
                image: `data:image/png;base64,${image}`
            }
            dispatch(setIdea(ideaData));
        } catch (error) {
            console.log(error);
        }
    },
);