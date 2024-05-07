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
    data: string;
    image: string;
}
