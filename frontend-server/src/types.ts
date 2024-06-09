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
    active_tags: number[];
}

type SuccessDetector = {
    id: string;
    title: string;
    description: string;
    progress: number;
    items: SuccessDetectorBlock[];
}

type SuccessDetectorBlock = {
    id: string;
    title: string;
    description: string;
    is_test: boolean;
    answer1: string | null;
    answer2: string | null;
    answer3: string | null;
    alter_test: string | null;
}