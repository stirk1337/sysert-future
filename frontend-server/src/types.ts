type historyListType = {
    id: string;
    name: string;
    description: string;
    date: string;
    img: string;
}

type ideaCardType = {
    id: string;
    name: string;
    description: string;
    tags: string[];
    img: string;
    likes: number;
}

type Idea = {
    title: string;
    description: string;
    image: string;
}

type IdeaData = Omit<Idea, "image">

type Tags = {
    id: string;
    title: string;
    selected: boolean;
}

type IdeaExchange = Idea & {
    id: string;
    tags: Tags[];
}