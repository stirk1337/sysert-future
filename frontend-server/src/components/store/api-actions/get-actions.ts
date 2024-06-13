import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, State } from "..";
import { AxiosInstance } from "axios";
import { setAccessData, setIdeas, setTags, setUser } from "../action";

export const getUser = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'idea/getIdeas',
    async (__arg, { dispatch, extra: api }) => {
        try {
            const { data: userData } = await api.get('/api-token-auth/get_current_user_info/');
            dispatch(setUser(userData as UserData));
        } catch (error) {
            console.log(error);
        }
    },
);

export const telegramAuth = createAsyncThunk<void, { userData: UserData }, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'idea/getIdeas',
    async (data, { dispatch, extra: api }) => {
        try {
            const userData = data.userData
            const { data: token } = await api.get('/api-token-auth/telegram_auth/', { params: { id: userData.id, first_name: userData.first_name, last_name: userData.last_name, username: userData.username, photo_url: userData.photo_url, auth_date: userData.auth_date, hash: userData.hash } });
            localStorage.setItem('token', token.token)
            dispatch(getUser)
        } catch (error) {
            console.log(error);
        }
    },
);


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

export const getSuccessData = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'idea/getIdeas',
    async (__arg, { dispatch, extra: api }) => {
        try {
            const { data: successData } = await api.get<SuccessDetector[]>('/success_detector/');
            dispatch(setAccessData(successData))
            console.log(successData)
        } catch (error) {
            console.log(error);
        }
    },
);