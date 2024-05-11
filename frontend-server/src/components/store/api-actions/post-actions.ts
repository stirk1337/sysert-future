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
            const { data: idea } = await api.post('/generate_idea/', { like: data.like, want: data.want, can: data.can });

            const { data: image } = await api.post('/generate_picture/', { prompt: idea });
            dispatch(setIdeaLoad(false))
            const ideaData = {
                data: idea.idea,
                image: `data:image/png;base64,${image.image}`
            }
            dispatch(setIdea(ideaData));
            await api.post('/idea/', { tags: [1], title: ideaData.data, description: "заглушка", image: ideaData.image.split(',')[1] });
        } catch (error) {
            dispatch(setIdeaLoad(false));
            alert('Произошла ошибка попробуйте снова');
        }
    },
);