import { createAction } from "@reduxjs/toolkit";

export const setIdea = createAction<Idea>('idea/setIdea');

export const setIdeaLoad = createAction<boolean>('idea/setIdeaLoad');