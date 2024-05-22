import { AxiosInstance } from "axios";
import { AppDispatch, State } from "..";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setIdea, setIdeaData, setIdeaImage, setIdeaLoad, setImageLoad } from "../action";

export const generateIdea = createAsyncThunk<void, { like: string, want: string, can: string }, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'idea/generateIdea',
    async (data, { dispatch, extra: api }) => {
        try {
            dispatch(setIdeaLoad(true))
            const { data: idea } = await api.post('/generate_idea/', { like: data.like, want: data.want, can: data.can });
            dispatch(setIdeaLoad(false))
            const ideaData: IdeaData = {
                title: idea.idea.title,
                description: idea.idea.description,
            }
            dispatch(setIdeaData(ideaData));
            dispatch(generateImage({ ideaName: ideaData.title }))
        } catch (error) {
            console.log(error);
        }
    },
);

export const generateImage = createAsyncThunk<void, { ideaName: string }, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'idea/generateImage',
    async (data, { dispatch, extra: api }) => {
        try {
            dispatch(setImageLoad(true))
            const { data: image } = await api.post('/generate_picture/', { prompt: data.ideaName });
            dispatch(setImageLoad(false))
            dispatch(setIdeaImage(`data:image/png;base64,${image.image}`));
        } catch (error) {
            console.log(error);
        }
    },
);

export const saveIdea = createAsyncThunk<void, { tags: string[], title: string, description: string, image: string }, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'idea/generateImage',
    async (data, { dispatch, extra: api }) => {
        try {
            const { data: idea } = await api.post('/idea/', { title: data.title, description: data.description, image: data.image, tags: data.tags });
            dispatch(setIdea(idea))
        } catch (error) {
            console.log(error);
        }
    },
);