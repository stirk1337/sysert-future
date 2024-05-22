import { createAction } from "@reduxjs/toolkit";

export const setIdeaData = createAction<IdeaData>('idea/setIdeaData');

export const setIdeaImage = createAction<string>('idea/setImage');

export const setIdeaLoad = createAction<boolean>('idea/setIdeaLoad');

export const setImageLoad = createAction<boolean>('idea/setImageLoad');

export const setTags = createAction<Tags[]>('idea/setTags');

export const changeTagStatus = createAction<string>('idea/changeTagStatus');

export const setIdea = createAction<Idea>('idea/setIdea');

export const clearIdeaData = createAction('idea/clearIdeaData')

export const setIdeas = createAction<IdeaExchange[]>('idea/setIdeas')